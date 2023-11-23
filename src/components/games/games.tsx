import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "apollo/games";
import Loading from "components/loading/loading";

import "./style.scss";

interface DataType {
  id: React.Key;
  title: string;
  platform: string[];
  averageRating: string[];
}

function Games() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_GAMES);

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "title",
        key: "title",
        render: (title: string, game: DataType) => {
          return (
            <Button type="link" onClick={() => navigate(`game/${game.id}`)}>
              {title}
            </Button>
          );
        },
      },
      {
        title: "Platform",
        dataIndex: "platform",
        key: "platform",
        render: (platform: string[]) => {
          return <p>{platform?.join(", ")}</p>;
        },
      },
      { title: "Rating", dataIndex: "averageRating", key: "averageRating" },
      {
        title: "",
        dataIndex: "",
        key: "x",
        render: (game: DataType) => {
          return (
            <div className="actions">
              <div className="edit" onClick={() => navigate(`/edit/${game.id}`)}>
                Edit
              </div>
              <div className="delete">Delete</div>
            </div>
          );
        },
      },
    ],
    []
  );

  return <div>{loading ? <Loading /> : <Table columns={columns} dataSource={data.games} rowKey="id" />}</div>;
}

export default Games;