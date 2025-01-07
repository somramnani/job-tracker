import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import JobBoard from "./pages/JobBoard";
import Overview from "./pages/Overview";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/job-board", element: <JobBoard /> },
    { path: "/overview", element: <Overview /> },
  ];

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
