import { useParams, Link } from "react-router-dom";
import { useEffect, useState} from "react";
import { Button, Badge, Card } from "flowbite-react";

const LaunchDetail = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const getStatusColor = (statusName) => {
    const status = statusName.toLowerCase();
    if (status.includes("success") || status.includes("go")) {
      return "success";
    }
    if (status.includes("failure") || status.includes("partial failure")) {
      return "failure";
    }
    if (status.includes("in flight") || status.includes("tbc")) {
      return "indigo";
    }
    return "gray";
  };
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
      <Button as={Link} to="/">
        Go Back
      </Button>
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
              <span className="font-bold">Launch Date: </span>
              {new Date(launch.net).toLocaleString()}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Location: </span>
              {launch.pad.location.name}
            </p>
            {launch.mission.agencies.length > 0 && (
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Company: </span>
                {launch.mission.agencies[0].name}
              </p>
            )}
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Mission Description: </span>
              {launch.mission.description}
            </p>
            <div className="flex items-center gap-2">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Status:
              </p>
              <Badge color={getStatusColor(launch.status.name)}>
                {launch.status.name}
              </Badge>
            </div>
            <div></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LaunchDetail;
