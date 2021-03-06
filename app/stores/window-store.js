'use strict'

let AppActions = require('../actions/app-actions')
let AppDispatcher = require('../dispatcher/app-dispatcher')
let AppConstants = require('../constants/app-constants')
let Store = require('./store')

let app = require('electron').app
let BrowserWindow = require('electron').BrowserWindow

let window
let quitting = false

let WindowStore = Object.assign(new Store('window-store'), {
  with: (f) => {
    if (!window) return
    f(window)
  }
})

function show () {
  if (window) {
    AppActions.gain_focus()
    window.show()
    return
  }

  let width = 1200
  let height = 720

  window = new BrowserWindow({
    title: 'itch',
    icon: './static/images/itchio-tray-x4.png',
    width, height,
    center: true,
    show: false,
    'title-bar-style': 'hidden'
  })

  window.on('close', (e) => {
    console.log(`window event: close`)
    if (quitting) return
    e.preventDefault()
    window.hide()
  })

  window.on('focus', (e) => {
    console.log(`window event: focus`)
    AppActions.gain_focus()
  })

  window.webContents.on('dom-ready', (e) => {
    AppActions.window_ready()
    window.show()
  })
  window.loadURL(`file://${__dirname}/../index.html`)

  if (process.env.DEVTOOLS === '1') {
    window.openDevTools()
  }
}

function hide () {
  WindowStore.with(w => w.hide())
}

function _eval (payload) {
  if (!window) return
  let web = window.webContents
  if (!web) return
  web.executeJavaScript(payload.code)
}

AppDispatcher.register('window-store', Store.action_listeners(on => {
  on(AppConstants.BOOT, show)
  on(AppConstants.FOCUS_WINDOW, show)
  on(AppConstants.HIDE_WINDOW, hide)
  on(AppConstants.EVAL, _eval)
  on(AppConstants.QUIT, () => {
    quitting = true
    app.quit()
  })
  on(AppConstants.CHANGE_USER, () => {
    if (!window) return
    let web = window.webContents
    if (!web) return
    web.executeJavaScript(`
      var yes = window.confirm('Are you sure you want to log out?')
      if (yes) {
        require('./actions/app-actions').logout()
      }
    `)
  })
}))

app.on('before-quit', e => {
  quitting = true
})

module.exports = WindowStore
