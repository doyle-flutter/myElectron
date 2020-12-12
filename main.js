const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
  });
  mainWindow.loadFile(path.join(__dirname, '/src/pages/mainPage.html'));
  mainWindow.webContents.openDevTools();
};

ipcMain.on('data', (e,...a) => {
    console.log(`ipcRender Emit -> ipcMain On : ${a[0]}`);
});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});




