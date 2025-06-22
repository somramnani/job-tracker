// it("clears an individual input when clicking clear icon", () => {
//   render(<Form />);
//   const companyInput = screen.getByLabelText(companyInputLabel);
//   fireEvent.change(companyInput, { target: { value: "OpenAI" } });

//   const clearIcon = screen
//     .getAllByRole("button")
//     .find((btn) => btn.querySelector("svg"));
//   expect(clearIcon).toBeDefined();

//   fireEvent.click(clearIcon);
//   expect(companyInput.value).toBe("");
// });

// it("shows loading spinner when scraping", async () => {
//   // Mock axios get
//   jest.mock("axios", () => ({
//     get: jest.fn(() =>
//       Promise.resolve({
//         data: {
//           jobTitle: "QA Tester",
//           companyName: "Tech Corp",
//         },
//       })
//     ),
//   }));

//   render(<Form />);
//   const urlInput = screen.getByLabelText("URL Link");
//   fireEvent.change(urlInput, {
//     target: { value: "valid-job-url.com" },
//   });

//   await waitFor(() => {
//     expect(screen.getByLabelText("Job Name").value).toBe("QA Tester");
//     expect(screen.getByLabelText("Company").value).toBe("Tech Corp");
//   });
// });

// it("submits form and shows snackbar", async () => {
//   const showSnackbar = jest.fn();
//   mockSnackbar({ showSnackbar });

//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       text: () => Promise.resolve("Success"),
//     })
//   );

//   render(<Form />);

//   fireEvent.change(screen.getByLabelText("URL Link"), {
//     target: { value: "https://example.com" },
//   });
//   fireEvent.change(screen.getByLabelText("Job Name"), {
//     target: { value: "Engineer" },
//   });
//   fireEvent.change(screen.getByLabelText("Company"), {
//     target: { value: "OpenAI" },
//   });
//   fireEvent.change(screen.getByLabelText("Category"), {
//     target: { value: "CS" },
//   });

//   fireEvent.click(screen.getByText("Add to Job Board"));

//   await waitFor(() => {
//     expect(showSnackbar).toHaveBeenCalledWith({
//       message: "Added to Google Sheet",
//       type: "success",
//     });
//   });
// });
