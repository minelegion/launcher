import { Fragment, useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const ImageWithLoader = (props: ImageProps) => {
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();

    const onLoad = () => setLoading(false);

    return (
        <Fragment>
            <Skeleton
                width={props?.width}
                height={props?.height}
                variant={"rect"}
                animation={"wave"}
                className={`${props.className} ${!isLoading ? classes.hide : ""}`}
            />
            <img
                {...props}
                className={`${props.className} ${isLoading ? classes.hide : ""}`}
                onError={() => setLoading(true)}
                onLoad={(e) => {
                    if (props.onLoad) props.onLoad(e);
                    onLoad();
                }}
            />
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    hide: {
        display: "none",
    },
}));

export default ImageWithLoader;