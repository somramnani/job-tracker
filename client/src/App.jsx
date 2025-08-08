import "App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { TitleWrapper } from "components";
import {
  Home,
  JobBoard,
  Overview,
  Networking,
  CoverLetter,
  AuthPage,
} from "pages";
import DashBoardLayout from "layouts/DashboardLayout";

const routes = [
  {
    path: "/job-board",
    element: <JobBoard />,
    title: "Job Board | Job Tracker",
  },
  {
    path: "/cover-letter",
    element: <CoverLetter />,
    title: "Cover Letter | Job Tracker",
  },
  {
    path: "/overview",
    element: <Overview />,
    title: "Overview | Job Tracker",
  },
  {
    path: "/networking",
    element: <Networking />,
    title: "Networking | Job Tracker",
  },
];

function App() {
  return (
    <div className="App" data-testid="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <TitleWrapper title="Job Tracker">
                <Home />
              </TitleWrapper>
            }
          />
          <Route
            path="/auth-page"
            element={
              <TitleWrapper title="Job Tracker | log in or sign up">
                <AuthPage />
              </TitleWrapper>
            }
          />
      
          <Route
            element={
              <>
                <SignedIn>
                  <DashBoardLayout />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/auth-page" replace />
                </SignedOut>
              </>
            }
          >
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <TitleWrapper title={route.title}>
                    {route.element}
                  </TitleWrapper>
                }
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
