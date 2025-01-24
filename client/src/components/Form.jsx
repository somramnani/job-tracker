import { useState } from "react";
import {
  TextField,
  Stack,
  Box,
  Container,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "../hooks";
import GoogleLoginAuth from "./GoogleLoginAuth";
import GoogleSheetsButton from "./GoogleSheetsButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FormButton from "./FormButton";

const Form = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: new Date(),
    url: "",
    jobName: "",
    category: "",
    company: "",
    pointOfContact: "",
  });

  const [companyNotFound, setCompanyNotFound] = useState(false);
  const [jobNameNotFound, setJobNameNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const serverURL = process.env.REACT_APP_SERVER_URL;
  const scrapeAPIUrl = `${serverURL}/scrape`;

  const getScrapedData = (url) => {
    setLoading(true);

    axios
      .get(`${scrapeAPIUrl}/${url}`)
      .then((response) => {
        if (response.data) {
          setFormData((prev) => ({
            ...prev,
            jobName: response.data.jobTitle || "",
            company: response.data.companyName || "",
          }));
          determineCategory(response.data.jobTitle);
          setCompanyNotFound(!response.data.companyName);
          setJobNameNotFound(!response.data.jobTitle);
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

  const determineCategory = (inputValue) => {
    setLoadingCategory(true);

    const categoryKeywords = {
      CS: ["software engineer", "qa", "developer", "tester"],
      IT: ["help desk"],
      Food: ["cook", "chef", "dishwasher"],
    };

    const lowerCaseInput = inputValue.toLowerCase();
    let matchedCategory = "";

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => lowerCaseInput.includes(keyword))) {
        matchedCategory = category;
        break;
      }
    }

    setFormData((prev) => ({
      ...prev,
      category: matchedCategory,
    }));

    setLoadingCategory(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "url") {
      getScrapedData(value);
    }

    if (name === "company" && value.trim() !== "") {
      setCompanyNotFound(false);
    }

    if (name === "jobName" && value.trim() !== "") {
      setJobNameNotFound(false);
      determineCategory(value);
    }
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const clearForm = () => {
    setFormData({
      date: new Date(),
      url: "",
      jobName: "",
      category: "",
      company: "",
      pointOfContact: "",
    });
    setCompanyNotFound(false);
    setJobNameNotFound(false);
  };

  const clearInput = (input) => {
    setFormData((prev) => ({
      ...prev,
      [input]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const googleSheetsIdURL = process.env.REACT_APP_GOOGLE_SHEET_ID;

    fetch(googleSheetsIdURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Date=${formData.date.toLocaleDateString("en-US")}&Link=${
        formData.url
      }&Job=${formData.jobName}&Company=${formData.company}&Category=${
        formData.category
      }&Contact=${formData.pointOfContact}`,
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        clearForm();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  const textFieldData = [
    { label: "URL Link", name: "url", value: "", required: true },
    { label: "Job Name", name: "jobName", value: "", required: true },
    { label: "Company", name: "company", value: "", required: true },
    { label: "Category", name: "category", value: "", required: true },
    {
      label: "Point of Contact (optional)",
      name: "pointOfContact",
      value: "",
      required: false,
    },
  ];

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />

            {textFieldData.map((data, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  label={data.label}
                  name={data.name}
                  value={formData[data.name]}
                  onChange={handleChange}
                  required={data.required}
                />

                {formData[data.name] && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => clearInput(data.name)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                )}

                {(data.name === "jobName" ||
                  data.name === "company" ||
                  data.name === "category") &&
                  (loading || loadingCategory) && (
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

            {user ? (
              <>
                <FormButton
                  message="Add to Job Board"
                  icon={<AddIcon />}
                  isLoadingSubmit={isLoadingSubmit}
                  color="primary"
                />
                <FormButton
                  message="Clear Form"
                  icon={<RemoveCircleOutlineIcon />}
                  onClick={() => clearInput()}
                  color="secondary"
                />
                <GoogleSheetsButton />
              </>
            ) : (
              <GoogleLoginAuth />
            )}
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
