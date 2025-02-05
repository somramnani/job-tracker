import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
} from "@mui/material/";
import { Add, Close, HighlightOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { useSnackbar } from "hooks";
import BootstrapDialog from "./BootstrapDialog";
import axios from "axios";
import { ErrorMessage } from "components";

const Module = ({
  message,
  coverLetter,
  setCurrentCoverLetter,
  setCurrentData,
  currentData,
}) => {
  const { showSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const serverURL = process.env.REACT_APP_SERVER_URL;
  const scrapeAPIUrl = `${serverURL}/scrape`;

  const [companyNotFound, setCompanyNotFound] = useState(false);
  const [jobNameNotFound, setJobNameNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const setCompanyAndJobFound = (data) => {
    setCompanyNotFound(data);
    setJobNameNotFound(data);
  };

  const getScrapedData = (url) => {
    setLoading(true);

    axios
      .get(`${scrapeAPIUrl}/${url}`)
      .then((response) => {
        if (response.data) {
          setCurrentData((prev) => {
            const updatedData = {
              ...prev,
              jobName: response.data.jobTitle || "",
              company: response.data.companyName || "",
            };

            setCurrentCoverLetter(generateCoverLetter(updatedData));
            return updatedData;
          });
          setCompanyNotFound(!response.data.companyName);
          setJobNameNotFound(!response.data.jobTitle);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch:", error.message);
        setCompanyAndJobFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "url") {
      getScrapedData(value);
    }

    setCurrentData((prev) => {
      const updatedData = { ...prev, [name]: value };

      setCurrentCoverLetter(generateCoverLetter(updatedData));

      return updatedData;
    });

    if (name === "company" && value.trim() !== "") {
      setCompanyNotFound(false);
    }

    if (name === "jobName" && value.trim() !== "") {
      setJobNameNotFound(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(coverLetter)
      .then(() => {
        showSnackbar({ message: "Copied to clipboard!", type: "success" });
      })
      .catch((error) => {
        showSnackbar("Failed to copy. Please try again.", "error");
        console.error(error);
      });
  };

  const clearInput = (value) => {
    setCurrentData((prev) => ({
      ...prev,
      [value]: "",
    }));

    setCurrentData((prev) => {
      const updatedData = { ...prev, [name]: value };

      setCurrentCoverLetter(generateCoverLetter(updatedData));

      return updatedData;
    });
    setCompanyAndJobFound(false);
  };

  const clearForm = () => {
    setCurrentData({
      url: "",
      jobName: "",
      company: "",
      message: "",
    });

    setCurrentData((prev) => {
      const updatedData = { ...prev, [name]: "" };

      setCurrentCoverLetter(generateCoverLetter(updatedData));

      return updatedData;
    });
    setCompanyNotFound(false);
    setJobNameNotFound(false);
  };

  const moduleTextFieldInputs = [
    {
      label: "URL Link",
      name: "url",
      value: "",
      required: true,
      multiline: false,
    },
    {
      label: "Job Name",
      name: "jobName",
      value: "",
      required: true,
      multiline: false,
    },
    {
      label: "Company",
      name: "company",
      value: "",
      required: true,
      multiline: false,
    },
    {
      label: "Message",
      name: "message",
      value: "",
      required: true,
      multiline: true,
    },
  ];

  const generateCoverLetter = (data) => `
  Hi there, thanks for taking the time to review my application! My name is Som–I’m a Junior front-end developer, and I primarily code in Javascript. I am excited to be applying for ${data.jobName} at ${data.company}. 
  
  I have taken computer science classes at Fairleigh Dickinson University and I hold an associate degree in web development where I learned HTML, CSS & SQL. 
  
  When I finished my associate's degree, I went to the Rutgers Coding Bootcamp to further my knowledge of web development. At Rutgers, I learned more about HTML/CSS, and then I learned JavaScript & React. 
  
  After the bootcamp, I worked at Trendsetter as a software engineer intern for 7 months. Trendsetter is a digital marketing company that helps promote artists. The project I was working on was an internal dashboard application built on React, NextJS & TypeScript. I was mainly working on the front-end to help set up the initial project so the project could be shipped out to the team.
  
  I am currently a fellow at Formation, a highly selective program where I work with top-tier engineers from companies like Meta, Airbnb & Amazon. I have been learning best practices for front-end development specifically related to React.
  
  I am now looking for a Developer role with a company where I can contribute my skills within a strong team where I can learn, grow and make a meaningful impact.
  
  I look forward to working at ${data.company} because ${data.message}.`;

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });

    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ maxWidth: "900px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen()}
        startIcon={<Add />}
      >
        {message}
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ "& .MuiDialog-paper": { width: "900px", maxWidth: "100%" } }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {message}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>

        <DialogContent dividers>
          <TextField
            id="outlined-textarea"
            label={message}
            placeholder={"Placeholder"}
            value={coverLetter}
            sx={{ width: "100%", marginBottom: "16px" }}
            onChange={(event) => {
              setCurrentCoverLetter(event.target.value);
            }}
            multiline
          />
          {moduleTextFieldInputs.map((data, index) => (
            <Box key={index} sx={{ position: "relative", mb: 2 }}>
              <TextField
                fullWidth
                label={data.label}
                name={data.name}
                value={currentData[data.name]}
                onChange={handleInputChange}
                required={data.required}
                multiline={data.multiline}
              />

              {currentData[data.name] && (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => clearInput(data.name)}
                >
                  <HighlightOff />
                </IconButton>
              )}
              {(data.name === "jobName" || data.name === "company") &&
                loading && (
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCopy}>
            Copy
          </Button>
          <Button autoFocus onClick={clearForm}>
            Clear Form
          </Button>
          <Button autoFocus onClick={handleClose}>
            Save changes (Add to cover letter board)
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Module;
