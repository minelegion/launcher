import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00AA00",
            contrastText: "#FFFFFF",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        action: {
            disabledBackground: "rgb(225, 225, 225)",
        },
    },
});
