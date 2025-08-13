import { useEffect, useMemo, useState } from "react";
import { Page } from "../components/ui/Page";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Autocomplete } from "../components/Autocomplete";
import { BookingChip } from "../components/BookingChip";
import type { Station, Booking, DragMode } from "../types";
import { apiService } from "../services/api";
import {
  startOfWeek,
  addDays,
  toDateKey,
  formatWeekday,
  formatWeekdayNarrow,
  formatDate,
} from "../utils/dateUtils";

export const CalendarPage: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeek(new Date())
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dragMode, setDragMode] = useState<DragMode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStation) return;

    setLoading(true);
    setError(null);

    let disposed = false;
    apiService
      .getBookingsByStation(selectedStation.id)
      .then((results) => {
        if (!disposed) {
          setBookings(results);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!disposed) {
          setError("Failed to load bookings");
          setLoading(false);
          console.error(err);
        }
      });

    return () => {
      disposed = true;
    };
  }, [selectedStation]);

  useEffect(() => {
    setLoading(true);
    apiService
      .searchStations("")
      .then((stations) => {
        if (stations.length) setSelectedStation(stations[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load stations");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const days = useMemo(
    () => new Array(7).fill(null).map((_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const handleDropDate = (date: string) => {
    if (!dragMode) return;

    const updates =
      dragMode.type === "start" ? { startDate: date } : { endDate: date };

    // Find the current booking to preserve all its data
    const currentBooking = bookings.find((b) => b.id === dragMode.bookingId);
    if (!currentBooking) return;

    apiService
      .updateBookingDates(dragMode.bookingId, updates, currentBooking)
      .then((updated) => {
        setBookings((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
        setDragMode(null);
      });
  };

  const stationLabel = selectedStation
    ? selectedStation.name
    : "Select station";

  return (
    <Page>
      <div className="flex flex-col gap-4">
        {/* Station + Week Controls */}
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <div className="flex-1">
            <Autocomplete<Station>
              placeholder="Search station by name"
              fetcher={apiService.searchStations}
              getKey={(s) => s.id}
              getLabel={(s) => s.name}
              onSelect={(s) => setSelectedStation(s)}
              initialValueLabel={stationLabel}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setWeekStart(addDays(weekStart, -7))}>
              ◀︎ Prev
            </Button>
            <Button onClick={() => setWeekStart(startOfWeek(new Date()))}>
              This week
            </Button>
            <Button onClick={() => setWeekStart(addDays(weekStart, 7))}>
              Next ▶︎
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
            <div className="font-medium">Error</div>
            <div className="text-sm">{error}</div>
          </div>
        )}

        {/* Calendar Grid */}
        <Card>
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
              <div className="text-sm text-gray-600">Loading bookings...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 p-3 md:p-4">
              {days.map((day) => {
                const key = toDateKey(day);
                const starts = bookings.filter((b) => b.startDate === key);
                const ends = bookings.filter((b) => b.endDate === key);

                return (
                  <div key={key} className="flex flex-col">
                    <div className="text-sm font-semibold mb-2 px-1 flex justify-between">
                      <span className="hidden sm:inline">
                        {formatWeekday(day)}
                      </span>
                      <span className="sm:hidden">
                        {formatWeekdayNarrow(day)}
                      </span>
                      <span className="opacity-70">{formatDate(day)}</span>
                    </div>
                    <div
                      className={`flex-1 min-h-[120px] sm:min-h-[150px] md:min-h-[220px] rounded-xl border border-dashed p-2 overflow-auto ${
                        dragMode
                          ? "border-indigo-400 bg-indigo-50/30"
                          : "border-gray-300 bg-gray-50"
                      }`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDropDate(key);
                      }}
                    >
                      <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">
                        Pickups
                      </div>
                      {starts.length === 0 && (
                        <div className="text-xs text-gray-400">No pickups</div>
                      )}
                      {starts.map((booking) => (
                        <div
                          key={booking.id}
                          draggable
                          onDragStart={() =>
                            setDragMode({
                              type: "start",
                              bookingId: booking.id,
                            })
                          }
                        >
                          <BookingChip booking={booking} />
                        </div>
                      ))}

                      <div className="text-[10px] uppercase tracking-wide text-gray-500 mt-3 mb-1">
                        Returns
                      </div>
                      {ends.length === 0 && (
                        <div className="text-xs text-gray-400">No returns</div>
                      )}
                      {ends.map((booking) => (
                        <div
                          key={booking.id}
                          draggable
                          onDragStart={() =>
                            setDragMode({ type: "end", bookingId: booking.id })
                          }
                        >
                          <BookingChip booking={booking} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {dragMode && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg text-sm">
            Dragging {dragMode.type === "start" ? "pickup" : "return"} date…
            Drop on a day tile.
          </div>
        )}
      </div>
    </Page>
  );
};
