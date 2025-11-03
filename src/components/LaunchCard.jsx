import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import rocketIcon from "../assets/rocket-ship-svgrepo-com.svg";

const LaunchCard = ({ launch }) => {
  return (
    <Link to={`/launch/${launch.id}`}>
      <Card
        className="shadow-lg h-full max-w-lg transition-all duration-300 
                   hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
      >
        <img
          src={launch?.image?.image_url || rocketIcon}
          onError={(e) => (e.currentTarget.src = rocketIcon)}
          alt="Rocket"
          className="w-full h-64 object-cover rounded-xl drop-shadow-2xl"
        />
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {launch?.name || "Unknown Launch"}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Launch Date: </span>
          {launch?.net ? new Date(launch.net).toLocaleString() : "Unknown"}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Location: </span>
          {launch?.pad?.location?.name || "Unknown"}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Company: </span>
          {launch?.launch_service_provider?.name || "Unknown"}
        </p>
      </Card>
    </Link>
  );
};

export default LaunchCard;
