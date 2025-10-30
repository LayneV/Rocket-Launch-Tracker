import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

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
    <div className="min-h-screen flex item-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card>
        <div className="grid gap-1 grid-cols-2 grid-rows-1">
          <div>
            <img
              className="max-w-md rounded-t-lg"
              src={launch.image.image_url}
            />
          </div>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {launch.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Launch Date: {new Date(launch.net).toLocaleString()}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Location: {launch.pad.location.name}
            </p>
            {launch.mission.agencies.length > 0 && (
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Company: {launch.mission.agencies[0].name}
              </p>
            )}
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Mission Description: {launch.mission.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LaunchDetail;
