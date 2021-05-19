import { ipcRenderer } from "electron";
import { resolve } from "path";
import { readConfigRequest, readConfigResponse, writeConfigRequest, writeConfigResponse } from "secure-electron-store";


export default class SecureStore {
    public static async get(key: string): Promise<string> {
        return new Promise((resolve) => {
            ipcRenderer.once("secure-store-get-response", (event, value) => {
                resolve(value);
            });
            ipcRenderer.send("secure-store-get-request", key);
        });
    }

    public static async set(key: string, value: string): Promise<true> {
        return new Promise((resolve) => {
            ipcRenderer.once("secure-store-set-response", (event, value) => {
                resolve(value);
            });
            ipcRenderer.send("secure-store-set-request", key, value);
        });
    }

    public static async delete(key: string): Promise<boolean> {
        return new Promise((resolve) => {
            ipcRenderer.once("secure-store-delete-response", (event, value) => {
                resolve(value);
            });
            ipcRenderer.send("secure-store-delete-request", key);
        });
    }
}