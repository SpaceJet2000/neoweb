const { app, BrowserWindow } = require('electron');
const { createLibp2p } = require('libp2p');
const { NeoWebResolver } = require('./neoweb-protocol');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadFile('index.html');

  // Start embedded libp2p node
  startNeoWebNode();
});

async function startNeoWebNode() {
  const node = await createLibp2p(/* Config */);
  global.neowebNode = node; // Make available to renderer
}
