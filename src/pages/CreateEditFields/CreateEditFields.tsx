import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Rate,
} from "antd";
import { useAddGameMutation } from "__generated__";
import { type } from "os";

const { TextArea } = Input;

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
const authorList = [
  { id: "1", name: "Mario" },
  { id: "2", name: "Yoshi" },
  { id: "3", name: "Peach" },
];

type GameFields = {
  title: string;
  platforms: string[];
  rating: number;
  author: string;
  content: string;
}

function CreateEditFields() {
  const { id } = useParams();

  const [addGame, { data, loading }] = useAddGameMutation();

  console.log("data", data);

  const [form] = Form.useForm();

  const onFinish = (values: GameFields) => {
    const { title, rating, platforms, author, content } = values;
    const platformsName = platforms.map((id: string) => platformList.find(platform => platform.id === id)?.name || '');

    addGame({
      variables: {
        input: {
          platforms: platformsName,
          title,
          reviews: {
            author_id: author,
            content,
            rating
          },
        },
      },
    });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      style={{ maxWidth: 600, padding: "10px" }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Game name"
        name="title"
        rules={[{ required: true, message: "Game name is required!" }]}
      >
        <Input placeholder="Game name" />
      </Form.Item>

      <Form.Item
        label="Platforms"
        name="platforms"
        rules={[{ required: true, message: "Platforms is required!" }]}
      >
        <Select placeholder="Select a platforms" mode="multiple">
          {platformList.map((p) => {
            return (
              <Select.Option value={p.id} key={p.id}>
                {p.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <div>
        <h3>Reviews</h3>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Author is required!" }]}
        >
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

        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Rating is required!" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Content is required!" }]}
        >
          <TextArea rows={4} placeholder="Review text" maxLength={6} />
        </Form.Item>
      </div>

      <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" style={{ padding: "0 30px" }} htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateEditFields;
