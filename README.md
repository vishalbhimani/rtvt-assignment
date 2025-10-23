# React 18 + TypeScript + Vite + Tailwind (npm)

A ready-to-clone template so candidates can start coding immediately—no setup time.

## Quick Start

```bash
npm install
npm run dev
```

## Included

- React 18 + TypeScript + Vite
- Tailwind CSS (already wired)

---

## 30-Min Assignment (In-Repo)

**Goal:** Build a tiny searchable list with:

- 300 ms debounced search
- Cancel in-flight requests (AbortController)
- Sort toggle (A→Z / Z→A) by `name`
- Loading / Error / Empty states
- (Bonus) URL state sync (`?q=&sort=`)

**Where to implement:** Starter code is already provided in `src/assignment/`. Complete the TODO items in `SearchableList.tsx` to finish the assignment.

### Starter Code Provided

The following files are already set up for you:

- `src/assignment/SearchableList.tsx` - Main component with UI structure and TODO comments
- `src/assignment/mockApi.ts` - Mock API with the data and fetch function
- `src/assignment/useDebounce.ts` - Custom hook for debouncing input
- `src/assignment/index.ts` - Export file for easy imports

**Your task:** Complete the TODO items in `SearchableList.tsx` to implement the search functionality.

### Mock API (already included in starter code)

```ts
export type Item = { id: string; name: string; city: string };
const DATA: Item[] = [
  { id: "1", name: "Atlas Hotel", city: "Mumbai" },
  { id: "2", name: "Blue Orchid", city: "Bengaluru" },
  { id: "3", name: "Coral Residency", city: "Delhi" },
  { id: "4", name: "Daffodil Suites", city: "Pune" },
  { id: "5", name: "Emerald Inn", city: "Hyderabad" },
  { id: "6", name: "Fern Habitat", city: "Chennai" },
];

export type SortDir = "asc" | "desc";
export function fetchItems(q: string, sort: SortDir, signal?: AbortSignal) {
  return new Promise<Item[]>((resolve, reject) => {
    const delay = 500;
    const timer = setTimeout(() => {
      if (Math.random() < 0.1) return reject(new Error("Random API error"));
      const norm = q.trim().toLowerCase();
      let list = DATA.filter(
        (d) =>
          d.name.toLowerCase().includes(norm) ||
          d.city.toLowerCase().includes(norm)
      );
      list.sort((a, b) =>
        sort === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      resolve(list);
    }, delay);

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
```

### Acceptance Criteria

- Debounce input by 300 ms
- Abort previous request when query changes
- Sort toggle works and is reflected in results
- Loading / error / empty states
- (Bonus) URL state sync

### Tips

- Keep components small and typed
- Use `useEffect` cleanup for abort
- Memoize handlers that are passed down
- Keep code readable and organized
