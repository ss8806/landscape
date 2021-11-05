import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {
    success: any;
};

export default function SuccessMessage({ success }: Props) {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log(success);
        // setTimeout(() => {
        //     handleClose();
        // }, 3000);
    }, [success]);
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success">{success}</Alert>
            </Snackbar>
        </>
    );
}
