import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import type { AppProps } from 'next/app';
import UserProvider from '../components/UserProvider';
import { SnackbarProvider } from 'notistack';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>MineLegion</title>
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <CssBaseline />
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;