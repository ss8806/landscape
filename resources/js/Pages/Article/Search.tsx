import React, { useState } from "react";

type Props = {};

export default function Search(): any {
    let [val, setVal] = useState("");

    const handleChange = (e: any) => {
        e.preventDefault();
        setVal(e.target.value);
        //callBackSearch(e.target.value);
    };

    return (
        <input
            type="text"
            className="searchBox__input"
            onChange={handleChange}
            value={val}
            placeholder="somothing keyword"
        />
    );
}
