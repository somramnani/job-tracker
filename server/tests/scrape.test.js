const request = require("supertest");
const axios = require("axios");
const app = require("../server");

jest.mock("axios");

describe("GET /* scrape route", () => {
  test("returns 400 if no URL is provided", async () => {
    const res = await request(app).get("/api/scrape");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("URL is required");
  });

  test("returns 400 for invalid URL", async () => {
    const res = await request(app).get("/api/scrape/invalid-url");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid URL format");
  });

  test("scrapes a valid page successfully", async () => {
    const html = `
      <html>
        <head>
          <meta property="og:title" content="Frontend Developer" />
          <meta property="og:site_name" content="TechCorp" />
        </head>
      </html>
    `;

    axios.get.mockResolvedValue({ data: html });

    const encodedUrl = encodeURIComponent("https://example.com/job");
    const res = await request(app).get(`/api/scrape/${encodedUrl}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Scraped successfully");
    expect(res.body.jobTitle).toBe("Frontend Developer");
    expect(res.body.companyName).toBe("TechCorp");
    expect(res.body.urlToScrape).toBe("https://example.com/job");
  });

  test("handles scraping errors", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const encodedUrl = encodeURIComponent("https://example.com/fail");
    const res = await request(app).get(`/api/scrape/${encodedUrl}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Failed to scrape the URL");
  });
});
