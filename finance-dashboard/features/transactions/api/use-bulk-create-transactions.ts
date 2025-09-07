import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BulkCreateRequest = {
  transactions: {
    accountId: string;
    amount: number;
    categoryId: string;
    date: string;
    description?: string;
  }[];
};

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: BulkCreateRequest) => {
      const response = await fetch("/api/transactions/bulk-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create transactions: ${text}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Transaction(s) created.");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error: any) => {
      console.error("Bulk create transactions error:", error);
      toast.error("Failed to create transaction(s).");
    },
  });

  return mutation;
};
