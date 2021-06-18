import { Slider, Typography } from "@material-ui/core";
import { createContext, Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import Store from "electron-store";

export const useJava = () => {
    const { min, max } = useContext(JavaContext);
    
    return {
        min, 
        max,
    };
};

type JavaContextType = {
    min: number;
    setMin: Dispatch<SetStateAction<number>>;
    max: number;
    setMax: Dispatch<SetStateAction<number>>;
};

const JavaContext = createContext<JavaContextType>(null);

export const JavaProvider = ({ children }: PropsWithChildren<{}>) => {
    const store = new Store();

    const [min, setMin] = useState(1048576);
    const [max, setMax] = useState(2097152);
    
    useEffect(() => {
        (async () => {
            const [storedMin, storedMax] = await Promise.all([    
                store.get("java-min-ram"),
                store.get("java-max-ram"),
            ]);

            // @ts-ignore
            if(storedMin) setMin(storedMin);

            // @ts-ignore
            if(storedMax) setMax(storedMax);
        })();
    }, []);

    return (
        <JavaContext.Provider value={{ min, setMax, max, setMin }}>
            {children}
        </JavaContext.Provider>
    );
};

const JavaSection = () => {
    const store = new Store();

    const { min, setMin, max, setMax } = useContext(JavaContext);

    return (
        <Fragment>
            <Typography variant="h5" component="h2" gutterBottom>
                Java beállítások
            </Typography>
            <Slider
                step={512 * 1024}
                onChange={(e, value) => {
                    store.set("java-min-ram", value[0]);
                    store.set("java-max-ram", value[1]);

                    setMin(value[0]);
                    setMax(value[1]);
                }}
                valueLabelDisplay="auto"
                value={[min, max]}
                valueLabelFormat={(value) => `${value / 1024 / 1024} G`}
                min={1024 * 1024}
                max={Math.min(1024 * 1024 * 8)}
                marks
            />
        </Fragment>
    );
};

export default JavaSection;