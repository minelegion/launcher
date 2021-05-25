import { Button, Dialog, DialogContent, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { useUser } from "@renderer/components/UserProvider";
import Storage from "@renderer/lib/Storage";
import { Client } from "minecraft-launcher-core";
import { Fragment, useState } from "react";
import { useJava } from "../UserCard/SettingsDialog/JavaSection/JavaSection";
import fs from "fs";

const launcher = new Client();

type ProgressType = {
    name?: string;
    type: "natives" | "classes" | "assets" | "libraries" | "client-package";
    current: number;
    total: number;
};

const descriptions = {
    "natives": "Natív függőségek letöltése",
    "assets": "Kellékek betöltése",
    "libraries": "Könyvtárak letöltése",
    "client-package": "Kliens csomagok letöltése",
    "classes": "Osztályok letöltése"
};

const PlayButton = () => {
    const { user } = useUser();
    const classes = useStyles();

    const {min, max} = useJava();
    const [disabled, setDisabled] = useState(false);
    const [state, setState] = useState<ProgressType>(null);

    const toGB = (num: number) => num / 1024 / 1024;

    const play = async () => {
        setDisabled(true);

        launcher.on('close', () => setDisabled(false));
        launcher.on('debug', (e) => console.log(e));
        launcher.on('data', (e) => console.log(e));

        launcher.on("progress", setState);

        launcher.on("download-status", setState);

        const root = `${await Storage.getPath('userData')}/minecraft`;
        const clientPackage = fs.existsSync(`${root}/options.txt`) ? null :" https://raw.githubusercontent.com/minelegion/launcher/main/resources/client_packages.zip";

        await launcher.launch({
            clientPackage,
            removePackage: true,
            authorization: (async () => user.getAuthentication())(),
            root,
            version: {
                number: "1.16.5",
                type: "release"
            },
            memory: {
                max: `${toGB(max)}G`,
                min: `${toGB(min)}G`,
            }
        });

        setState(null);
    };

    return (
        <Fragment>
            <Button
                fullWidth
                size={"large"}
                color={"primary"}
                variant={"contained"}
                className={classes.root}
                disabled={disabled}
                onClick={play}
            >
                Indítás
            </Button>
            <Dialog open={!!state} fullWidth maxWidth={"sm"}>
                <DialogContent>
                    <Typography>
                        {descriptions[state?.type] || state?.type}{state?.name && `: ${state?.name}`}
                    </Typography>
                </DialogContent>
                <LinearProgress
                    variant={"determinate"}
                    value={state?.current / state?.total * 100}
                />
            </Dialog>
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: -24,
    },
}));

export default PlayButton;