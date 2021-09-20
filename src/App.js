import React, { useState, useEffect } from 'react'
import "./App.css";
import Draggable from "./Draggable";
import 'antd/dist/antd.css';
import Table from "./Table";
import { Tabs } from 'antd';

const { TabPane } = Tabs;


const DataPoints = [
  {
    id: 1,
    data: 'val1'
  },
  {
    id: 2,
    data: 'val2'
  },
  {
    id: 3,
    data: 'val3'
  },
  {
    id: 4,
    data: 'val4'
  },
  {
    id: 5,
    data: 'val5'
  },
  {
    id: 6,
    data: 'val6'
  },
  {
    id: 7,
    data: 'val7'
  },
  {
    id: 8,
    data: 'val8'
  },
  {
    id: 9,
    data: 'val9'
  },
  // {
  //   id: 10,
  //   data: 'val10'
  // },
  // {
  //   id: 11,
  //   data: 'val11'
  // },
  // {
  //   id: 12,
  //   data: 'val12'
  // }
]


export default function App() {

  const [allData, setAllData] = useState([]);

  const [tableData, setTableData] = useState([
    {
      title: "Table 1",
      columns: ["id", "col1", "col2", "col3", "col4", "col5", "col6", "col7"],
      observations: 5
    },
    {
      title: "Table 2",
      columns: ["id", "col1", "col2", "col3", "col4", "col5"],
      observations: 5
    },
    {
      title: "Table 3",
      columns: ["id", "col1", "col2", "col3", "col4", "col5", "col6"],
      observations: 5
    }
  ]);


  useEffect(() => {
    const data = [];

    for (let i = 0; i < tableData.length; i++) {
      data.push([]);
    }

    setAllData(data);

  }, [tableData]);

  const addRow = (index) => {
    const t = [...tableData];

    t[index]["observations"] = t[index]["observations"] + 1;

    setTableData(t);

  }

  const removeRow = (index) => {
    const t = [...tableData];

    t[index]["observations"] = t[index]["observations"] - 1;

    setTableData(t);

  }

  const refreshData = (data, index) => {
    const t = [...allData];

    t[index] = data;

    setAllData(t);
  }


  console.log("All data", allData);

  return (
    <div className="main">
      <div className="data-points" style={{ width: "30%" }}>
        <table>
          <tr><th>DataPoints</th></tr>
          {
            DataPoints.map(item => {
              return (
                <tr>
                  <td>
                    <Draggable data={item} />
                  </td>
                </tr>
              )
            })
          }
        </table>
      </div>

      <div style={{ width: "65%" }}>
        <Tabs defaultActiveKey="0">
          {
            tableData.map((table, index) => {
              return (
                <TabPane tab={table.title} key={index}>
                  <Table refreshData={refreshData} DataPoints={DataPoints} tableData={table} addRow={addRow} removeRow={removeRow} index={index} />
                </TabPane>
              )
            })
          }
        </Tabs>
        <button onClick={() => {
          console.log(allData);
        }}>Generate Data</button>
      </div>
    </div>
  )
}
