import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("Missing transaction ID");

      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete transaction: ${text}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Transaction deleted.");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error: any) => {
      console.error("Delete transaction error:", error);
      toast.error("Failed to delete transaction.");
    },
  });

  return mutation;
};
