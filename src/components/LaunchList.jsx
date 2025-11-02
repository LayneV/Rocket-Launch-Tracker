import { useState, useEffect } from "react";
import LaunchCard from "./LaunchCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { Pagination } from "flowbite-react";

function LaunchList({ listType }) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLaunches, setTotalLaunches] = useState(0);

  useEffect(() => {
    const fetchLaunches = async () => {
      const cacheKey = `launches_${listType}_page_${currentPage}`;
      const cacheDuration = 5 * 60 * 60 * 1000;

      const cachedItem = localStorage.getItem(cacheKey);

      if (cachedItem) {
        const { data, total, timestamp } = JSON.parse(cachedItem);
        const isCacheValid = new Date().getTime() - timestamp < cacheDuration;

        if (isCacheValid) {
          setLaunches(data);
          setTotalLaunches(total);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      try {
        const offset = (currentPage - 1) * 12;
        const response = await fetch(
          `https://ll.thespacedevs.com/2.3.0/launches/${listType}/?limit=12&offset=${offset}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLaunches(data.results);
        setTotalLaunches(data.count);

        const newCacheItem = {
          data: data.results,
          total: data.count,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(newCacheItem));
      } catch (error) {
        console.error("Failed to fetch launches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, [listType, currentPage]);

  const totalPages = Math.ceil(totalLaunches / 12);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold dark:text-white mb-6 capitalize text-center">
        {listType} Launches
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {launches.map((launch) => (
          <div key={launch.id} className="pt-2">
            <LaunchCard launch={launch} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          showIcons={true}
        />
      </div>
    </div>
  );
}

export default LaunchList;
