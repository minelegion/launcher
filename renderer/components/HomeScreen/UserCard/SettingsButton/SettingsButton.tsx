import { IconButton } from "@material-ui/core";
import { SettingsRounded as SettingsIcon } from "@material-ui/icons";
import { Fragment, useState } from "react";
import SettingsDialog from "../SettingsDialog";

const SettingsButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <SettingsDialog 
                open={open}
                onClose={() => setOpen(false)}
            />
            <IconButton
                onClick={() => setOpen(true)}
            >
                <SettingsIcon />
            </IconButton>
        </Fragment>
    );  
};

export default SettingsButton;