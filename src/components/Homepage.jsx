import { useEffect, useState } from "react";
import LaunchCard from "./LaunchCard";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CountdownTimer from "./CountdownTimer";
import LoadingSpinner from "./LoadingSpinner";

function HomePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      const cacheKey = "homepageLaunches";
      const cacheDuration = 6 * 60 * 60 * 1000;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const {
          upcoming: cachedUpcoming,
          previous: cachedPrevious,
          timestamp,
        } = JSON.parse(cached);
        if (new Date().getTime() - timestamp < cacheDuration) {
          setUpcoming(cachedUpcoming);
          setPrevious(cachedPrevious);
          setLoading(false);
          return;
        }
      }

      try {
        const [upcomingResponse, previousResponse] = await Promise.all([
          fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=3"),
          fetch("https://ll.thespacedevs.com/2.3.0/launches/previous/?limit=3"),
        ]);

        if (
          upcomingResponse.status === 429 ||
          previousResponse.status === 429
        ) {
          console.warn("Rate limited - using cached data");
          if (cached) {
            const { upcoming: cachedUpcoming, previous: cachedPrevious } =
              JSON.parse(cached);
            setUpcoming(cachedUpcoming);
            setPrevious(cachedPrevious);
            setLoading(false);
            return;
          }
          throw new Error("Rate limited and no cached data available");
        }

        if (!upcomingResponse.ok || !previousResponse.ok) {
          throw new Error("Failed to fetch launch data");
        }

        const upcomingData = await upcomingResponse.json();
        const previousData = await previousResponse.json();

        setUpcoming(upcomingData.results);
        setPrevious(previousData.results);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            upcoming: upcomingData.results,
            previous: previousData.results,
            timestamp: new Date().getTime(),
          })
        );
      } catch (error) {
        console.error("Error fetching launches:", error);

        if (cached) {
          const { upcoming: cachedUpcoming, previous: cachedPrevious } =
            JSON.parse(cached);
          setUpcoming(cachedUpcoming);
          setPrevious(cachedPrevious);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-center dark:text-white [text-shadow:_0_0_8px_rgb(59_130_246)]">
        Welcome to Rocket Launch Tracker!
      </h1>

      {upcoming.length > 0 && (
        <div className="text-center p-4 bg-gradient-to-br dark: text-white from-slate-900 to-slate-800 rounded-lg border border-slate-700 w-fit mx-auto shadow-lg shadow-blue-500/10">
          <p className="dark:text-white text-2xl">
            <span className="font-bold">Next Launch: </span> {upcoming[0].name}
          </p>
          <div className="mt-2 flex justify-center dark:text-white">
            <CountdownTimer targetDate={upcoming[0].net} />
          </div>
        </div>
      )}

      <section className="bg-gray-50 dark:bg-slate-800 p-5 rounded-lg border dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold dark:text-white [text-shadow:_0_0_8px_rgb(59_130_246)]">
            Upcoming Launches
          </h2>
          <Link to="/upcoming">
            <Button>View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcoming.map((launch) => (
            <div key={launch.id} className="pt-2">
              <LaunchCard launch={launch} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-800 p-5 rounded-lg border dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold dark:text-white [text-shadow:_0_0_8px_rgb(59_130_246)]">
            Previous Launches
          </h2>
          <Link to="/previous">
            <Button>View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previous.map((launch) => (
            <div key={launch.id} className="pt-2">
              <LaunchCard launch={launch} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
