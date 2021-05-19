import React from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useUser } from '../components/UserProvider';
import { Button, Card, CardContent, Container, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { Client, Authenticator } from 'minecraft-launcher-core';

const launcher = new Client();

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
        user: {
            width: 400,
            maxWidth: "100%",
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
            height: "calc(100vh - 64px)",
            backgroundSize: "cover",
        },
        playButton: {
            height: 48,
            marginTop: -24,
        },
        item: {
            marginTop: 12,
        }
    }),
);

function Home() {
    const classes = useStyles({});

    const { user } = useUser();

    const start = () => {
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
    };

    return (
        <React.Fragment>
            <Head>
                <title>Home - Nextron (with-typescript-material-ui)</title>
            </Head>
            <div className={classes.main}>
                <div className={classes.container}>
                    <Container>
                        <Card className={classes.user}>
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
                                    <Grid item>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography noWrap>
                                                    <b>
                                                        {user.getUsername()}
                                                    </b>
                                                </Typography>
                                                <Typography noWrap variant={"body2"}>
                                                    {console.log(user.getAuthentication())}
                                                    {user.getAuthentication().access_token == user.getAuthentication().client_token ?
                                                        "Tört fiók" : "Eredeti felhasználó"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </div>
            <Container>
                <Grid container>
                    <Hidden smDown>
                        <Grid item xs={4} md={5}>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={2}>
                        <Button
                            color={"primary"}
                            size={"large"}
                            variant={"contained"}
                            fullWidth
                            className={classes.playButton}
                            onClick={start}
                        >
                            Játék
                            </Button>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Home;
