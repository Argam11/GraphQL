import { Spin } from "antd";
import "./style.scss";

const Loading = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
};

export default Loading;
