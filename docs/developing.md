
## Installing

itch is built in HTML/SCSS/ES6 and runs inside of Electron. Install the
following to get started with development:

* Install [node.js][] (version *4.2.x* is recommended, tests won't run on anything lower)
* Install [electron][]:

[node.js]: https://nodejs.org/
[electron]: https://github.com/atom/electron

```
npm install -g electron-prebuilt@0.35.4
```

**N.B: 0.36.0 is known not to work with itch, 0.35.4 is the recommended release**

* Install [sassc][] following the instructions for [Unix][sassc-unix] or
  [Windows][sassc-win].  Make sure it's in your `$PATH`.

[sassc]: https://github.com/sass/sassc
[sassc-unix]: https://github.com/sass/sassc/blob/master/docs/building/unix-instructions.md
[sassc-win]: https://github.com/sass/sassc/blob/master/docs/building/windows-instructions.md

* Check out this repository

* Install the javascript dependencies:

```bash
$ npm install
```

* You can now run the app:

```bash
$ npm start
```

Running the app like that will be slower than a release, as it compiles
files as they are loaded, with [babel][]'s require hook.

We use [grunt][] for packaging, see our [CI job definitions][ci].

[babel]: http://babeljs.io/
[grunt]: https://github.com/gruntjs/grunt
[ci]: https://github.com/itchio/ci.itch.ovh/blob/master/src/jobs/itch.yml

## itch for game developers

If your game is:

  * an archive (.zip, .7z, .tar.gz, .tar.bz2) — *but not .rar*
    * containing an .exe on Windows
    * containing a .app bundle or shell script on OSX
    * containing an .exe or shell script on Linux
  * an installer powered by NSIS or InnoSetup on Windows
  * an MSI file on Windows
  * just a plain .exe file on Windows (not recommended)

Then you're golden.

Try logging in with your account and installing+launching your game.

If it fails, inspect the log by `Alt-clicking` on the game's thumbnail,
it should open a `.txt` file with your default text editor.

See where game is installed by `Shift-clicking` on it or clicking the
'Open folder' icon.

## Debug facilities

**N.B. when running from msys, `export OS=cygwin` to see log output**

These keys do things:

  * `Shift-F5` — reload the UI. Since the state is stored outside of the browser,
    this shouldn't corrupt 
  * `F12` — open Chrome Devtools

These environment variables will change the behavior of the app:

  * `DEVTOOLS=1` — start with Chrome Devtools open — useful when something goes
    wrong before the `F12` binding becomes available.
  * `MARCO_POLO=1` — dumps all Flux events being dispatched throughout the app.
    We attempt to filter that (see `private` field in payloads) but **please
    pay extra care to any logs you post publicly** to make sure you're not leaking
    your own credentials.
  * `LET_ME_IN=1` — dump itch.io API calls to console
  * `DANGER_ZONE=1` — enable `Danger Zone` Help submenu with crashing options
  * `DIEGO_IS_ASLEEP=1` - forbid [our diagnostics tool][diego] from running commands like
    `uname`, `lspci`, `sw_vers`, `wmic`, and `ver` on your system and writing
    the results to a file on your local disk.

[diego]: diego.md

Pro-tip: [undock the Chrome devtools][undock], they're more usable as a separate Windows.

[undock]: https://encrypted.google.com/search?hl=en&q=chrome%20dev%20tools%20undock
