import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "Apollo/games";

import './style.scss';

interface DataType {
  key: React.Key;
  id: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: 1,
    id: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: 2,
    id: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: 3,
    id: 3,
    name: "Not Expandable1",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
  },
  {
    key: 4,
    id: 4,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

function Games() {
  const navigate = useNavigate();
  // const { loading, data } = useQuery(GET_GAMES);

  // console.log("data", data);

  const columns: ColumnsType<DataType> = useMemo(() => [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: ({ id }) => {
        return (
          <div className="actions">
            <div className="edit" onClick={() => navigate(`/edit/${id}`)}>Edit</div>
            <div className="delete">Delete</div>
          </div>
        );
      },
    },
  ], []);

  return (
    <div>
      {/* {loading ? (
      <p>Loading...</p>
    ) : (
      data.games.map((game: any) => {
        return (
          <div style={{ border: 'solid', marginBottom: '10px' }}>
            <p>{game.title}</p>
            <ol>Platform:
              {game.platform.map((p: any) => <li>{p}</li>)}
            </ol>
          </div>
        )
      })
    )} */}

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Games;
