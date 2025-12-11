import { app, contextBridge, ipcRenderer } from "electron";

const versions = process.versions;


contextBridge.exposeInMainWorld("electron", {
  send: (channel: string, ...args: any[]) => {
    return ipcRenderer.send(channel, ...args)
  },
  version: {
    electron: versions.electron,
    chrome: versions.chrome,
    node: versions.node
  }
});
