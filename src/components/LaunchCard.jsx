import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const LaunchCard = ({ launch }) => {
  return (
    <Link to={`/launch/${launch.id}`}>
      <Card
        className="shadow-lg max-w-lg transition-all duration-300 
                   hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
      >
        <img
          src={launch.image.image_url}
          alt={launch.name}
          className="w-full h-48 object-cover rounded"
        />
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
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
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Company: </span>
          {launch.launch_service_provider.name}
        </p>
      </Card>
    </Link>
  );
};
export default LaunchCard;
