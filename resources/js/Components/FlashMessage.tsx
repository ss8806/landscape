import React from "react";

interface Props {
    flash_message: any;
}

export default function FlashMessage({ flash_message }: Props) {
    return (
        <>
            {Object.keys(flash_message).length > 0 && (
                <div className="mb-4">
                    <div className="font-medium text-red-600">エラー</div>

                    <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                        {Object.keys(flash_message).map(function (key, index) {
                            return <li key={index}>{flash_message[key]}</li>;
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
