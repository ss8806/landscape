import React, { SyntheticEvent, useReducer, useState } from "react";
import axios from "axios";
import { useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import Button from "@/Components/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Axiosbar from "@/Components/Axiosbar";
import { margin } from "@mui/system";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
    icon: any;
};

export default function EditIcon({ icon }: Props) {
    const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
    const [success, setSuccess] = useState<boolean>(false);

    const handleOpenSuccess = () => {
        setSuccess(true);
    };

    const handleCloseSuccess = () => {
        setSuccess(false);
    };

    let [error, setError] = useState<boolean>(false);

    const handleOpenError = () => {
        setError(true);
    };

    const handleCloseError = () => {
        setError(false);
    };

    const { processing } = useForm({});
    const handleSubmitIcon = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios
            .post("editIcon", {
                icon: icon,
            })
            .then(function (response) {
                console.log(response);
                handleOpenSuccess();
            })
            .catch(function (response) {
                console.log(response);
                handleOpenError();
            });
    };

    const imageHander = (event: any) => {
        if (event.target.files === null) {
            return;
        }
        const file = event.target.files[0];
        if (file === null) {
            return;
        }
        let imgTag = document.getElementById("preview") as HTMLImageElement;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result: string = reader.result as string;
            imgTag.src = result;
            icon = result;
            console.log(icon);
        };
    };
    return (
        <section className="text-center">
            <div>
                {(icon && (
                    <img
                        id="preview"
                        src={awspath + icon}
                        className="d-block mx-auto h-60 h-56"
                    ></img>
                )) || (
                    <img
                        id="preview"
                        src="/images/avatar-default.svg"
                        className="d-block mx-auto h-60 h-56"
                    />
                )}
            </div>
            <form onSubmit={handleSubmitIcon}>
                <input
                    name="icon"
                    type="file"
                    className="submitIcon"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={imageHander}
                />
                <div>
                    <Button processing={processing} type="submit">
                        アイコンを変更
                    </Button>
                </div>
            </form>

            <Axiosbar
                success={success}
                handleCloseSuccess={handleCloseSuccess}
                error={error}
                handleCloseError={handleCloseError}
                message={"画像"}
            />
        </section>
    );
}
