import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertAmountFromMilliunits } from "@/lib/utils";

export const useGetTransactions = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const accountId = searchParams.get("accountId") || "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await fetch(`/api/transactions?from=${from}&to=${to}&accountId=${accountId}`);

      if (!response.ok) throw new Error("Failed to fetch transactions.");

      const { data } = await response.json();

      return data.map((transaction:any) => ({
        ...transaction,
        amount: convertAmountFromMilliunits(transaction.amount),
      }));
    },
  });

  return query;
};