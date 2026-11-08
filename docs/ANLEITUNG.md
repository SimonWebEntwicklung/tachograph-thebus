# Tachograph für The Bus (echolino.com)

Dein Tacho läuft. Und er schaut genau hin. **Der Tachograph für The Bus** ist ein digitaler Tachograph als Overlay für **The Bus**. Er liest Tempo und Fahrzeug aus der Telemetrie des Spiels und führt Lenk-, Arbeits-, Pausen- und Ruhezeiten nach den Regeln der schweizerischen EU-Lenk- und Ruhezeiten (561/2006) / Schweizer ARV 1, so wie es ein Berufsfahrer erlebt. Beim Einschalten zeigt das Display fünf Sekunden lang „echolino.com“.

Du bedienst ein richtiges Gerät: Fahrerkarte einschieben, Nachtrag erfassen, Land wählen, Ausdruck abreissen. Die Lenkzeit läuft von allein, Pause und Arbeit schaltest du selbst. Überziehst du, warnt dich der Tacho.

Es gibt keine Verbindung zu echten Fahrerkarten, GNSS oder einem Fahrzeugbus. Die Anwendung sendet keine Steuerbefehle an das Spiel und keine Daten ins Internet.

## Voraussetzungen

- Windows 10 oder 11 (64 Bit)
- The Bus mit eingeschalteter **Telemetrie** (HTTP-Schnittstelle, Port 37337). Wurde sie neu aktiviert, das Spiel einmal neu starten.
- Für das Overlay im Spiel den **randlosen Fenstermodus** verwenden. Im reinen Vollbildmodus kann das Overlay verdeckt werden.

Node.js, Python oder zusätzliche Programme werden nicht gebraucht.

## Installation und Start

1. Den ganzen Ordner **Tachograph-TheBus** an einen beliebigen Ort entpacken (alle Dateien beisammen lassen).
2. **Tachograph-TheBus.exe** starten. Windows zeigt eventuell eine SmartScreen-Warnung, weil das Programm nicht signiert ist: „Weitere Informationen“, dann „Trotzdem ausführen“.
3. The Bus starten und in einen Bus setzen. Das Gerät zeigt „echolino.com“ und danach die Uhrzeit, die Geschwindigkeit und den Kilometerstand.

Beenden: Rechtsklick auf das Symbol im Windows-Infobereich, dann „Beenden“. Alt+F4 verbirgt nur das Gerät, die Aufzeichnung läuft weiter.

## Bedienung

| Aktion | So geht es |
|---|---|
| Gerät verschieben | Freie Gehäusefläche ziehen |
| Grösse ändern | Fensterkanten ziehen |
| Bedienung / Maus zum Spiel durchreichen | **Strg+Alt+T** |
| Gerät ein-/ausblenden (Aufzeichnung läuft weiter) | **Strg+Alt+O** |
| Fahrerkarte ein-/ausblenden | **Strg+Alt+K** |
| Simulation pausieren / fortsetzen | **Strg+Alt+P** |
| Einstellungen, Aufzeichnungen, Nachträge, Export | **Strg+Alt+E** |
| App-Menü | Rechtsklick auf eine Gerätetaste oder auf das Symbol im Infobereich |

**Menü:** Mit den Tasten Zurück, Hoch, Runter und OK am Gerät (mit der Maus).

**Fahrerkarte einschieben:** Auf den Kartennamen doppelklicken, einen Namen eingeben, Enter drücken. Die Fahrertaste (1 oder 2) mindestens zwei Sekunden halten, bis der Schacht öffnet. Die Karte anklicken oder zum Schacht ziehen. Danach Nachtrag, Land und Bestätigung am Gerät abschliessen.

**Aktivität wechseln:** Kurz auf die Fahrertaste drücken (nur im Stillstand): Ruhe, Arbeit, Bereitschaft. Lenkzeit wird bei Fahrt automatisch erfasst, nach dem Anhalten wird sonstige Arbeit eingestellt. Eine Haltestelle ist keine automatische Pause: Für eine Pause am Gerät **Ruhe** wählen.

**Karte entnehmen:** Fahrertaste lange halten, Endland wählen, ausgeworfene Karte abnehmen.

**Ohne Karte fahren:** Ist in Schacht 1 keine Karte, blinkt „Fahren ohne Karte“. Die Fahrt wird als nicht zugeordnete Lenkzeit protokolliert.

**Drucken:** Über das Gerätemenü. Den Ausdruck mit dem Schnitt abreissen.

## Spielpause

Die Telemetrie meldet nicht zuverlässig, ob das Spiel pausiert. Vor Spielmenü, Pause oder längerem Tabwechsel deshalb **Strg+Alt+P** drücken und danach fortsetzen. Sonst kann ein eingefrorener Geschwindigkeitswert weiterlaufen. Die Pause erzeugt eine Datenlücke, keine Ruhezeit.

## Regeln

Das Gerät rechnet nach den EU-Lenk- und Ruhezeiten (561/2006) bzw. der Schweizer ARV 1 (Artikel 5–11) für Einzelfahrer: Tages-, Wochen- und Zweiwochenlenkzeit, Lenkpause nach 4½ Stunden (auch als 15+30 Minuten), Arbeitszeit und Arbeitspausen, tägliche und wöchentliche Ruhe mit Reduktionen und Ausgleich, Arbeitszeitmittel über 26 Wochen. Linienverkehr bis 50 km wird mitgewertet; das steht in den Einstellungen, Exporten und Ausdrucken.

Nicht bewertet werden Mehrfachbesatzung, Fährenunterbrechungen, Sonderregeln des Gelegenheitsverkehrs, begründete Abweichungen und das Arbeitsgesetz. Fehlende Vorgeschichte und Lücken werden angezeigt.

## Daten

Alles bleibt auf deinem Rechner: `%APPDATA%\Tachograph-TheBus\tachograph.sqlite` (mit Sicherung `tachograph.sqlite.bak`). Unter Strg+Alt+E kannst du Aufzeichnungen als JSON und CSV exportieren und Namen vor einer Weitergabe entfernen. Telemetrie-Stichproben werden sieben Tage aufbewahrt, die Aktivitäten bleiben erhalten.

## Hilfe

- **Gerät zeigt „---“ bei der Geschwindigkeit:** The Bus läuft nicht oder die Telemetrie ist aus. Port in den Einstellungen (Strg+Alt+E) prüfen, Standard ist 37337.
- **Overlay nicht sichtbar:** Spiel im randlosen Fenstermodus starten, Strg+Alt+O drücken.
- **Maus geht nicht ins Spiel:** Strg+Alt+T drücken (Mausdurchleitung).

## Lizenzen und Hinweise

Das Programm basiert auf Electron (MIT-Lizenz) und Chromium; die Lizenztexte liegen in den Dateien `LICENSE` und `LICENSES.chromium.html` im Ordner. Die Bedienung orientiert sich an der öffentlichen Bedienungsanleitung eines DTCO 4.1. Alle Marken gehören ihren Inhabern. Dieses Projekt ist nicht mit TML-Studios, Continental oder VDO verbunden.

© echolino.com
