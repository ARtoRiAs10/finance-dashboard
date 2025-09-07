import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: { ids: string[] }) => {
      if (!json.ids?.length) throw new Error("No category IDs provided.");

      const res = await fetch(`/api/categories/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete categories: ${text}`);
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Categories deleted.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete categories.");
    },
  });

  return mutation;
};
