import { ipcRenderer } from "electron";

export default class Storage {
    public static async getPath(name): Promise<string> {
        return await ipcRenderer.invoke("app-get-path", name);
    } 
}