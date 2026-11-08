# Tachograph for The Bus (echolino.com)

Your tachograph is running. And it's watching. **The Tachograph for The Bus** is a digital tachograph overlay for **The Bus**. It reads speed and vehicle data from the game's telemetry and keeps track of driving, work, break and rest times following the Swiss EU driving and rest time rules (561/2006) / Swiss ARV 1, the way a professional driver lives them. When switched on, the display shows "echolino.com" for five seconds.

You operate a proper device: insert your driver card, enter missing time, pick your country, tear off the printout. Driving time runs by itself, you switch break and work yourself. Overstep and the tacho warns you.

There is no connection to real driver cards, GNSS or a vehicle bus. The application sends no control commands to the game and no data to the internet.

## Requirements

- Windows 10 or 11 (64-bit)
- The Bus with **telemetry** enabled (HTTP interface, port 37337). If you just enabled it, restart the game once.
- For the in-game overlay use **borderless windowed mode**. In exclusive fullscreen the overlay may be hidden.

No Node.js, Python or other software is needed.

## Installation and start

1. Extract the whole **Tachograph-TheBus** folder anywhere (keep all files together).
2. Run **Tachograph-TheBus.exe**. Windows may show a SmartScreen warning because the program is not code-signed: click "More info", then "Run anyway".
3. Start The Bus and sit in a bus. The device shows "echolino.com", then the time, speed and odometer.

To quit: right-click the tray icon, then "Quit". Alt+F4 only hides the device; recording continues.

## Controls

| Action | How |
|---|---|
| Move device | Drag an empty part of the housing |
| Resize | Drag the window edges |
| Pass controls / mouse through to the game | **Ctrl+Alt+T** |
| Show/hide device (recording continues) | **Ctrl+Alt+O** |
| Show/hide driver card | **Ctrl+Alt+K** |
| Pause / resume simulation | **Ctrl+Alt+P** |
| Settings, records, manual entries, export | **Ctrl+Alt+E** |
| App menu | Right-click a device button or the tray icon |

**Menu:** Use the Back, Up, Down and OK buttons on the device (with the mouse).

**Inserting a driver card:** Double-click the card name, enter a name, press Enter. Hold the driver button (1 or 2) for at least two seconds until the slot opens. Click the card or drag it to the slot. Then finish the manual entry, country and confirmation on the device.

**Changing activity:** Briefly press the driver button (only while stopped): rest, work, availability. Driving is recorded automatically; after stopping, other work is set. A bus stop is not an automatic break: choose **rest** on the device for a break.

**Removing the card:** Hold the driver button, choose the end country, take the ejected card.

**Driving without a card:** If slot 1 is empty, "driving without card" blinks. The drive is logged as unassigned driving time.

**Printing:** Via the device menu. Tear off the printout at the cutter.

## Game pause

Telemetry does not reliably report whether the game is paused. Before opening the game menu, pausing or tabbing out for a while, press **Ctrl+Alt+P**, and resume afterwards. Otherwise a frozen speed value may keep running. A pause creates a data gap, not a rest period.

## Rules

The device calculates according to EU driving and rest time rules (561/2006) / Swiss ARV 1 (articles 5–11) for solo drivers: daily, weekly and two-week driving time, a break after 4½ hours (also split 15+30 minutes), working time and breaks, daily and weekly rest with reductions and compensation, and the 26-week working time average. Scheduled services up to 50 km are included; this is noted in settings, exports and printouts.

Not evaluated: multi-manning, ferry interruptions, special rules for occasional services, justified exceptions and labour law. Missing history and gaps are shown.

## Data

Everything stays on your PC: `%APPDATA%\Tachograph-TheBus\tachograph.sqlite` (with backup `tachograph.sqlite.bak`). With Ctrl+Alt+E you can export records as JSON and CSV and remove names before sharing. Telemetry samples are kept for seven days; activities are kept.

## Help

- **Speed shows "---":** The Bus is not running or telemetry is off. Check the port in settings (Ctrl+Alt+E); default is 37337.
- **Overlay not visible:** Start the game in borderless windowed mode, press Ctrl+Alt+O.
- **Mouse does not reach the game:** Press Ctrl+Alt+T (mouse pass-through).

## Licenses and notes

The program is based on Electron (MIT license) and Chromium; the license texts are in `LICENSE` and `LICENSES.chromium.html` in the folder. The operation follows the public manual of a DTCO 4.1. All trademarks belong to their owners. This project is not affiliated with TML-Studios, Continental or VDO.

© echolino.com
