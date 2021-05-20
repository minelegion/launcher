import { Authenticator, IUser } from "minecraft-launcher-core";
import SecureStore from "./SecureStore";

type StorageType = {
    username: string;
    authentication: IUser;
};

export default class User {
    private username: string;
    private authentication: IUser;

    constructor({ username, authentication }: StorageType) {
        this.username = username;
        this.authentication = authentication;
    }

    public getAuthentication() {
        return this.authentication;
    }

    public getUsername() {
        return this.authentication.name;
    }

    public getAvatarSrc() {
        return `https://minelegion.hu/api/avatar/${this.getUsername()}`;
    }

    public async save() {
        await SecureStore.set("user", JSON.stringify({
            username: this.username,
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