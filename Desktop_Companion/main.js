const { app, BrowserWindow, ipcMain } = require('electron');
require('electron-reload')(__dirname); // electron-reload

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 320,
    height: 420,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    center: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

/* Window control ipc handlers - title bar buttons */
ipcMain.on('window:minimize', () => win.minimize());
ipcMain.on('window:close', () => win.close());