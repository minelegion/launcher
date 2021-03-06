import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { useUser } from "@renderer/components/UserProvider";
import Storage from "@renderer/lib/Storage";
import { Client } from "minecraft-launcher-core";
import { Fragment, useState } from "react";
import { useJava } from "../UserCard/SettingsDialog/JavaSection/JavaSection";
import fs from "fs";
import https from "https";
import ErrorDialog from "@renderer/components/ErrorDialog";

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

    const { min, max } = useJava();
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<{ open: boolean; content: string }>({ open: false, content: "" });
    const [state, setState] = useState<ProgressType>(null);

    const toGB = (num: number) => num / 1024 / 1024;

    const play = async () => {
        setDisabled(true);

        launcher.on('data', (content) => {
            console.log(content);

            launcher.on("close", (e) => {    
                if(e !== 0) setError({ open: true, content });
            });
        });

        launcher.on('close', (e) => {
            setDisabled(false);
        });

        launcher.on('debug', (e) => console.log(e));

        launcher.on("progress", setState);
        launcher.on("download-status", setState);

        const root = `${await Storage.getPath('userData')}/minecraft`;

        await prepare();

        await launcher.launch({
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
            <ErrorDialog
                {...error}
                onClose={() => setError({ ...error, open: false })}
            />
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

const prepare = async () => {
    const download = async (url, dest) => {
        https.get(url, (resp) => {
            const file = fs.createWriteStream(dest);
            resp.pipe(file);
            file.on('finish', function () {
                file.close();
            });
        });
    }

    const files = [
        {
            name: "servers.dat",
            url: "https://raw.githubusercontent.com/minelegion/launcher/main/resources/servers.dat",
        },
        {
            name: "options.txt",
            url: "https://raw.githubusercontent.com/minelegion/launcher/main/resources/options.txt"
        }
    ];

    for(const file of files) {
        const dest = `${await Storage.getPath('userData')}/minecraft/${file.name}`;
        if(fs.existsSync(dest)) continue;

        await download(file.url, dest);
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: -24,
    },
}));

export default PlayButton;