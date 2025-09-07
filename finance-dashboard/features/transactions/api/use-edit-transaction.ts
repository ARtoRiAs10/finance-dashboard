import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: { amount?: number; description?: string }) => {
      if (!id) throw new Error("Missing transaction ID");

      const response = await fetch(`/api/transactions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update transaction: ${text}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Transaction updated.");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error: any) => {
      console.error("Edit transaction error:", error);
      toast.error("Failed to edit transaction.");
    },
  });

  return mutation;
};
