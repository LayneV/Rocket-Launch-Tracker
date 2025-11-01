import { useState, useEffect } from "react";
import LaunchCard from "./LaunchCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

function LaunchList({ listType }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listType) return;

    setLoading(true);

    const fetchLaunches = async () => {
      try {
        const response = await fetch(
          `https://lldev.thespacedevs.com/2.3.0/launches/${listType}/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLaunches(data.results);
      } catch (error) {
        console.error("Failed to fetch launches", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, [listType]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold dark:text-white mb-6 capitalize text-center">
        {listType} Launches
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {launches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  );
}

export default LaunchList;
