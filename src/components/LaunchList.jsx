import { useState, useEffect } from "react";

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
    <div>
      <h2>Upcoming Launches</h2>
      <ul>
        {launches.map((launch) => (
          <li key={launch.id}>{launch.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LaunchList;
