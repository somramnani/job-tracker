import { useState } from "react";
import { Module, FullScreenDialog } from "components";

const CoverLetter = () => {
  const [currentData, setCurrentData] = useState({
    url: "",
    company: "{company}",
    jobName: "{job name}",
    message: "{....}",
  });
  const [currentCoverLetter, setCurrentCoverLetter] = useState(
    `Hi there, thanks for taking the time to review my application! My name is Som–I’m a Junior Front-End Developer, and I primarily code in Javascript. I am excited to be applying for the ${currentData.jobName} at ${currentData.company}. 

I have taken computer science classes at Fairleigh Dickinson University and I hold an associate degree in web development where I learned HTML, CSS & SQL. 

When I finished my associate's degree, I went to the Rutgers Coding Bootcamp to further my knowledge of Web Development. At Rutgers, I learned more about HTML/CSS, and then I learned JavaScript & React. 

After the bootcamp, I worked at Trendsetter as a software engineer intern for 7 months. Trendsetter is a digital marketing company that helps promote artists. The project I was working on was an internal dashboard application built on React, NextJS & TypeScript. I was mainly working on the Front-End to help set up the initial project so the project could be shipped out to the team.

I am currently a fellow at Formation, a highly selective program where I work with top-tier engineers from companies like Meta, Airbnb & Amazon. I have been learning best practices for front-end development specifically related to React.

I am now looking for a Developer role with a company where I can contribute my skills within a strong team where I can learn, grow and make a meaningful impact.

I look forward to working at ${currentData.company} because ${currentData.message}.
  `
  );

  return (
    <div data-testid="cover-letter">
      {" "}
      <h1>Cover Letter</h1>
      <Module
        currentData={currentData}
        setCurrentData={setCurrentData}
        coverLetter={currentCoverLetter}
        message="Make a Cover Letter"
        setCurrentCoverLetter={setCurrentCoverLetter}
        X
      />
      <FullScreenDialog />
    </div>
  );
};

export default CoverLetter;
