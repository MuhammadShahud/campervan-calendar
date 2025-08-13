import { useEffect, useRef, useState } from "react";
import type { AutocompleteProps } from "../types";
import { useDebounce } from "../hooks/useDebounce";

export function Autocomplete<T>({
  label,
  placeholder,
  fetcher,
  getKey,
  getLabel,
  onSelect,
  initialValueLabel,
}: AutocompleteProps<T>) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    let cancelled = false;

    if (debouncedQuery.trim() || !query) {
      setLoading(true);
      fetcher(debouncedQuery)
        .then((results) => {
          if (!cancelled) {
            setItems(results);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setLoading(false);
          }
        });
    }

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, fetcher, query]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleSelect = (item: T) => {
    setOpen(false);
    setQuery("");
    onSelect(item);
  };

  return (
    <div className="w-full" ref={boxRef}>
      <div className="relative">
        <input
          ref={inputRef}
          id="autocomplete-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder ?? "Search..."}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {!query && initialValueLabel && (
          <div className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 pointer-events-none">
            {initialValueLabel}
          </div>
        )}
        {loading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
          </div>
        )}
        {open && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-64 overflow-auto">
            {items.length === 0 && !loading && (
              <div className="p-3 text-sm text-gray-500">No results</div>
            )}
            {items.map((item) => (
              <button
                key={getKey(item)}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:bg-indigo-50 focus:outline-none"
              >
                {getLabel(item)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
