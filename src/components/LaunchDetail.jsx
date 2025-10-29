import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LaunchDetail = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    const fetchSpecificLaunch = async () => {
      const response = await fetch(
        `https://lldev.thespacedevs.com/2.3.0/launches/${id}/`
      );
      const data = await response.json();
      setLaunch(data);
      console.log(data);
    };
    fetchSpecificLaunch();
  }, [id]);

  if (!launch) return <p>Loading...</p>;

  return (
    <div>
      <p>{launch.name}</p>
      <p>Launch Date: {new Date(launch.net).toLocaleString()}</p>
      <p>{launch.pad.location.name}</p>
      <p>Mission Description: {launch.mission.description}</p>
      <p>{launch.mission.agencies[0].name}</p>
    </div>
  );
};

export default LaunchDetail;
