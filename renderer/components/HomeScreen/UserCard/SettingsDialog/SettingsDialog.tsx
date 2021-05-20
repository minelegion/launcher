import { Dialog, Grid, List, ListItemIcon, ListItemText, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { PersonRounded as UserIcon, UpdateOutlined as UpdateIcon } from "@material-ui/icons";
import { useState } from "react";
import JavaIcon from "./JavaIcon";
import JavaSection from "./JavaSection";
import TabLink from "./TabLink";
import UserSection from "./UserSection";

type PropsType = {
    open: boolean;
    onClose: () => void;
};

const UpdatesSection = () => {
    return (
        <div />
    );
};

const pages = {
    user: {
        title: "Felhasználó",
        icon: <UserIcon />,
        page: <UserSection />,
    },
    java: {
        title: "Java beállítások",
        icon: <JavaIcon />,
        page: <JavaSection />,
    },
    updates: {
        title: "Frissítések",
        icon: <UpdateIcon />,
        page: <UpdatesSection />,
    },
};

type PageType = keyof typeof pages;

const SettingsDialog = ({ open, onClose }: PropsType) => {
    const classes = useStyles();
    const [page, setPage] = useState<PageType>("user");

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={"md"}
            fullWidth
            className={classes.dialog}
            style={{
                backdropFilter: "blur(8px)",
            }}
            PaperProps={{
                style: {
                    overflowX: "hidden",
                },
            }}
        >
            <Grid container>
                <Grid item xs={12} md={4}>
                    <List className={classes.list}>
                        {Object.keys(pages).map((key) => (
                            <TabLink
                                active={key === page}
                                key={`${key}-settings-button`}
                                // @ts-ignore
                                onClick={() => setPage(key)}
                            >
                                <ListItemIcon>
                                    {pages[key].icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={pages[key].title}
                                />
                            </TabLink>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={8} className={classes.root}>
                    {pages[page].page}
                </Grid>
            </Grid>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 16,
        minHeight: 300,
    },
    dialog: {
        overflowX: "hidden",
    },
    list: {
        marginRight: 16,
    }
}));

export default SettingsDialog;