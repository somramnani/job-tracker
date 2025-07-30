import { render } from "@testing-library/react";
import {
  SitemarkIcon,
  FacebookIcon,
  JobTrackerIcon,
  GoogleIcon,
} from "components/Icons/CustomIcons";

describe("Icon components", () => {
  it("renders SitemarkIcon", () => {
    render(<SitemarkIcon />);
  });

  it("renders FacebookIcon", () => {
    render(<FacebookIcon />);
  });

  it("renders JobTrackerIcon", () => {
    render(<JobTrackerIcon />);
  });

  it("renders GoogleIcon", () => {
    render(<GoogleIcon />);
  });
});
