import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Form = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    url: "",
    jobName: "",
    category: "",
    company: "",
    pointOfContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log("Form Submitted:", formData);

    const url = process.env.REACT_APP_GOOGLE_SHEET_ID;
    console.log(url);
    fetch(url, {
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Job Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
            <TextField
              fullWidth
              label="URL Link"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Job Name"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Point of Contact (optional)"
              name="pointOfContact"
              value={formData.pointOfContact}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add to Job Board
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
