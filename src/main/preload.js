const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('chathaiAPI', {
    generateTests: (excelPath, outputDir) =>
        ipcRenderer.invoke('generate-tests', { excelPath, outputDir }),
});