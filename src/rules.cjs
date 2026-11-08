// ARV 1, Stand 01.10.2026, Grundprofil Einzelfahrer.
// Gewollte Trainingsabweichung: Linienverkehr <=50 km ist EINBEZOGEN.
// Keine automatische Anwendung von Art.11a–11d/12-Sonderfällen.
const H=3600000,M=60000,D=24*H,W=7*D;
const zurich=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Zurich',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23',minute:'2-digit',second:'2-digit'});
function civil(t){const o={};for(const p of zurich.formatToParts(t))if(p.type!=='literal')o[p.type]=+p.value;return o}
function utcOfLocal(y,m,d,h=0){let guess=Date.UTC(y,m-1,d,h);for(let i=0;i<3;i++){const c=civil(guess);const local=Date.UTC(c.year,c.month-1,c.day,c.hour,c.minute,c.second);guess+=Date.UTC(y,m-1,d,h)-local}return guess}
function weekStart(t){const c=civil(t),day=new Date(Date.UTC(c.year,c.month-1,c.day)).getUTCDay(),dt=new Date(Date.UTC(c.year,c.month-1,c.day-((day+6)%7)));return utcOfLocal(dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate())}
function shiftWeek(t,n){const c=civil(t),d=new Date(Date.UTC(c.year,c.month-1,c.day+n*7));return utcOfLocal(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate())}
function sum(a,kind,from,to){return a.reduce((n,s)=>n+(kind.includes(s.activity)?Math.max(0,Math.min(to,s.end)-Math.max(from,s.start)):0),0)}
function merge(input){let out=[];for(const x of [...input].sort((a,b)=>a.start-b.start)){if(x.end<=x.start)continue;const p=out.at(-1);if(p&&p.activity===x.activity&&Math.abs(p.end-x.start)<1)p.end=x.end;else out.push({...x})}return out}
function coverage(a,from,to){let cursor=from;for(const s of a){if(s.end<=cursor)continue;if(s.start>cursor+1000||s.activity==='unknown')return false;cursor=Math.max(cursor,s.end);if(cursor>=to-1000)return true}return cursor>=to-1000}
function evaluate(input,now,{warnMinutes=15,historyStart=null}={}){
 const a=merge(input),alerts=[],lead=warnMinutes*M,w0=weekStart(now),w1=shiftWeek(w0,-1),next=shiftWeek(w0,1),rests=a.filter(s=>s.activity==='rest');
 const add=(id,level,text,article,details={})=>alerts.push({id,level,text,article,...details});
 const limit=(id,value,max,text,article)=>{if(value>max+1000)add(id,'violation',text+' überschritten',article,{value,limit:max});else if(value>=max-lead)add(id,'warning',text+' bald erreicht',article,{value,limit:max})};
 let qualifying=[],split=null;
 for(const r of rests){const len=r.end-r.start;if(len>=9*H){const splitOK=split&&r.start>=split.end&&r.end-split.end<=24*H&&len>=9*H;qualifying.push({...r,reduced:len<11*H&&!splitOK,split:!!splitOK});split=null}else if(len>=3*H)split=r}
 const last=qualifying.at(-1),shift=last?.end??a[0]?.start??now;
 // A completed daily rest starts the new duty window. While still resting,
 // the current qualifying rest is already sufficient; no fictitious new work.
 const daily=sum(a,['drive'],shift,now),work=sum(a,['drive','work'],shift,now)+a.filter(s=>s.activity==='rest'&&s.end-s.start<15*M).reduce((n,s)=>n+Math.max(0,Math.min(now,s.end)-Math.max(shift,s.start)),0);
 let chain=0,first15=false,continuousWork=0,workPause=0;
 for(const s of a){const len=s.end-s.start;if(s.activity==='drive')chain+=len;else if(s.activity==='rest'){if(len>=45*M){chain=0;first15=false}else if(first15&&len>=30*M){chain=0;first15=false}else if(len>=15*M)first15=true}
 if(s.end<=shift)continue;const l=s.end-Math.max(s.start,shift);if(['drive','work'].includes(s.activity))continuousWork+=l;else if(s.activity==='rest'){if(l>=15*M){continuousWork=0;workPause+=l}else continuousWork+=l}}
 const weekDrive=sum(a,['drive'],w0,now),twoWeek=sum(a,['drive'],w1,now),weekWork=sum(a,['drive','work'],w0,now)+a.filter(s=>s.activity==='rest'&&s.end-s.start<15*M).reduce((n,s)=>n+Math.max(0,Math.min(now,s.end)-Math.max(w0,s.start)),0);
 let extensions=0,priorStart=a[0]?.start??now;
 for(const r of qualifying){const amount=sum(a,['drive'],priorStart,r.start);if(amount>9*H&&r.start>=w0&&r.start<next)extensions++;priorStart=r.end}
 const dailyMax=extensions<2?10*H:9*H;
 if(daily>=9*H-lead&&daily<=9*H&&dailyMax===10*H)add('drive9','warning','9h Lenkzeit: Verlängerung möglich','Art. 5',{remainingExtensions:2-extensions});
 limit('driveDaily',daily,dailyMax,'Tageslenkzeit','Art. 5');limit('driveBreak',chain,4.5*H,'Lenkzeit ohne ausreichende Pause','Art. 8 Abs. 1–2');limit('driveWeek',weekDrive,56*H,'Wochenlenkzeit','Art. 5');limit('driveFortnight',twoWeek,90*H,'Zweiwochenlenkzeit','Art. 5');limit('workWeek',weekWork,60*H,'Wochenarbeitszeit','Art. 6');limit('workContinuous',continuousWork,6*H,'Arbeit ohne Pause','Art. 8 Abs. 3');
 if(work>6*H&&workPause<30*M)add('workPause','warning','Arbeitspause: insgesamt 30min erforderlich','Art. 8 Abs. 3');if(work>9*H&&workPause<45*M)add('workPause45','violation','Arbeitspause: insgesamt 45min erforderlich','Art. 8 Abs. 3');
 // Allocate compensation once, before classifying the remaining rest.
 // A 30h rest may be 9h daily rest + 21h compensation, not a new reduced weekly rest.
 const weekly=[],debts=[];
 for(const r of rests){let remaining=r.end-r.start;const reserve=remaining>=45*H?45*H:9*H;
 for(const debt of debts){if(debt.paid||r.start<debt.restEnd||r.end>debt.deadline)continue;if(remaining-reserve>=debt.amount){remaining-=debt.amount;debt.paid=true}}
 if(remaining>=24*H){weekly.push({...r,weeklyDuration:remaining});if(remaining<45*H)debts.push({amount:45*H-remaining,deadline:shiftWeek(weekStart(r.end),4),restStart:r.start,restEnd:r.end,paid:false})}}
 const lastWeekly=weekly.at(-1),dailySinceWeekly=qualifying.filter(r=>r.reduced&&r.start>=(lastWeekly?.end??-Infinity)),reductions=dailySinceWeekly.length;
 if(reductions>3)add('dailyReductions','violation','Mehr als drei reduzierte Tagesruhen','Art. 9 Abs. 3');
 const activeRest=a.at(-1)?.activity==='rest'?a.at(-1):null;
 const need=reductions<3?9*H:11*H;const restDeadline=shift+24*H,latestRest=restDeadline-need;
 if(last||a.length){if(!activeRest||activeRest.end-activeRest.start<need){if(now>restDeadline)add('dailyRest','violation','Tägliche Ruhezeit nicht rechtzeitig erfüllt','Art. 9');else if(now>latestRest)add('dailyRestStart','warning','Tagesruhe muss bereits begonnen haben','Art. 9');else if(now>=latestRest-lead)add('dailyRestSoon','warning','Tagesruhe bald beginnen','Art. 9')}}
 // Check each closed duty window as well: late rests may not reset violations.
 for(let i=1;i<qualifying.length;i++){const prev=qualifying[i-1],r=qualifying[i],needed=r.reduced||r.split?9*H:11*H;if(r.start+needed>prev.end+24*H+1000&&r.end>=w0)add('dailyRestLate-'+r.start,'violation','Tagesruhe ausserhalb des 24h-Fensters','Art. 9',{at:r.start})}
 let weeklyDue=null;
 if(lastWeekly){weeklyDue=lastWeekly.end+6*D;if(now>weeklyDue&&(!activeRest||activeRest.start>weeklyDue))add('weeklyRestDue','violation','Wöchentliche Ruhezeit überfällig','Art. 11 Abs. 3');else if(now>=weeklyDue-lead&&(!activeRest||activeRest.start>weeklyDue))add('weeklyRestSoon','warning','Wöchentliche Ruhezeit beginnen','Art. 11 Abs. 3')}
 for(const debt of debts.filter(d=>!d.paid)){const {amount,deadline,restStart}=debt;if(now>deadline)add('compensation-'+restStart,'violation','Ausgleich der Wochenruhe überfällig','Art. 11 Abs. 2–4',{amount,deadline});else if(deadline-now<D)add('compensationSoon-'+restStart,'warning','Ausgleich der Wochenruhe bald fällig','Art. 11 Abs. 2–4',{amount,deadline})}
 // Completed two-week windows; a spanning rest is assigned once per window.
 if(historyStart!==null){for(let offset=-2;offset<=-1;offset++){const start=shiftWeek(w0,offset),end=shiftWeek(start,2);if(end>now||!coverage(a,start,end)||historyStart>start)continue;const candidates=weekly.filter(r=>r.start<end&&r.end>start),regular=candidates.filter(r=>r.end-r.start>=45*H);if(candidates.length<2||!regular.length)add('weeklyPair-'+start,'violation','Zweiwochenfenster: Wochenruhen unzureichend','Art. 11 Abs. 1–2')}}
 const avgStart=shiftWeek(w0,-26),avgEnd=w0,fullAverage=coverage(a,avgStart,avgEnd),weekCount=26,shortPauses=a.filter(s=>s.activity==='rest'&&s.end-s.start<15*M).reduce((n,s)=>n+Math.max(0,Math.min(avgEnd,s.end)-Math.max(avgStart,s.start)),0),average=(sum(a,['drive','work'],avgStart,avgEnd)+shortPauses)/weekCount;
 if(fullAverage&&average>48*H)add('workAverage','violation','26-Wochen-Mittel über 48h','Art. 6');
 const complete=coverage(a,w1,now)&&!!last;
 if(!complete)add('history','info','Vorgeschichte oder Nachträge fehlen','Bewertungsgrundlage');
 return {profile:'ARV 1 · Einzelfahrer · Linienverkehr eingeschlossen',scope:'Grundregeln; keine Sonderausnahmen, Mehrfachbesatzung oder arbeitsgesetzlichen Zusatzregeln',alerts,daily,work,chain,continuousWork,workPause,weekDrive,twoWeek,weekWork,average,fullAverage,complete,dailyMax,extensions,reductions,shift,restDeadline,latestRest,weeklyDue,debts:debts.filter(d=>!d.paid),remainingBreak:Math.max(0,4.5*H-chain),remainingDaily:Math.max(0,dailyMax-daily)};
}
module.exports={evaluate,weekStart,shiftWeek,coverage,H,M,D,W};
