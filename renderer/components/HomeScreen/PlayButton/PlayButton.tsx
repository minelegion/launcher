import { Button, makeStyles } from "@material-ui/core";
import { useUser } from "@renderer/components/UserProvider";
import Storage from "@renderer/lib/Storage";
import { Client } from "minecraft-launcher-core";
import { useState } from "react";

const launcher = new Client();

const PlayButton = () => {
    const { user } = useUser();
    const classes = useStyles();

    const [disabled, setDisabled] = useState(false);

    const play = async () => {
        setDisabled(true);

        launcher.launch({
            clientPackage: null,
            authorization: (async () => user.getAuthentication())(),
            root: `${await Storage.getPath('userData')}/minecraft`,
            version: {
                number: "1.16.5",
                type: "release"
            },
            memory: {
                max: "6G",
                min: "4G"
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