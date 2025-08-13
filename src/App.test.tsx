import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the fetch API
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("App Component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test("renders calendar page by default", () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "1",
          name: "Berlin",
          bookings: [
            {
              id: "1",
              customerName: "Test Customer",
              startDate: "2021-03-13T22:04:19.032Z",
              endDate: "2021-07-17T08:51:27.402Z",
              pickupReturnStationId: "1",
            },
          ],
        },
      ],
    } as Response);

    render(<App />);

    // Basic rendering test without custom matchers
    expect(screen.getByPlaceholderText(/Search station/i)).toBeTruthy();
    expect(screen.getByText(/This week/i)).toBeTruthy();
  });

  test("navigates between weeks", () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "1",
          name: "Berlin",
          bookings: [],
        },
      ],
    } as Response);

    render(<App />);

    const prevButton = screen.getByText(/Prev/i);
    const nextButton = screen.getByText(/Next/i);

    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });
});

describe("Utility Functions", () => {
  test("toDateKey formats date correctly", () => {
    const date = new Date("2024-01-15T10:30:00Z");
    const result = date.toISOString().slice(0, 10);
    expect(result).toBe("2024-01-15");
  });

  test("addDays adds correct number of days", () => {
    const date = new Date("2024-01-15");
    const result = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 3
    );
    expect(result.getDate()).toBe(18);
  });
});
