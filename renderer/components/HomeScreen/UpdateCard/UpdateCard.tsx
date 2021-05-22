import { Card, CardContent, Grid, IconButton, LinearProgress, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { useAutoUpdater, AutoUpdaterStateType } from "@renderer/components/AutoUpdaterProvider";
import { CachedRounded as CheckingForUpdateIcon, CheckRounded as DownloadFinishedIcon, ErrorRounded as ErrorIcon, GetAppRounded as DownloadIcon, InfoRounded, SystemUpdateOutlined as InstallIcon, UpdateRounded as UpdateIcon } from "@material-ui/icons";
import AutoUpdater from "@renderer/lib/AutoUpdater";

const UpdateCard = () => {
    const { state } = useAutoUpdater();
    const classes = useStyles();

    return (
        <Card>
            <CardContent className={classes.fix}>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item>
                        <Icon data={state} />
                    </Grid>
                    <Grid item className={classes.middle}>
                        <Typography noWrap>
                            {Title({ data: state })}
                        </Typography>
                        <Typography noWrap variant={"body2"}>
                            {Description({ data: state })}
                        </Typography>
                    </Grid>
                    {state.state === "update-downloaded" && (
                        <Grid item>
                            <Tooltip title={"Telepítés és újraindítás"}>
                                <IconButton
                                    onClick={() => AutoUpdater.install()}
                                >
                                    <InstallIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
            {state.state == "download-progress" && (
                <LinearProgress
                    value={state.progress.percent}     
                />
            )}
        </Card>
    );
};

const Title = ({ data }: { data: AutoUpdaterStateType }) => {
    const { state } = data;
    
    if(state === "error") return "Hiba lépett fel!";
    if(state === "checking-for-update") return "Frissítések keresése...";
    if(state === "download-progress") return "Letöltés folyamatban...";
    if(state === "update-available") return "Frissítés elérhető!";
    if(state === "update-downloaded") return "Frissítés sikeresen letöltve!";
    if(state === "update-not-available") return "Legfrissebb verzió!";

    return "";
};

const Description = ({ data }: { data: AutoUpdaterStateType }) => {
    if(data.state === "error") return data.error.name;
    if(data.state === "checking-for-update") return "Kérlek várj türelemmel!";
    if(data.state === "download-progress") return `${data.progress.total / 1024} KB / ${data.progress.total} KB (${data.progress.bytesPerSecond / 1024 / 1024} MB/s)`;
    if(data.state === "update-available") return `Legfrissebb verzió: ${data.info.version}`;
    if(data.state === "update-downloaded") return "A frissítés készen áll a telepítésre!";
    if(data.state === "update-not-available") return `Verzió: ${data.info.version}`;

    return "";
};

const Icon = ({ data }: { data: AutoUpdaterStateType }) => {
    const { state } = data;

    if(state === "error") return <ErrorIcon />;
    if(state === "checking-for-update") return <CheckingForUpdateIcon />;
    if(state === "download-progress") return <DownloadIcon />;
    if(state === "update-downloaded") return <DownloadFinishedIcon />;
    if(state === "update-available") return <UpdateIcon />;

    return <InfoRounded />;
};

const useStyles = makeStyles((theme) => ({
    fix: {
        paddingBottom: "16px !important",
    },
    icon: {
        width: 64,
        height: 64,
    },
    middle: {
        width: "calc(100% - 104px)",
    },
}));

export default UpdateCard;