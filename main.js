const { app, remote, BrowserWindow, ipcMain, Menu, MenuItem, globalShortcut } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Doc : BrowserWindow는 EventEmitter를 상속받은 클래스 입니다.
  // -> class BrowserWindow extends EventEmitter{}
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
  

  // * Doc
  // before-input-event 이벤트는 페이지 안에서 
  // keydown과 keyup 이벤트를 전달하기 전에 실행됩니다. 
  // 이는 메뉴 안에서 보이지 않는 사용자 정의 단축키를 캐치하여 처리할 것입니다.
  // -> mainPage.html 의 window.addEventListener 보다 우선권
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I');
      event.preventDefault()
    }
  });

  // new Window
  let subWindow = new BrowserWindow({
    parent: mainWindow,
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  subWindow.loadFile(path.join(__dirname, '/src/pages/newBrowser.html'));
  subWindow.webContents.openDevTools();
  
  // modal Window
  // parent 지정 할 경우 최상위 부모에게 제어권이 있음
  let modal = new BrowserWindow({
    width: 200,
    height: 150,
    modal: true, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  modal.loadURL('https://github.com')
  modal.show();
};


ipcMain.on('data', (e,...a) => {
    console.log(`ipcRender Emit -> ipcMain On : ${a[0]}`);
});
ipcMain.on('sendData', (e,...a) => {
  console.log(`[newBrowser] ipcRender Emit -> ipcMain On : ${a[0]}`);
});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Global Shortcut Key
app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+A', () => {
    console.log('Electron loves global shortcuts!')
  })
});

// Tap LocalMenu
const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))
Menu.setApplicationMenu(menu);



