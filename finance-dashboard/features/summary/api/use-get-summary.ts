import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertAmountFromMilliunits, calculatePercentageChange } from "@/lib/utils";

// Define the TypeScript type for summary data
export type SummaryData = {
  remainingAmount: number;
  remainingChange?: number; // optional
  incomeAmount: number;
  incomeChange?: number; // optional
  expensesAmount: number;
  expensesChange?: number; // optional
  categories: { name: string; value: number }[];
  days: { date: string; income: number; expenses: number }[];
};

export const useGetSummary = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const accountId = searchParams.get("accountId") || "";

  const query = useQuery<SummaryData>({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: { from, to, accountId },
      });

      if (!response.ok) throw new Error("Failed to fetch summary.");

      const { data } = await response.json();

      // Convert amounts from milliunits
      const incomeAmount = convertAmountFromMilliunits(data.incomeAmount);
      const expensesAmount = convertAmountFromMilliunits(data.expensesAmount);
      const remainingAmount = convertAmountFromMilliunits(data.remainingAmount);

      // Optional: compute percentage changes if previous values exist
      // Since your backend doesn’t provide previousXAmount, we set undefined
      const incomeChange = undefined;
      const expensesChange = undefined;
      const remainingChange = undefined;

      return {
        remainingAmount,
        remainingChange,
        incomeAmount,
        incomeChange,
        expensesAmount,
        expensesChange,
        categories: data.categories.map((category: any) => ({
          ...category,
          value: convertAmountFromMilliunits(category.value),
        })),
        days: data.days.map((day: any) => ({
          ...day,
          income: convertAmountFromMilliunits(day.income),
          expenses: convertAmountFromMilliunits(day.expenses),
        })),
      };
    },
  });

  return query;
};
