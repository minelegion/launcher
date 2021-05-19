import { Authenticator, IUser } from "minecraft-launcher-core";
import SecureStore from "./SecureStore";

type StorageType = {
    username: string;
    password?: string;
    authentication: IUser;
};

export default class User {
    private username: string;
    private password?: string;
    private authentication: IUser;

    constructor({ username, password, authentication }: StorageType) {
        this.username = username;
        this.password = password;
        this.authentication = authentication;
    }

    public getAuthentication() {
        return this.authentication;
    }

    public getUsername() {
        return this.authentication.name;
    }

    public async save() {
        await SecureStore.set("user", JSON.stringify({
            username: this.username,
            password: this.password,
            authentication: this.authentication,
        }));

        return;
    }

    public async logout() {
        await SecureStore.delete("user");
    }

    public static async load() {
        const resp = await SecureStore.get("user");
        if(!resp) return;

        const data: StorageType = JSON.parse(resp);

        return new User(data);
    }
}