import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#AA0000",
            contrastText: "#FFFFFF",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});
