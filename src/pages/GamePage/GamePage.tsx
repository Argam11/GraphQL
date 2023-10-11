import { useParams } from "react-router-dom";

function GamePage() {
  const { id } = useParams();
  return <div>This is game {id}</div>;
}

export default GamePage;
