import { Button, Card, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Fragment } from "react";
import UserCard from "./UserCard";

const HomeScreen = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.main}>
                <div className={classes.container}>
                    <Container maxWidth={"sm"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <UserCard />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Paper square className={classes.bottom}>
                <Container maxWidth={"sm"}>
                    <Button
                        fullWidth
                        size={"large"}
                        color={"primary"}
                        variant={"contained"}
                        className={classes.playButton}
                    >
                        Indítás
                    </Button>
                </Container>
            </Paper>
        </Fragment>
    );
};

const BOTTOM_HEIGHT = 64;

const useStyles = makeStyles((theme) => ({
    container: {
        backdropFilter: "brightness(50%)",
        minHeight: "100vh",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2) + BOTTOM_HEIGHT + 24,
    },
    playButton: {
        marginTop: -24,
    },
    main: {
        background: "url(/images/landscape.png)",
        backgroundSize: "cover",
    },
    bottom: {
        maxWidth: "100vw",
        height: BOTTOM_HEIGHT,
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
    },
}));

export default HomeScreen;