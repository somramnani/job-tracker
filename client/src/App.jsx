import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, TitleWrapper } from "./components/";
import { Home, JobBoard, Overview } from "./pages/";

function App() {
  const routes = [
    { path: "/", element: <Home />, title: "Job Tracker" },
    {
      path: "/job-board",
      element: <JobBoard />,
      title: "Job Board | Job Tracker",
    },
    {
      path: "/overview",
      element: <Overview />,
      title: "Overview | Job Tracker",
    },
  ];

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <TitleWrapper title={route.title}>
                      {route.element}
                    </TitleWrapper>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
