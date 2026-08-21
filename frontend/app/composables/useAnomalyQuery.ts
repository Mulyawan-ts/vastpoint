import { useQuery } from "@tanstack/vue-query";

export const useAnomalyQuery = () => {
  const anomalyQuery = useQuery({
    queryKey: ["telemetry-anomalies"],
    queryFn: async () => {
      const res = await $fetch<{ data: any[]; total: number }>(
        "http://localhost:8000/api/v1/analytics/telemetry/anomalies",
      );
      return res.data || [];
    },
    refetchInterval: 5000,
  });

  return { anomalyQuery };
};
