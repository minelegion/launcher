import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import keytar from "keytar";
import { autoUpdater } from "electron-updater";

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
    await app.whenReady();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        minHeight: 300,
        minWidth: 300,
        autoHideMenuBar: true,
        title: "MineLegion"
    });

    initSecureStore();

    function sendStatusToWindow(event, ...args) {
        mainWindow.webContents.send("auto-updater-message", event, ...args);
    }

    autoUpdater.on("checking-for-update", () => {
        sendStatusToWindow("checking-for-update");
    });

    autoUpdater.on("update-available", (info) => {
        sendStatusToWindow("update-available", info);
    });
    
    autoUpdater.on("update-not-available", (info) => {
        sendStatusToWindow("update-not-available", info);
    });
    
    autoUpdater.on("error", (err) => {
        sendStatusToWindow("error", err);
    });
    
    autoUpdater.on("download-progress", (progressObj) => {
        sendStatusToWindow("download-progress", progressObj);
    });
    
    autoUpdater.on("update-downloaded", (info) => {
        sendStatusToWindow("update-downloaded", info);
    });

    ipcMain.on("auto-updater-check-for-updates", async (e) => {
        const resp = await autoUpdater.checkForUpdatesAndNotify();
        e.reply("auto-updater-check-for-updates-response", resp);
    });

    ipcMain.on("auto-updater-quit-and-install", async () => {
        await autoUpdater.quitAndInstall();
    });

    ipcMain.handle("app-get-path", async (event, name) => {
        return await app.getPath(name);
    });
    
    if (isProd) {
        await mainWindow.loadURL('app://./home.html');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }
})();


const initSecureStore = () => {
    ipcMain.on("secure-store-set-request", async (event, key, value) => {
        await keytar.setPassword("secure-storage", key, value);
        event.reply("secure-store-set-response", true);
    });

    ipcMain.on("secure-store-get-request", async (event, key) => {
        const value = await keytar.getPassword("secure-storage", key);
        event.reply("secure-store-get-response", value);
    });

    ipcMain.on("secure-store-delete-request", async (event, key) => {
        await keytar.deletePassword("secure-storage", key);
        event.reply("secure-store-delete-response");
    });
};

app.on('window-all-closed', () => {
    app.quit();
});
