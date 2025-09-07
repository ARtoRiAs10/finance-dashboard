import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: {
      accountId: string;
      amount: number;
      categoryId: string;
      date: string;
      note?: string;
    }) => {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create transaction: ${text}`);
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      toast.success("Transaction created.");

      // Invalidate all transactions queries
      queryClient.invalidateQueries({queryKey : ["transactions"]});

      // Invalidate all summary queries
      // This ensures the overview updates even if `accountId` or dates change
      queryClient.invalidateQueries({queryKey :["summary"]});

      // Optionally, invalidate categories if summary depends on them
      queryClient.invalidateQueries({queryKey :["categories"]});
    },
    onError: (error: any) => {
      console.error("Create transaction error:", error);
      toast.error("Failed to create transaction.");
    },
  });

  return mutation;
};
