import { useState } from "react";
import { TextField, Button, Stack, Box, Container } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "../providers/AuthProvider";
import GoogleLoginAuth from "./GoogleLoginAuth";
import GoogleSheetsButton from "./GoogleSheetsButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

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
  const [jobNameNotFound, setjobNameNotFound] = useState(false);

  const getScrapedData = async (url) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/scrape/${encodeURIComponent(url)}`
      );
      if (response.data) {
        setFormData((prev) => ({
          ...prev,
          jobName: response.data.jobTitle || "",
          company: response.data.companyName || "",
        }));

        setCompanyNotFound(!response.data.companyName);
        setjobNameNotFound(!response.data.jobTitle);
      }
    } catch (error) {
      console.error("Failed to fetch:", error.message);
      setCompanyNotFound(true);
      setjobNameNotFound(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

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
      setjobNameNotFound(false);
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
    setjobNameNotFound(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      .catch((error) => console.log(error));
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
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  type="submit"
                  fullWidth
                >
                  Add to Job Board
                </Button>

                <Button
                  variant="contained"
                  onClick={clearForm}
                  style={{
                    backgroundColor: "red",
                  }}
                  startIcon={<RemoveCircleOutlineIcon />}
                  type="submit"
                  fullWidth
                >
                  Reset Form
                </Button>
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
