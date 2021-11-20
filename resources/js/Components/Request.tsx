import React, { useEffect } from "react";

interface Props {
    requests: any;
}

const Pager: React.FC<Props> = ({ requests }) => {
    return (
        <div>
            {requests.map((request: any, index: number) => {
                return <li key={index}></li>;
            })}
        </div>
    );
};

export default Pager;
