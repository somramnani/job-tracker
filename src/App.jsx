import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home, JobBoard, Overview } from "./pages/";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/job-board", element: <JobBoard /> },
    { path: "/overview", element: <Overview /> },
  ];

  return (
    <>
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
    </>
  );
}

export default App;
