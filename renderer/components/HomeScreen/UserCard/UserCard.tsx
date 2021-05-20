import { Card, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import { useUser } from "@components/UserProvider";
import UserImage from "./UserImage/UserImage";
import SettingsButton from "./SettingsButton";

const UserCard = () => {
    const classes = useStyles();
    const { user } = useUser();

    return (
        <Card>
            <CardContent className={classes.content}>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item>
                        <UserImage user={user} />
                    </Grid>
                    <Grid item className={classes.username}>
                        <Typography noWrap>
                            <b>
                                {user.getUsername()}
                            </b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SettingsButton />
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    content: {
        paddingBottom: "16px !important",
    },
    username: {
        width: "calc(100% - 144px)",
    },
}));

export default UserCard;