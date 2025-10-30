import { useEffect, useState } from "react";
import LaunchCard from "./LaunchCard";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

function HomePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      const [upcomingResponse, previousResponse] = await Promise.all([
        fetch(
          "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=3"
        ),
        fetch(
          "https://lldev.thespacedevs.com/2.3.0/launches/previous/?limit=3"
        ),
      ]);

      const previousData = await previousResponse.json();
      const upcomingData = await upcomingResponse.json();

      setPrevious(previousData.results);
      setUpcoming(upcomingData.results);
      setLoading(false);
    };
    fetchHomepageData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8 ">
      <h1 className="text-4xl font-bold text-center dark:text-white">
        Welcome to Rocket Launch Tracker!
      </h1>
      <section className="dark:bg-slate-800 p-5 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">
            Upcoming Launches
          </h2>
          <Link to="/upcoming">
            <Button>View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:flex md:flex-row md:overflow-x-auto md:pb-4">
          {upcoming.map((launch) => (
            <div key={launch.id} className="md:shrink-0 md:w-96 pt-2">
              <LaunchCard launch={launch} />
            </div>
          ))}
        </div>
      </section>
      <section className="dark:bg-slate-800 p-5 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold dark:text-white">
            Previous Launches
          </h2>
          <Link to="/previous">
            <Button>View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:flex md:flex-row md:overflow-x-auto md:pb-4">
          {previous.map((launch) => (
            <div key={launch.id} className="md:shrink-0 md:w-96 pt-2">
              <LaunchCard launch={launch} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
