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
    const store = new Store({
        name: "java-settings-storage",
        defaults: {
            "java-min-ram": 4194304,
            "java-max-ram": 6291456,
        },
    });

    const [min, setMin] = useState(4194304);
    const [max, setMax] = useState(6291456);

    useEffect(() => {
        store.set("java-min-ram", min);
    }, [min]);

    useEffect(() => {
        store.set("java-max-ram", max);
    }, [max]);

    useEffect(() => {
        (async () => {
            const [storedMin, storedMax] = await Promise.all([    
                store.get("java-min-ram"),
                store.get("java-max-ram"),
            ]);

            if(storedMin) setMin(storedMin);
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
    const { min, setMin, max, setMax } = useContext(JavaContext);

    return (
        <Fragment>
            <Typography variant="h5" component="h2" gutterBottom>
                Java beállítások
            </Typography>
            <Slider
                step={512 * 1024}
                onChange={(e, value) => {
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