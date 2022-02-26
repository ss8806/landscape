import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {
    error: any;
};

export default function ErrorMessage({ error }: Props) {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState<boolean>(true);

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <Snackbar open={open} autoHideDuration={6000}>
            <Alert severity="error">{error}</Alert>
        </Snackbar>
    );
}
