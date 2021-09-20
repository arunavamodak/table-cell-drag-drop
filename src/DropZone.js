import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import "./App.css";

export default function DropZone({ updateData, addData, data, observation, column }) {

    const [disp, setDisp] = useState(false);
    const [currentValue, setCurrentValue] = useState("");


    useEffect(() => {
        setCurrentValue(data);
    }, [data]);

    const changeCurrentValue = (e) => {
        setCurrentValue(e.target.value);
    }


    const [{ }, drop] = useDrop(() => ({
        accept: "text",
        drop: (item) => addData(item.id, observation, column),
    }));

    return (
        <div
            className="drop" ref={drop}
            onClick={() => { setDisp(true) }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    updateData(observation, column, currentValue);
                    setDisp(false);
                }
            }}
        >
            {
                disp
                    ?
                    (
                        <input value={currentValue} className="dropzone-input" onChange={(e) => {
                            changeCurrentValue(e);
                        }} />
                    ) :
                    currentValue
                        ?
                        <span>{currentValue}</span>
                        :
                        ""
            }
        </div>
    )
};