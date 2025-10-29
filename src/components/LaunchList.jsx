import { useState } from "react";

function LaunchList() {
  const [launches, setLaunches] = useState(["Launch 1"]);
  return (
    <div>
      <h2>Upcoming Launches</h2>
      <ul>
        {launches.map((launch, index) => (
          <li key={index}>{launch}</li>
        ))}
      </ul>
    </div>
  );
}

export default LaunchList;
