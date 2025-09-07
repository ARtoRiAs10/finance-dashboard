import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id, // only fetch if id is provided
    queryKey: ["category", { id }],
    queryFn: async () => {
      if (!id) throw new Error("Category ID is required.");

      const res = await fetch(`/api/categories/${encodeURIComponent(id)}`);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch category: ${text}`);
      }

      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
