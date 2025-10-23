import React, { useState, useEffect, useCallback } from "react";
import { Item, SortDir } from "./mockApi";
import { useDebounce } from "./useDebounce";

export default function SearchableList() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortDir>("asc");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Implement debounced search (300ms delay)
  // TODO: implement the hook in useDebounce.ts
  const debouncedQuery = useDebounce(query, 300);

  // TODO: Implement search and sort functionality
  const searchItems = useCallback(async () => {
    // TODO: Set loading state
    // TODO: Create AbortController for request cancellation
    // TODO: Call fetchItems with debouncedQuery, sort, and abort signal
    // TODO: Handle success and error states
    // TODO: Update items state with results
  }, [debouncedQuery, sort]);

  useEffect(() => {
    searchItems();
  }, [searchItems]);

  const handleSortToggle = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Searchable Hotel List</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search hotels by name or city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sort Toggle */}
      <div className="mb-4">
        <button
          onClick={handleSortToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sort: {sort === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-500">Error: {error}</div>
            <button
              onClick={searchItems}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">No hotels found</div>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.city}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
