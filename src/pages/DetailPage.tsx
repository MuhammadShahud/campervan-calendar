import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Page } from "../components/ui/Page";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import type { Booking, Station } from "../types";
import { apiService } from "../services/api";
import { calculateDuration } from "../utils/dateUtils";

export const DetailPage: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService.getBookingDetails(id).then((result) => {
      setBooking(result);
      if (result) {
        // Fetch station details to get the station name
        apiService.searchStations("").then((stations) => {
          const stationData = stations.find(
            (s) => s.id === result.pickupReturnStationId
          );
          setStation(stationData || null);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [id]);

  if (loading) {
    return (
      <Page>
        <div className="animate-pulse text-sm">Loading booking…</div>
      </Page>
    );
  }

  if (!booking) {
    return (
      <Page>
        <div className="text-sm">Booking not found.</div>
      </Page>
    );
  }

  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  const duration = calculateDuration(booking.startDate, booking.endDate);

  return (
    <Page>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Booking #{booking.id}</h1>
        <Button onClick={() => navigate(-1)}>← Back to calendar</Button>
      </div>
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Customer
            </div>
            <div className="text-base font-medium">{booking.customerName}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Booking ID
            </div>
            <div className="text-base font-medium">{booking.id}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Start date
            </div>
            <div className="text-base font-medium">
              {start.toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              End date
            </div>
            <div className="text-base font-medium">
              {end.toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Duration
            </div>
            <div className="text-base font-medium">
              {duration} day{duration !== 1 ? "s" : ""}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">
              Pickup & Return Station
            </div>
            <div className="text-base font-medium">
              {station
                ? station.name
                : `Station ID: ${booking.pickupReturnStationId}`}
            </div>
          </div>
        </div>
      </Card>
    </Page>
  );
};
