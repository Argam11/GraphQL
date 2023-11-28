import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useGetGamesQuery } from "__generated__";
import Loading from "components/loading/loading";
import "./style.scss";

interface DataType {
  id: React.Key;
  title: string;
  platforms: string[];
  averageRating: string[];
}

function Games() {
  const navigate = useNavigate();
  const { loading, data } = useGetGamesQuery();

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
        title: "Platforms",
        dataIndex: "platforms",
        key: "platforms",
        render: (platforms: string[]) => {
          return <p>{platforms?.join(", ")}</p>;
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
    [navigate]
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Table columns={columns} dataSource={data?.games as TableProps<DataType>["dataSource"]} rowKey="id" />
      )}
    </div>
  );
}

export default Games;

