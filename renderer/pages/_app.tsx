import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import type { AppProps } from 'next/app';
import UserProvider from '../components/UserProvider';
import { SnackbarProvider } from 'notistack';
import AutoUpdaterProvider from '@renderer/components/AutoUpdaterProvider';
import AutoUpdater from '@renderer/lib/AutoUpdater';
import { JavaProvider } from '@renderer/components/HomeScreen/UserCard/SettingsDialog/JavaSection/JavaSection';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const onLoad = async () => {
        AutoUpdater.on((...args) => {
            console.log(args);
        });

        console.log(await AutoUpdater.check());
    };

    useEffect(() => { onLoad() }, []);
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
                        <AutoUpdaterProvider>
                            <JavaProvider>
                                <Component {...pageProps} />
                            </JavaProvider>
                        </AutoUpdaterProvider>
                    </UserProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;