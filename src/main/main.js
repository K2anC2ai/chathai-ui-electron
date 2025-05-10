const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { generateCypressTests } = require('chathai/src/generate-cypress');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle IPC calls from the renderer process
ipcMain.handle('generate-tests', async (event, { excelPath, outputDir }) => {
    try {
        generateCypressTests(excelPath, outputDir);
        return { success: true, message: 'Test scripts generated successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
});