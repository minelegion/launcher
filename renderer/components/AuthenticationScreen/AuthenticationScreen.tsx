import { Fragment, useState } from "react";
import Image from "next/image";
import { Button, Card, CardContent, Container, Grid, makeStyles, TextField } from "@material-ui/core";
import { Authenticator } from "minecraft-launcher-core";
import { useSnackbar } from "notistack";
import User from "../../lib/User";
import { useUser } from "../UserProvider";

const AuthenticationScreen = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const { setUser } = useUser();

    const login = async () => {
        try {
            setDisabled(true);
            const authentication = await Authenticator.getAuth(username, password);
            const user = new User({ username, authentication });
            await user.save();
            setUser(user);
            enqueueSnackbar("Sikeres bejelentkezés!", {
                variant: "success",
            });
        } catch(e) {
            console.error(e);
            enqueueSnackbar("Hibás felhasználónév/jelszó! (Mojang)", {
                variant: "error",
            });

            setDisabled(false);
        }
    };

    return (
        <Fragment>
            <Image
                src={"/images/landscape.png"}
                layout={"fill"}
                objectFit={"cover"}
                className={classes.background}
            />
            <Grid container alignItems="center" className={classes.container}>
                <Grid item xs={12}>
                    <Container maxWidth={"sm"}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} className={classes.logo}>
                                        <Image
                                            src={"/images/logo.png"}
                                            width={513}
                                            height={129}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant={"filled"}
                                            label={"Felhasználónév"}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    {isEmail(username) && (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                variant={"filled"}
                                                label={"Jelszó"}
                                                type={"password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={login}
                                            fullWidth
                                            disabled={disabled || username.length === 0 || (isEmail(username) && password.length === 0)}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                        >
                                            Tovább
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                </Grid>
            </Grid>
        </Fragment>
    );
};

// https://stackoverflow.com/a/46181
const isEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const useStyles = makeStyles(() => ({
    container: {
        minHeight: "100vh",
        backdropFilter: "blur(8px)"
    },
    logo: {
        marginRight: 64,
        marginLeft: 64,
    },
    background: {
        filter: "brightness(50%)",
        zIndex: -1,
    },
}));

export default AuthenticationScreen;