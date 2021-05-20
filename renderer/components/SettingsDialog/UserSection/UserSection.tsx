import { Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { ExitToAppRounded as LogoutIcon } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useUser } from "../../UserProvider";

const UserSection = () => {
    const { user, setUser } = useUser();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Felhasználói információk
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item>
                        <img className={classes.icon} src={user.getAvatarSrc()} width={64} height={64} />
                    </Grid>
                    <Grid item className={classes.username}>
                        <b>
                            {user.getUsername()}
                        </b>
                    </Grid>
                    <Grid item>
                        <Tooltip title={"Kijelentkezés"}>
                            <IconButton
                                onClick={async () => {
                                    await user.logout();
                                    setUser(null);
                                    enqueueSnackbar("Sikeres kijelentkezés!", {
                                        variant: "info",
                                    });
                                }}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    username: {
        width: "calc(100% - 144px)",
    },
}));

export default UserSection;