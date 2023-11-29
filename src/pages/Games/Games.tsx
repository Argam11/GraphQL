import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useGetGamesQuery, useDeleteGameMutation } from "__generated__";
import Loading from "components/loading/loading";
import "./style.scss";

interface DataType {
  id: string;
  title: string;
  platforms: string[];
  averageRating: string[];
}

function Games() {
  const navigate = useNavigate();
  const { loading, data, refetch } = useGetGamesQuery({ fetchPolicy: "network-only" });
  const [deleteGame] = useDeleteGameMutation();

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
      {
        title: "Rating",
        dataIndex: "averageRating",
        key: "averageRating",
        render: (averageRating: number | null) => {
          return <p>{averageRating || "_"}</p>;
        },
      },
      {
        title: "",
        dataIndex: "",
        key: "x",
        render: ({ id }: DataType) => {
          return (
            <div className="actions">
              <div className="edit" onClick={() => navigate(`/edit/${id}`)}>
                Edit
              </div>
              <div
                className="delete"
                onClick={() => {
                  Modal.confirm({
                    title: "Confirm",
                    onOk: async () => {
                      await deleteGame({ variables: { id } });
                      refetch();
                    },
                    content: "Are you sure you want to delete this game?",
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ],
    [navigate, deleteGame]
  );

  return (
    <div>
      <Loading loading={loading} />
      <Table columns={columns} dataSource={data?.games as TableProps<DataType>["dataSource"]} rowKey="id" />
    </div>
  );
}

export default Games;
