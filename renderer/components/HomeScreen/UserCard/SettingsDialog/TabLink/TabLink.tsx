import { ListItem, ListItemProps, makeStyles } from "@material-ui/core";

type PropsType = ListItemProps & {
    active: boolean;
};

const TabLink = (props: PropsType) => {
    const classes = useStyles();

    return (
        <div>
            {props.active && (
                <div className={classes.active} />
            )}
            {/* @ts-ignore */}
            <ListItem {...props} button className={`${props.className} ${classes.root}`}>
                {props.children}
            </ListItem>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
    },
    active: {
        marginBottom: -48,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        height: 48,
        width: 3,
        backgroundColor: theme.palette.primary.main
    }
}));

export default TabLink;