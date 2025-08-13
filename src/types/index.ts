export interface Station {
  id: string;
  name: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  customerName: string;
  startDate: string;
  endDate: string;
  pickupReturnStationId: string;
  pickupStation?: string;
  returnStation?: string;
}

export interface AutocompleteProps<T> {
  label?: string;
  placeholder?: string;
  fetcher: (q: string) => Promise<T[]>;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
  initialValueLabel?: string;
}

export interface DragMode {
  type: "start" | "end";
  bookingId: string;
}
