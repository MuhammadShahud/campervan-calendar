import React from "react";
import { Link } from "react-router-dom";
import type { Booking } from "../types";

interface BookingChipProps {
  booking: Booking;
}

export const BookingChip: React.FC<BookingChipProps> = ({ booking }) => (
  <div className="group p-3 rounded-xl shadow-sm bg-gradient-to-r from-indigo-50 to-white border-l-4 border-indigo-500 mb-2">
    <div className="font-semibold truncate text-sm">{booking.customerName}</div>
    <div className="text-xs opacity-70">Booking #{booking.id}</div>
    <div className="mt-2 flex items-center justify-end">
      <Link
        to={`/booking/${booking.id}`}
        className="text-indigo-600 hover:underline text-[10px] px-2 py-1 rounded-full border border-indigo-200 hover:bg-indigo-50"
      >
        Details
      </Link>
    </div>
  </div>
);
