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

**Neu hier oder noch nie einen Fahrtenschreiber bedient?** Die Datei **BEBILDERTE-ANLEITUNG.html** im selben Ordner zeigt mit echten Bildschirmfotos Schritt für Schritt, was ein Fahrtenschreiber überhaupt ist und wie Fahrerkarte, Menü und Ausdruck funktionieren. Einfach im Browser öffnen.

## Bedienung

| Aktion | So geht es |
|---|---|
| Gerät verschieben | Freie Gehäusefläche ziehen |
| Grösse ändern | Fensterkanten ziehen |
| Bedienung / Maus zum Spiel durchreichen | **Strg+Alt+T** |
| Gerät ein-/ausblenden (Aufzeichnung läuft weiter) | **Strg+Alt+O** |
| Fahrerkarte ein-/ausblenden | **Strg+Alt+K** |
| Nachtmodus (gedimmtes Display) | **Strg+Alt+N** |
| Grösse Mini / Normal / Gross | **Strg+Alt+1 / 2 / 3** |
| Simulation pausieren / fortsetzen | **Strg+Alt+P** |
| Einstellungen, Aufzeichnungen, Nachträge, Export | **Strg+Alt+E** |
| App-Menü | Rechtsklick auf eine Gerätetaste oder auf das Symbol im Infobereich |

**Menü:** Mit den Tasten Zurück, Hoch, Runter und OK am Gerät (mit der Maus).

## Vollständige Tastatur- und Controller-Steuerung

Für alle, die ohne Maus spielen (z. B. mit Lenkrad und Pedalen), lässt sich das Gerät komplett über Tastatur oder Gamepad bedienen. Auf der Tastatur wird bewusst **nur Strg + Nummernblock** genutzt, damit nichts mit den Tasten von The Bus (Pfeiltasten, WASD, Q/W/P/T, Escape, blosser Nummernblock usw.) kollidiert:

| Funktion | Tastatur | Controller |
|---|---|---|
| Menü: Hoch / Runter / OK / Zurück | **Strg+Num 8** / **Strg+Num 2** / **Strg+Num 5** / **Strg+Num 0** | Steuerkreuz (Dpad) / A / B |
| Aktivität Fahrer 1 / 2 wechseln | **Strg+Num 1** / **Strg+Num 3** | LB / RB |
| Fahrerkarte 1 / 2 auswerfen | **Strg+Num 4** / **Strg+Num 6** | LT / RT |
| Druckerschublade öffnen/schliessen | **Strg+Num 7** | Start |
| Ausdruck abreissen | **Strg+Num 9** | Select/Back |

Ein angeschlossener Controller wird automatisch erkannt, keine Einrichtung nötig. Die Hotkeys wirken nicht, solange ein Eingabefeld (z. B. der Kartenname) fokussiert ist. Hat deine Tastatur keinen eigenen Nummernblock (z. B. kompakte Notebook-Tastatur), bedienst du das Gerät wie gewohnt per Maus.

**Fahrerkarte einschieben:** Auf den Kartennamen doppelklicken, einen Namen eingeben, Enter drücken. Die Fahrertaste (1 oder 2) mindestens zwei Sekunden halten, bis der Schacht öffnet. Die Karte anklicken oder zum Schacht ziehen. Danach Nachtrag, Land und Bestätigung am Gerät abschliessen.

**Aktivität wechseln:** Kurz auf die Fahrertaste drücken (nur im Stillstand): Ruhe, Arbeit, Bereitschaft. Lenkzeit wird bei Fahrt automatisch erfasst, nach dem Anhalten wird sonstige Arbeit eingestellt. Eine Haltestelle ist keine automatische Pause: Für eine Pause am Gerät **Ruhe** wählen.

**Karte entnehmen:** Fahrertaste lange halten, Endland wählen, ausgeworfene Karte abnehmen.

**Ohne Karte fahren:** Ist in Schacht 1 keine Karte, blinkt „Fahren ohne Karte“. Die Fahrt wird als nicht zugeordnete Lenkzeit protokolliert.

**Drucken:** Über das Gerätemenü. Den Ausdruck mit dem Schnitt abreissen.

## Gerätemodell

In den Einstellungen (**Strg+Alt+E**) lässt sich das Gerätemodell wählen: **VDO DTCO 4.1** oder **VDO DTCO 1381**. Beide Modelle zeigen dasselbe aufgezeichnete Fahrverhalten, unterscheiden sich aber bei Bedienfeld, Menüführung, Ausdrucken und Warnton – nachgebildet nach der jeweiligen Originalbedienungsanleitung. Beim DTCO 1381 wird die Fahrerkarte über eine eigene Auswurftaste neben dem Kartenschacht entnommen statt per langem Tastendruck.

## Nachtmodus

**Strg+Alt+N** dimmt das Display (gedimmte Hintergrundbeleuchtung wie bei manchen echten Geräten in der Dunkelheit). Lässt sich auch in den Einstellungen dauerhaft aktivieren.

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
