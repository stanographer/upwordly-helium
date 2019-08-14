const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let captionWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html#/')}`,
  );
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension
    // ('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
    captionWindow = null;
    app.quit();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('start', (event, arg) => {
  captionWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    transparent: true,
    width: 900,
    height: 200,
    frame: false,
  });
  captionWindow.loadURL(
    isDev
      ? `http://localhost:3000#/captioning/${arg.user}/${arg.job}`
      : `file://${path.join(
          __dirname,
          `../build/index.html#/captioning/${arg.user}/${arg.job}`,
        )}`,
  );

  app.dock.hide();
  captionWindow.setAlwaysOnTop(true, 'floating');
  captionWindow.setVisibleOnAllWorkspaces(true);
  captionWindow.setFullScreenable(false);
});
