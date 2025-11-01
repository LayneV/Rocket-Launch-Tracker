import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Badge } from "flowbite-react";
import { ArrowLeftIcon } from "flowbite-react";
import LoadingSpinner from "./LoadingSpinner";
import rocketIcon from "../assets/rocket-ship-svgrepo-com.svg";

const LaunchDetail = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      try {
        const response = await fetch(
          `https://lldev.thespacedevs.com/2.3.0/launches/${id}/`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLaunch(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching launch:", error);
        setLoading(false);
      }
    };

    fetchSpecificLaunch();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 dark:text-white">
      <div className="mb-3">
        <Button className="max-w-xs" size="md" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Back to Launches
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img
            className="w-full h-auto rounded-lg shadow-xl"
            src={launch.image.image_url || rocketIcon}
            alt={`Rocket`}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <Badge size="sm" color={getStatusColor(launch.status.name)}>
              {launch.status.name || "Unknown"}
            </Badge>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight ">
            {launch?.name || "Unknown"}
          </h1>

          <div className="text-lg text-gray-400 flex flex-col gap-2">
            <p>
              <span className="font-bold text-gray-600 dark:text-gray-400">
                Launch Date:{" "}
              </span>
              {new Date(launch.net).toLocaleString() || "Unknown"}
            </p>
            <p>
              <span className="font-bold text-gray-600 dark:text-gray-400">
                Location:{" "}
              </span>
              {launch.pad.location.name || "Unknown"}
            </p>
            {launch.mission?.agencies?.length > 0 && (
              <p>
                <span className="font-bold text-gray-600 dark:text-gray-400">
                  Company:{" "}
                </span>
                {launch.mission?.agencies[0].name || "Unknown"}
              </p>
            )}
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
            {launch.mission?.description ||
              "No detailed mission description available."}
          </p>

          <div className="mt-6 border-t border-gray-700 pt-6">
            <h3 className="text-3xl font-bold mb-4">Vehicle Details</h3>

            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {launch.rocket?.configuration?.description ||
                "No vehicle description available."}
            </p>

            <div className="grid grid-cols-2 gap-y-2 text-lg text-gray-400">
              <p>
                <span className="font-bold text-gray-600 dark:text-gray-400">
                  Full Name:
                </span>
              </p>
              <p>{launch.rocket?.configuration?.full_name || "Unknown"}</p>

              <p>
                <span className="font-bold text-gray-600 dark:text-gray-400">
                  Family:
                </span>
              </p>
              <p>{launch.rocket?.configuration?.family || "Unknown"}</p>

              <p>
                <span className="font-bold">
                  <span className="text-green-500">Success</span>/
                  <span className="text-red-500">Fail:</span>
                </span>
              </p>
              <p>
                <span className="text-green-500">
                  {launch.rocket?.configuration?.successful_launches ||
                    "Unknown"}
                </span>{" "}
                /{" "}
                <span className="text-red-500">
                  {launch.rocket?.configuration?.failed_launches || "Unknown"}
                </span>
              </p>

              <p>
                <span className="font-bold text-gray-600 dark:text-gray-400">
                  Launch Cost:
                </span>
              </p>
              <p>
                {launch.rocket?.configuration?.launch_cost
                  ? `$${parseInt(launch.rocket.configuration.launch_cost).toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
