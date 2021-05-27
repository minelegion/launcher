import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useAutoUpdater } from "@renderer/components/AutoUpdaterProvider";
import { QuitAndInstallButton, UpdateDescription, UpdateIcon, UpdateTitle } from "@renderer/components/HomeScreen/UpdateCard/UpdateCard";

const UpdatesSection = () => {
    const classes = useStyles();
    const { state: { state } } = useAutoUpdater();
    
    return (
        <Grid
            container
            spacing={2}
            alignItems={"center"}
        >
            <Grid item>
                <UpdateIcon />
            </Grid>
            <Grid item>    
                <UpdateTitle />
                <UpdateDescription />
            </Grid>
            {state === "update-downloaded" && (
                <Grid item className={classes.right}>
                    <QuitAndInstallButton />
                </Grid>
            )}
        </Grid>
    );
};

const useStyles = makeStyles(() => ({
    right: {
        marginLeft: "auto",
    },
}))

export default UpdatesSection;