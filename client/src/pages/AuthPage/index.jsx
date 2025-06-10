/* eslint-disable */
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { AppTheme, ColorModeSelect } from "templates/shared-theme";
import { SignIn, Content, SignUp } from "pages/AuthPage/components";
import { Box, Zoom } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useState } from "react";

const AuthPage = (props) => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
            marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
            minHeight: "100%",
          },
          (theme) => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage:
                "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
              backgroundRepeat: "no-repeat",
              ...theme.applyStyles("dark", {
                backgroundImage:
                  "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            },
          }),
        ]}
      >
        <Stack
          data-test-id="job-tracker-stack"
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
            height: "700px",
          }}
        >
          <Content />
          <Box
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
              width: "100%",
              maxWidth: 700,
              height: 500,
              position: "relative",
              transition: "height 0.3s ease",
            }}
          >
            <Zoom
              in={!showSignUp}
              unmountOnExit
              mountOnEnter
              timeout={300}
              style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            >
              <div>
                <SignIn onSignUpClick={() => setShowSignUp(true)} />
              </div>
            </Zoom>

            <Zoom
              in={showSignUp}
              unmountOnExit
              mountOnEnter
              timeout={300}
              style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            >
              <div>
                <SignUp onSignInClick={() => setShowSignUp(false)} />
              </div>
            </Zoom>
          </Box>
        </Stack>
      </Stack>
    </AppTheme>
  );
};

export default AuthPage;
