import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BulkDeleteRequest = {
  ids: string[];
};

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: BulkDeleteRequest) => {
      const response = await fetch("/api/transactions/bulk-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete transactions: ${text}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Transaction(s) deleted.");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error: any) => {
      console.error("Bulk delete transactions error:", error);
      toast.error("Failed to delete transaction(s).");
    },
  });

  return mutation;
};
