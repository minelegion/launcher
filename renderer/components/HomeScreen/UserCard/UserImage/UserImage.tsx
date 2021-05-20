import { makeStyles } from "@material-ui/core";
import User from "@lib/User";
import ImageWithLoader from "@components/ImageWithLoader";

type PropsType = {
    user: User;
};

const UserImage = ({ user }: PropsType) => {
    const classes = useStyles();

    return (
        <ImageWithLoader
            width={64}
            height={64}
            src={user.getAvatarSrc()}
            className={classes.icon}
        />
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        width: 64,
        height: 64,
        boxShadow: theme.shadows[2],
        borderRadius: theme.shape.borderRadius,
    },
}));

export default UserImage;