import React, { SyntheticEvent, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {
    success: boolean;
    handleCloseSuccess: any;
    error: boolean;
    handleCloseError: any;
    message: string;
};

export default function Axiosbar({
    success,
    handleCloseSuccess,
    error,
    handleCloseError,
    message,
}: Props) {
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <section className="text-center">
            {success && (
                <Snackbar
                    open={success}
                    autoHideDuration={3000}
                    onClose={handleCloseSuccess}
                >
                    <Alert severity="success">{message}を登録しました。</Alert>
                </Snackbar>
            )}
            {error && (
                <Snackbar
                    open={error}
                    autoHideDuration={3000}
                    onClose={handleCloseError}
                >
                    <Alert severity="error">
                        {message}の登録に失敗しました。
                    </Alert>
                </Snackbar>
            )}
        </section>
    );
}
