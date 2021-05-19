import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import keytar from "keytar";

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
    });

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

    if (isProd) {
        await mainWindow.loadURL('app://./home.html');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }
})();

app.on('window-all-closed', () => {
    app.quit();
});
