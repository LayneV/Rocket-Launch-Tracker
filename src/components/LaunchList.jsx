import { useState, useEffect } from "react";
import LaunchCard from "./LaunchCard.jsx";
import { Card } from "flowbite-react";

function LaunchList() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    const fetchLaunches = async () => {
      const response = await fetch(
        "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/"
      );
      const data = await response.json();
      console.log(data);
      setLaunches(data.results);
    };
    fetchLaunches();
  }, []);
  return (
    <div className="">
      <h2>Upcoming Launches</h2>
      <div className="">
        {launches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  );
}

export default LaunchList;
