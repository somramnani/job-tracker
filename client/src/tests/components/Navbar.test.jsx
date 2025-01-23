import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../../components/Navbar/Navbar";
import { MemoryRouter } from "react-router";

jest.mock("../../providers/AuthProvider", () => ({
  useAuth: jest.fn(() => ({
    user: null,
    handleLogout: jest.fn(),
  })),
}));

describe("Navbar", () => {
  it("renders the Navbar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
});
