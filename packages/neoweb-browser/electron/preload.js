// packages/neoweb-browser/electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Whitelist of valid channels
const VALID_CHANNELS = [
  'resolve-neo-domain',
  'get-peer-count',
  'content-fetched',
  'dht-query'
];

// Securely expose IPC methods
contextBridge.exposeInMainWorld('neowebAPI', {
  resolveDomain: (domain) => {
    if (typeof domain !== 'string' || !domain.endsWith('.neo')) {
      throw new Error('Invalid domain format');
    }
    return ipcRenderer.invoke('resolve-neo-domain', domain);
  },
  getNetworkStats: () => ipcRenderer.invoke('get-peer-count'),
  subscribe: (callback) => {
    const handler = (_, data) => {
      if (VALID_CHANNELS.includes(data.channel)) {
        callback(data);
      }
    };
    ipcRenderer.on('pubsub-message', handler);
    return () => ipcRenderer.removeListener('pubsub-message', handler);
  }
});

// Context isolation validation
if (!process.contextIsolated) {
  throw new Error('Context isolation must be enabled');
}

// Protect against prototype pollution
Object.freeze(Object.prototype);
Object.freeze(Array.prototype);
