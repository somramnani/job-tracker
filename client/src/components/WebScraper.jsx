import axios from "axios";
import { useState } from "react";
import { TextField, Box, CircularProgress, IconButton } from "@mui/material";
import { ErrorMessage } from "../components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const WebScraper = ({ onScrapeComplete }) => {
  const [inputData, setInputData] = useState({
    url: "",
    jobName: "",
    company: "",
  });

  const [companyNotFound, setCompanyNotFound] = useState(false);
  const [jobNameNotFound, setJobNameNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const serverURL = process.env.REACT_APP_SERVER_URL;
  const scrapeAPIUrl = `${serverURL}/scrape`;

  const getScrapedData = (url) => {
    setLoading(true);
    axios
      .get(`${scrapeAPIUrl}/${url}`)
      .then((response) => {
        if (response.data) {
          const scrapedJobName = response.data.jobTitle || "";
          const scrapedCompany = response.data.companyName || "";

          console.log(response.data);

          // determineCategory(response.data.jobTitle);
          setCompanyNotFound(!scrapedCompany);
          setJobNameNotFound(!scrapedJobName);

          onScrapeComplete({
            jobName: scrapedJobName,
            company: scrapedCompany,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch:", error.message);
        setCompanyNotFound(true);
        setJobNameNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "url" && value.trim() !== "") {
      getScrapedData(value);
    }

    if (name === "company" && value.trim() !== "") {
      setCompanyNotFound(false);
    }

    if (name === "jobName" && value.trim() !== "") {
      setJobNameNotFound(false);
    }
  };

  const clearInputField = (input) => {
    setInputData((prev) => ({
      ...prev,
      [input]: "",
    }));
    if (input === "company") {
      setCompanyNotFound(false);
    }

    if (input === "jobName") {
      setJobNameNotFound(false);
    }
  };

  const webScraperTextFieldData = [
    { label: "URL Link", name: "url", value: "", required: true },
    { label: "Job Name", name: "jobName", value: "", required: true },
    { label: "Company", name: "company", value: "", required: true },
  ];

  return (
    <div data-testid="webscraper">
      {webScraperTextFieldData.map((data, index) => (
        <Box key={index} sx={{ position: "relative" }}>
          <TextField
            fullWidth
            label={data.label}
            name={data.name}
            value={inputData[data.name]}
            onChange={handleInputChange}
            required={data.required}
          />

          {inputData[data.name] && (
            <IconButton
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => clearInputField(data.name)}
            >
              <HighlightOffIcon />
            </IconButton>
          )}
          {(data.name === "jobName" || data.name === "company") && loading && (
            <Box
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <CircularProgress size={24} />
            </Box>
          )}
          <ErrorMessage
            fieldName="Company"
            isFieldNotFound={companyNotFound && data.name === "company"}
          />
          <ErrorMessage
            fieldName="Job Title"
            isFieldNotFound={jobNameNotFound && data.name === "jobName"}
          />
        </Box>
      ))}
    </div>
  );
};

export default WebScraper;
