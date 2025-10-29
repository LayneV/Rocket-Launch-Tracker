import { useParams } from "react-router-dom";

const LaunchDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Launch Detail Page</h1>
      <p>{id}</p>
    </div>
  );
};

export default LaunchDetail;
