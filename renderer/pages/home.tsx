import { Fragment, useState } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useUser } from '../components/UserProvider';
import { Button, Card, CardContent, Container, Grid, Hidden, IconButton, LinearProgress, Paper, Typography } from '@material-ui/core';
import { Client } from 'minecraft-launcher-core';
import { ExitToApp as LogoutIcon, SettingsRounded } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

const launcher = new Client();

const BOTTOM_HEIGHT = 64;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(4),
        },
        container: {
            paddingTop: 16,
            zIndex: 100,
            height: "100%",
            backdropFilter: "brightness(50%)",
        },
        userContent: {
            paddingBottom: "16px !important",
        },
        icon: {
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[8],
        },
        main: {
            background: "url(/images/landscape.png)",
            height: "100vh",
            backgroundSize: "cover",
            paddingBottom: BOTTOM_HEIGHT,
        },
        playButton: {
            height: 48,
            marginTop: -24,
        },
        item: {
            marginTop: 12,
        },
        progress: {
            marginLeft: 8,
            marginTop: (BOTTOM_HEIGHT - 4) / 2,
            marginBottom: (BOTTOM_HEIGHT - 4) / 2,
        },
        bottom: {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: BOTTOM_HEIGHT,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const HomeScreen = () => {
    const classes = useStyles({});
    const [progress, setProgress] = useState<number>(null);
    const [disabled, setDisabled] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { user, setUser } = useUser();

    const start = () => {
        setDisabled(true);

        launcher.launch({
            clientPackage: null,
            authorization: (async () => user.getAuthentication())(),
            root: "./minecraft",
            version: {
                number: "1.16.5",
                type: "release"
            },
            memory: {
                min: "4G",
                max: "6G",
            },
        });

        launcher.on('debug', (e) => console.log(e));
        launcher.on('data', (e) => console.log(e));
        launcher.on('close', (e) => setDisabled(false));
        launcher.on("progress", (e) => {
            console.log(e.task / e.total * 100);
            setProgress(e.task / e.total * 100)
        });
    };

    return (
        <Fragment>
            <div className={classes.main}>
                <div className={classes.container}>
                    <Container maxWidth={"sm"}>
                        <Card>
                            <CardContent className={classes.userContent}>
                                <Grid container spacing={2} alignItems={"center"}>
                                    <Grid item>
                                        <img
                                            src={`https://minelegion.hu/api/avatar/${user.getUsername()}`}
                                            width={64}
                                            height={64}
                                            className={classes.icon}
                                        />
                                    </Grid>
                                    <Grid item style={{ width: "calc(100% - 192px)" }}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography noWrap>
                                                    <b>
                                                        {user.getUsername()}
                                                    </b>
                                                </Typography>
                                                <Typography noWrap variant={"body2"}>
                                                    {user.getAuthentication().access_token == user.getAuthentication().client_token ?
                                                        "Tört fiók" : "Eredeti felhasználó"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item>
                                        <IconButton
                                            onClick={() => {
                                                user.logout();
                                                setUser(null);
                                                enqueueSnackbar("Sikeres kijelentkezés!", {
                                                    variant: "success", 
                                                });
                                            }}
                                        >
                                            <SettingsRounded />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                user.logout();
                                                setUser(null);
                                            }}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
            <Paper square className={classes.bottom}>
                <Container>
                    <Grid container>
                        <Hidden smDown>
                            <Grid item xs={4} md={4}>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={4}>
                            <Button
                                color={"primary"}
                                size={"large"}
                                variant={"contained"}
                                fullWidth
                                disabled={disabled}
                                className={classes.playButton}
                                onClick={start}
                            >Játék</Button>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={4} md={4}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        {!!progress && (
                                            <LinearProgress
                                                className={classes.progress}
                                                variant="determinate"
                                                value={progress}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Container>
            </Paper>
        </Fragment>
    );
};

export default HomeScreen;
