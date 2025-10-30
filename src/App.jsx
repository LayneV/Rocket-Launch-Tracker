import LaunchList from "./components/LaunchList";
import { Routes, Route, Link } from "react-router-dom";
import LaunchDetail from "./components/LaunchDetail";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<LaunchList listType="upcoming" />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
        <Route path="/previous" element={<LaunchList listType="previous" />} />
      </Routes>
    </div>
  );
}

export default App;
