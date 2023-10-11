import { useParams } from "react-router-dom";

function CreateEditFields() {
  const { id } = useParams();

  return <p>Game: {id}</p>;
}

export default CreateEditFields;
