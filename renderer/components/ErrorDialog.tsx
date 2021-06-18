import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@material-ui/core";

export type ErrorDialogProps = DialogProps & {
    content: string;
};

const ErrorDialog = (props: ErrorDialogProps) => {
    return (
        <Dialog {...props}>
            <DialogTitle>
                Hiba történt az indítás során
            </DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => props.onClose({}, "escapeKeyDown")}
                >
                    Bezárás
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;