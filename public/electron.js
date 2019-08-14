const electron = require('electron');
const { app, dialog, BrowserWindow, ipcMain } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let captionWindow;

// Disable error dialogs by overriding
// FIX: https://goo.gl/YsDdsS
dialog.showErrorBox = function(title, content) {
  console.log(`${title}\n${content}`);
};

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
      : `file://${path.join(__dirname, '../build/index.html')}`,
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

function openCaptioning(user, job) {
  captionWindow = new BrowserWindow({
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 200,
    frame: false,
  });
  captionWindow.loadURL(
    isDev
      ? `http://localhost:3000#/${user}/${job}`
      : `file://${path.join(__dirname, `../build/index.html#/${user}/${job}`)}`,
  );

  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  captionWindow.setAlwaysOnTop(true, 'floating');
  captionWindow.setVisibleOnAllWorkspaces(true);
  captionWindow.setFullScreenable(false);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    ipcMain.removeAllListeners('start');
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('start', (_, arg) => {
  const { user, job } = arg;

  openCaptioning(user, job);
});
