import { useState, useEffect } from "react";
import LaunchCard from "./LaunchCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

function LaunchList({ listType }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunches = async () => {
      const response = await fetch(
        `https://lldev.thespacedevs.com/2.3.0/launches/${listType}/`
      );
      const data = await response.json();
      console.log(data);
      setLaunches(data.results);
      setLoading(false);
    };
    fetchLaunches();
  }, [listType]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h2>{listType} Launches</h2>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LaunchList;
