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
