import React from 'react'
import { useDrag } from "react-dnd"

function Draggable({ data }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "text",
        item: { id: data["id"] },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <span
            ref={drag}
            // style={{ padding: "6px", border: isDragging ? "1px solid #e1e1e1" : "0px" }}
        >
            {data.data}
        </span>
    );
}

export default Draggable;