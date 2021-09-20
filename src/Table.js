import React, { useState, useEffect } from 'react';
import DropZone from "./DropZone";

export default function Table(props) {

    const [data, setData] = useState([]);

    const [changeInfo, setChangeInfo] = useState({});

    const tableData = props.tableData;


    useEffect(() => {
        let data = [];
        for (let i = 0; i < tableData.observations; i++) {
            let t = {};
            tableData.columns.map(item => {
                if (item === "id") {
                    t[item] = i + 1;
                }
                else {
                    t[item] = "";
                }
            })
            data.push(t);
        }

        props.refreshData(data, props.index);

        setData(data);
        
    }, []);


    useEffect(() => {
        const currentPoint = props.DataPoints.find(item => item.id === changeInfo.id);

        if (data.length) {

            const t = [...data];

            t[changeInfo.observation][changeInfo.column] = currentPoint ? currentPoint.data : "";

            setData(t);

            props.refreshData(t, props.index);

        }

    }, [changeInfo]);

    const updateData = (observation, column, value) => {
        const t = [...data];

        t[observation][column] = value;

        setData(t);
    }


    const afterDrop = (id, observation, column) => {

        let cInfo = {
            id: id,
            observation: observation,
            column: column
        }

        setChangeInfo(cInfo);
    }


    const tableHeads = tableData.columns.map(item => {
        return (
            <th>{item}</th>
        )
    })

    const tableBody = [];

    for (let i = 0; i < tableData.observations; i++) {
        tableBody.push(
            <tr>
                {
                    tableData.columns.map(item => {
                        if (item === "id") {
                            return (
                                <td>
                                    {i + 1}
                                </td>
                            )
                        }
                        return (
                            <td>
                                <DropZone updateData={updateData} data={data[i] ? data[i][item] : null} observation={i} column={item} addData={afterDrop} />
                            </td>
                        )
                    })
                }
            </tr>
        )
    }

    return (
        <div style={{ padding: "25px" }}>
            {/* accoring to data we need n*n table dynamically, doing with plain html, can be done with other libraries */}
            <table>
                <tr>
                    {tableHeads}
                </tr>
                {
                    tableBody
                }
            </table>

            <button onClick={() => {
                props.addRow(props.index);
            }}>Add Row</button>

            <button onClick={() => {
                props.removeRow(props.index);
            }}>Remove Row</button>

            <button onClick={() => {
                console.log(data);
            }}>Save Data</button>
        </div>

    )
}
