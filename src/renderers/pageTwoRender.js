const { ipcRenderer, ipcMain } = require('electron');

const myNotification = new Notification(
    'Title', 
    {
        body: 'Notification from the Renderer process'
    }
);

myNotification.onclick = () => {
    console.log('Notification clicked')
}

ipcRenderer.send('data',"RenderData");

const serverData = document.getElementById('serverData');
const serverConnect = () => fetch(
    'http://192.168.219.117:3003'
).then(res => res.json()).then(json => serverData.innerText = json[0]).catch(_ => serverData=false);