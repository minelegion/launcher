import { Button, makeStyles } from "@material-ui/core";
import { useUser } from "@renderer/components/UserProvider";
import Storage from "@renderer/lib/Storage";
import { Client } from "minecraft-launcher-core";
import { useState } from "react";
import { useJava } from "../UserCard/SettingsDialog/JavaSection/JavaSection";

const launcher = new Client();

const PlayButton = () => {
    const { user } = useUser();
    const classes = useStyles();

    const {min, max} = useJava();
    const [disabled, setDisabled] = useState(false);

    const play = async () => {
        setDisabled(true);

        launcher.launch({
            clientPackage: "https://raw.githubusercontent.com/minelegion/launcher/main/resources/client_packages.zip",
            authorization: (async () => user.getAuthentication())(),
            root: `${await Storage.getPath('userData')}/minecraft`,
            version: {
                number: "1.16.5",
                type: "release"
            },
            memory: {
                max,
                min,
            }
        });

        launcher.on('close', () => setDisabled(false));
        launcher.on('debug', (e) => console.log(e));
        launcher.on('data', (e) => console.log(e));
    };

    return (
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
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: -24,
    },
}));

export default PlayButton;