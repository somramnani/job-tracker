import "App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Navbar, TitleWrapper } from "components";
import { Home, JobBoard, Overview, Networking } from "pages";

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
    {
      path: "/networking",
      element: <Networking />,
      title: "Networking | Job Tracker",
    },
  ];

  return (
    <div data-testid="app">
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
    </div>
  );
}

export default App;
