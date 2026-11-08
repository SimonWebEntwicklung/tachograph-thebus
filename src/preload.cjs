const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('tachograph',{
 boot:()=>ipcRenderer.invoke('boot'),saveDevice:x=>ipcRenderer.invoke('save-device',x),
 manual:x=>ipcRenderer.invoke('manual',x),event:x=>ipcRenderer.invoke('event',x),
 action:(name,payload)=>ipcRenderer.invoke('action',name,payload),
 onLive:fn=>{const cb=(_,x)=>fn(x);ipcRenderer.on('live',cb);return()=>ipcRenderer.removeListener('live',cb)},
 onCommand:fn=>ipcRenderer.on('command',(_,x)=>fn(x))
});
