import { CircularProgress, Grid, makeStyles } from "@material-ui/core";

const LoadingScreen = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            justify={"center"}
            className={classes.container}
            alignItems={"center"}
        >
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    );    
}

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: "100vh",
    },
}));

export default LoadingScreen;