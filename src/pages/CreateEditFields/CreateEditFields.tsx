import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Rate } from "antd";
import { useAddGameMutation, useUpdateGameMutation, useGetGameLazyQuery, GetGamesDocument } from "__generated__";
import { gql } from "@apollo/client";
import Loading from "components/loading/loading";

// const { TextArea } = Input;

const platformList = [
  { id: "1", name: "Switch" },
  { id: "2", name: "PS5" },
  { id: "3", name: "PC" },
  { id: "4", name: "Xbox" },
  { id: "5", name: "iPhone" },
  { id: "6", name: "Android" },
  { id: "7", name: "Linux" },
  { id: "8", name: "Windows" },
  { id: "9", name: "Browser" },
];
// const authorList = [
//   { id: "1", name: "Mario" },
//   { id: "2", name: "Yoshi" },
//   { id: "3", name: "Peach" },
// ];

type GameFields = {
  title: string;
  platforms: string[];
  rating: number;
  author: string;
  content: string;
};

function CreateEditFields() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [form] = Form.useForm();
  const [addGame, { loading: addGameLoading }] = useAddGameMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          games(existingGames = []) {
            const newGameRef = cache.writeFragment({
              data: data?.addGame,
              fragment: gql`
                fragment addNewGameFragment on Game {
                  id
                  title
                  platforms
                  averageRating
                  reviews
                }
              `,
            });

            return {...existingGames, data: [...existingGames.data, newGameRef]};
          },
        },
      });
    },
  });
  const [updateGame, { loading: updateGameLoading }] = useUpdateGameMutation();
  const [fetchGame, { loading: fetchGameLoading }] = useGetGameLazyQuery();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await fetchGame({ variables: { id } });
          const fieldData = [
            { name: "title", value: data?.game?.title },
            { name: "platforms", value: data?.game?.platforms },
          ];

          form.setFields(fieldData);
        } catch (error) {}
      })();
    }
  }, [id, fetchGame, form]);

  const onFinish = async (values: GameFields) => {
    try {
      const { title, platforms } = values;

      if (id) {
        await updateGame({
          variables: {
            id,
            input: {
              platforms,
              title,
            },
          },
        });
      } else {
        await addGame({
          variables: {
            input: {
              platforms,
              title,
            },
          },
        });
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Loading loading={addGameLoading || updateGameLoading || fetchGameLoading} />
      <Form form={form} labelCol={{ span: 4 }} style={{ maxWidth: 600, padding: "10px" }} onFinish={onFinish}>
        <Form.Item label="Game name" name="title" rules={[{ required: true, message: "Game name is required!" }]}>
          <Input placeholder="Game name" />
        </Form.Item>

        <Form.Item label="Platforms" name="platforms" rules={[{ required: true, message: "Platforms is required!" }]}>
          <Select placeholder="Select a platforms" mode="multiple">
            {platformList.map((p) => {
              return (
                <Select.Option value={p.name} key={p.id}>
                  {p.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        {/* <div>
          <h3>Reviews</h3>
          <Form.Item label="Author" name="author" rules={[{ required: true, message: "Author is required!" }]}>
            <Select placeholder="Select an author">
              {authorList.map((a) => {
                return (
                  <Select.Option value={a.id} key={a.id}>
                    {a.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Rating" name="rating" rules={[{ required: true, message: "Rating is required!" }]}>
            <Rate />
          </Form.Item>

          <Form.Item label="Content" name="content" rules={[{ required: true, message: "Content is required!" }]}>
            <TextArea rows={4} placeholder="Review text" maxLength={6} />
          </Form.Item>
        </div> */}

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" style={{ padding: "0 30px" }} htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateEditFields;
