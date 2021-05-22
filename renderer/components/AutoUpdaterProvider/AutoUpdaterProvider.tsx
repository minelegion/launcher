import AutoUpdater from "@renderer/lib/AutoUpdater";
import { ProgressInfo, UpdateInfo } from "electron-updater";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

export type AutoUpdaterStateType = {
    state: "error";
    error: Error;
} | {
    state: "checking-for-update";
} | {
    state: "update-not-available";
    info: UpdateInfo;
} | {
    state: "update-available";
    info: UpdateInfo;
} | {
    state: "download-progress";
    progress: ProgressInfo;
} | {
    state: "update-downloaded";
    info: UpdateInfo;
};

type AutoUpdateContextType = {
    state: AutoUpdaterStateType;
    setState: Dispatch<SetStateAction<AutoUpdaterStateType>>;
};

const AutoUpdaterContext = createContext<AutoUpdateContextType>(null);

export const useAutoUpdater = () => {
    const { state } = useContext(AutoUpdaterContext); 
    
    return {
        state
    };
};

const AutoUpdaterProvider = ({ children }: PropsWithChildren<{}>) => {
    const [state, setState] = useState<AutoUpdaterStateType>({
        state: "checking-for-update",
    });

    useEffect(() => {
        AutoUpdater.onCheckingForUpdate(() => {
            setState({
                state: "checking-for-update",
            });
        });

        AutoUpdater.onDownloadProgress((progress) => {
            setState({
                state: "download-progress",
                progress,
            });
        });

        AutoUpdater.onError((error) => {
            setState({
                state: "error",
                error,
            });
        });

        AutoUpdater.onUpdateAvailable((info) => {
            setState({
                state: "update-available",
                info,
            });
        });

        AutoUpdater.onUpdateDownloaded((info) => {
            setState({
                state: "update-downloaded",
                info,
            });
        });

        AutoUpdater.onUpdateNotAvailable((info) => {
            setState({
                state: "update-not-available",
                info,
            });
        });
    
        AutoUpdater.check();
    }, []);
    
    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <AutoUpdaterContext.Provider value={{ state, setState }}>
            {children}
        </AutoUpdaterContext.Provider>
    );
};

export default AutoUpdaterProvider;