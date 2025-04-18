import "./styles.css";
import Button from "@mui/material/Button";
import { ContentCopy } from "@mui/icons-material";
import { useHandleCopy } from "hooks";

const JobDescriptions = () => {
  const handleCopy = useHandleCopy();
  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/som-ramnani-b1990b14b",
    },
    {
      name: "Personal Website",
      url: "http://somramnani.com",
    },
    {
      name: "GitHub",
      url: "https://github.com/somramnani",
    },
  ];

  const jobDescriptions = [
    {
      companyName: "Formation",
      role: "Software Engineer Fellow",
      date: "May 2022",
      description: `
      * Selected for a highly competitive Fellowship for personalized coaching from top-tier software engineers\n
      * Studied front-end engineering fundamentals in small groups led by senior engineers from top companies, comparing and contrasting concepts in modern web-based applications\n
      * Completed intensive training to master computer science fundamentals through coding exercises with React/HTML/CSS through independent study, pair programming, and small mentor-led groups`,
    },

    {
      companyName: "Trendsetter Media & Marketing",
      role: "Junior Software Engineer",
      date: "May - November 2021",
      description: `
        * Selected for a highly competitive Fellowship for personalized coaching from top-tier software engineers   
  
        * Studied front-end engineering fundamentals in small groups led by senior engineers from top companies, comparing and contrasting concepts in modern web-based applications   
  
        * Completed intensive training to master computer science fundamentals through coding exercises with React/HTML/CSS through independent study, pair programming, and small mentor-led groups
      `,
    },
  ];

  return (
    <div className="job-container">
      <h2 className="job-title">Job Descriptions</h2>

      <div id="job-descriptions">
        <h2>Socials</h2>
        {socials.map((social, index) => {
          return (
            <div key={index}>
              <strong>{social.name}</strong> : {social.url}
              <Button onClick={() => handleCopy(social.url)} variant="text">
                <ContentCopy />
              </Button>
            </div>
          );
        })}
      </div>

      <div>
        <h2>Job Descriptions</h2>
        {jobDescriptions.map((job, index) => (
          <div
            key={index}
            style={{ marginBottom: "20px" }}
            className="job-item"
          >
            {/* Loop through the job properties dynamically */}
            {Object.entries(job).map(([key, value]) => {
              if (key === "description") return null;
              return (
                <div
                  key={key}
                  style={{
                    display: "block", // Make sure each key-value pair appears on a new line
                    marginBottom: "10px", // Add space between each pair
                  }}
                >
                  <strong style={{ marginRight: "5px" }}>
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                  </strong>
                  <span>{value}</span>
                  <Button
                    onClick={() => handleCopy(value)}
                    variant="text"
                    style={{ marginLeft: "5px" }}
                  >
                    <ContentCopy />
                  </Button>
                </div>
              );
            })}
            <div className="job-detail">
              <strong>Description:</strong>
              <pre
                style={{
                  whiteSpace: "pre-wrap", // Allows wrapping and preserves line breaks
                  margin: "0", // Remove extra margin or indentation
                  padding: "0", // Ensure no extra padding is added
                }}
              >
                {job.description}
              </pre>
              <Button
                onClick={() => handleCopy(job.description)}
                variant="outlined"
              >
                <ContentCopy />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDescriptions;
