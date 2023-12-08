import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal } from "antd";
import type { ColumnsType, TableProps, TablePaginationConfig } from "antd/es/table";
import { useGetGamesQuery, useDeleteGameMutation } from "__generated__";
import Loading from "components/loading/loading";
import "./style.scss";

import client from "apollo/apollo-config";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

interface DataType {
  id: string;
  title: string;
  platforms: string[];
  averageRating: string[];
}

function Games() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { loading, data, refetch } = useGetGamesQuery({ variables: { page } });
  const [deleteGame] = useDeleteGameMutation();

  const onChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
  };

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
    [navigate, deleteGame, refetch]
  );

  const onClick = () => {
    const { cache } = client as any;
    const myGame = cache.data.data["Game:1"];

    client.cache.modify({
      // id: cache.identify(myGame),
      fields: {
        games(existingGameRefs, { readField }) {
          const list = existingGameRefs.data.filter((gameRef: any) => {
            return "q" !== readField("title", gameRef);
          });

          list.push({
            __typename: "Game",
            id: "55",
            title: "ooo",
            platform: ['rrr'],
            reviews: [],
            averageRating: 1.1
          });

          console.log("list", list);

          console.log("existingGameRefs", existingGameRefs);

          return { ...existingGameRefs, data: list };
        },
      },
    });
  };

  return (
    <div>
      <Loading loading={loading} />
      <Table
        columns={columns}
        dataSource={data?.games?.data as TableProps<DataType>["dataSource"]}
        rowKey="id"
        pagination={{
          total: data?.games?.paginationInfo.total,
          showSizeChanger: false,
        }}
        onChange={onChange}
      />
      <button onClick={onClick}>Click</button>
    </div>
  );
}

export default Games;
