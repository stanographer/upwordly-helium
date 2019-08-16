const electron = require('electron');
const { app, dialog, BrowserWindow, ipcMain } = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

const store = new Store();

let mainWindow;
let captionWindow;

// Disable error dialogs by overriding
// FIX: https://goo.gl/YsDdsS
dialog.showErrorBox = function(title, content) {
  console.log(`${title}\n${content}`);
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 250,
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
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
    captionWindow = null;
    app.quit();
  });
}

function openCaptioning(user, job, global) {
  const makeQueries = styles => {
    const { backgroundColor, color, fontSize, textBg } = styles;

    const signGen = () => {
      let count = -1;

      return function() {
        count += 1;
        return count === 0 ? '?' : '&';
      };
    };

    const sign = signGen();

    let string = '';

    if (backgroundColor !== undefined) {
      string = string.concat(`${sign()}color=${styles.backgroundColor}`);
    }

    if (color !== undefined) {
      string = string.concat(`${sign()}color=${styles.color}`);
    }

    if (fontSize !== undefined) {
      string = string.concat(`${sign()}fontSize=${styles.fontSize}`);
    }

    if (textBg !== undefined) {
      string = string.concat(`${sign()}textBg=${styles.textBg}`);
    }

    return string;
  };

  captionWindow = new BrowserWindow({
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
    height: 200,
    frame: false,
    transparent: true,
  });
  captionWindow.loadURL(
    isDev
      ? `http://localhost:3000#/${user}/${job}${makeQueries(global)}`
      : `file://${__dirname}/index.html#/${user}/${job}${makeQueries(global)}`,
  );

  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  // captionWindow.webContents.openDevTools();
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
  const { user, job, global } = arg;

  openCaptioning(user, job, global);
});

ipcMain.on('setPrefs', (_, arg) => {
  store.set('prefs', arg);
});

ipcMain.on('getPrefs', event => {
  event.reply('returnedPrefs', store.get('prefs'));
});
