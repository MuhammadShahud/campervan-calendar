import type { Station, Booking } from "../types";

const API_BASE_URL = "https://605c94c36d85de00170da8b4.mockapi.io";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

class ApiService {
  async searchStations(query: string): Promise<Station[]> {
    await delay(200);
    try {
      const response = await fetch(`${API_BASE_URL}/stations`);
      const data: Station[] = await response.json();

      const searchTerm = query.trim().toLowerCase();
      if (!searchTerm) return data;

      return data.filter((station) =>
        station.name.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error("Failed to fetch stations:", error);
      return [];
    }
  }

  async getBookingsByStation(stationId: string): Promise<Booking[]> {
    await delay(200);
    try {
      const response = await fetch(`${API_BASE_URL}/stations`);
      const stations: Station[] = await response.json();
      const station = stations.find((s) => s.id === stationId);
      return station ? station.bookings : [];
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      return [];
    }
  }

  async getBookingDetails(bookingId: string): Promise<Booking | null> {
    await delay(150);
    try {
      const response = await fetch(`${API_BASE_URL}/stations`);
      const stations: Station[] = await response.json();

      for (const station of stations) {
        const booking = station.bookings.find((b) => b.id === bookingId);
        if (booking) return booking;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      return null;
    }
  }

  async updateBookingDates(
    bookingId: string,
    updates: Partial<Pick<Booking, "startDate" | "endDate">>,
    currentBooking: Booking
  ): Promise<Booking> {
    await delay(150);

    // Console log the imaginary API call as requested by the interviewer
    console.log(`PATCH /bookings/${bookingId}`, updates);

    // Return the updated booking with preserved data
    return {
      ...currentBooking,
      ...updates,
    };
  }
}

export const apiService = new ApiService();
