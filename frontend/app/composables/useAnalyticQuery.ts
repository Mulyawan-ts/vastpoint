import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";

const selectedRange = ref<"all" | "1h" | "24h" | "7d">("all");

export const useAnalyticsQuery = () => {
  const analyticsQuery = useQuery({
    queryKey: ["analytics-summary", selectedRange],
    queryFn: async () => {
      const res = await $fetch<{ data: any[] }>(
        `http://localhost:8000/api/analytics/telemetry/summary?range=${selectedRange.value}`,
      );
      return res.data || [];
    },
    refetchInterval: 5000,
  });

  return { selectedRange, analyticsQuery };
};
