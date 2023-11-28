import { Spin } from "antd";
import "./style.scss";

interface ILoadingProps {
  loading?: boolean;
}

const Loading = ({ loading }: ILoadingProps) => {
  if(!loading) return null;

  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
};

export default Loading;
