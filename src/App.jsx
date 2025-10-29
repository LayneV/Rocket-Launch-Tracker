import { Component } from "react";
import LaunchList from "./components/LaunchList";
import { Routes, Route, Link } from "react-router-dom";
import LaunchDetail from "./components/LaunchDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LaunchList />} />
      <Route path="/launch/:id" element={<LaunchDetail />} />
    </Routes>
  );
}

export default App;
