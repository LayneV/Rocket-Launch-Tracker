import { Card } from "flowbite-react";

const LaunchCard = ({ launch }) => {
  return (
    <Card className="max-w-lg">
      <img src={launch.image.image_url} alt={launch.name} />
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {launch.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
              Launch Date: { new Date(launch.net).toLocaleString()}
      </p>
    </Card>
  );
};
export default LaunchCard;
