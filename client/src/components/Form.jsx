import React, { useState } from "react";
import { TextField, Button, Stack, Box, Container } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAuth } from "../providers/AuthProvider";
import GoogleLoginAuth from "./GoogleLoginAuth";
import GoogleSheetsButton from "./GoogleSheetsButton";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

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


  const getScrapedData = async (url) => {
    axios({
      method: "get",
      url: `http://localhost:4000/api/scrape/${encodeURIComponent(url)}`,
    })
      .then(function (response) {
        if (response) {
          setFormData((prev) => ({
            ...prev,
            jobName: response.data.jobTitle,
          }));
        } else console.error("Error from server:", response.error);
      })
      .catch(function (error) {
        console.error("Failed to fetch:", error.message);
      });
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
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
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

        setFormData({
          date: new Date(),
          url: "",
          jobName: "",
          category: "",
          company: "",
          pointOfContact: "",
        });
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
              <TextField
                key={index}
                fullWidth
                label={data.label}
                name={data.name}
                value={formData[data.name]}
                onChange={handleChange}
                required={data.required}
              />
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
