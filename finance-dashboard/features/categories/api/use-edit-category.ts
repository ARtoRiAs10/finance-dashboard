import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: { name: string }) => {
      if (!id) throw new Error("Category ID is required.");

      const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to edit category: ${text}`);
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Category updated.");
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to edit category.");
    },
  });

  return mutation;
};
