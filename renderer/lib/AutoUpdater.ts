import { ipcRenderer } from "electron";
import { ProgressInfo, UpdateCheckResult, UpdateInfo } from "electron-updater";

export default class AutoUpdater {
    /**
     * Closes the application and installs the updates
     */
    public static async install() {
        ipcRenderer.send("auto-updater-quit-and-install");
    }

    /**
     * Checks for updates and if there is available, then downloads it
     */
    public static async check(): Promise<UpdateCheckResult> {
        return new Promise((resolve) => {
            ipcRenderer.on("auto-updater-check-for-updates-response", (e, resp) => {
                resolve(resp);
            });

            ipcRenderer.send("auto-updater-check-for-updates");
        });
    }

    public static on(listener: (...args) => any) {
        ipcRenderer.on("auto-updater-message", (event, ...args) => {
            listener(args);
        });
    }

    public static onError(listener: (error: Error) => any) {
        const key = "error";

        ipcRenderer.on("auto-updater-message", (e, event, error) => {
            if(event === key) listener(error);
        });
    }

    public static onCheckingForUpdate(listener: () => any) {
        const key = "checking-for-update";

        ipcRenderer.on("auto-updater-message", (e, event, error) => {
            if(event === key) listener();
        });
    }

    public static onUpdateAvailable(listener: (info: UpdateInfo) => any) {
        const key = "update-available";

        ipcRenderer.on("auto-updater-message", (e, event, info) => {
            if(event === key) listener(info);
        });
    }

    public static onUpdateNotAvailable(listener: (info: UpdateInfo) => any) {
        const key = "update-not-available";

        ipcRenderer.on("auto-updater-message", (e, event, info) => {
            if(event === key) listener(info);
        });
    }

    public static onDownloadProgress(listener: (progress: ProgressInfo) => any) {
        const key = "download-progress";
        
        ipcRenderer.on("auto-updater-message", (e, event, progress) => {
            if(event === key) listener(progress);
        });
    }

    public static onUpdateDownloaded(listener: (info: UpdateInfo) => any) {
        const key = "update-downloaded";
        ipcRenderer.on("auto-updater-message", (e, event, info) => {
            if(event === key) listener(info);
        });
    }
}
