import { Component } from "react";
import LaunchList from "./components/LaunchList";
import { Routes, Route, Link } from "react-router-dom";
import LaunchDetail from "./components/LaunchDetail";
import Header from "./components/Header";

function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route path="/" element={<LaunchList />} />
      <Route path="/launch/:id" element={<LaunchDetail />} />
    </Routes>
    </div>
  );
}

export default App;
