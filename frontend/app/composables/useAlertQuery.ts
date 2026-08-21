import { useQuery } from "@tanstack/vue-query";

export const useAlertQuery = () => {
  const alertsQuery = useQuery({
    queryKey: ["active-alerts"],
    queryFn: async () => {
      const res = await $fetch<{ alerts: any[] }>(
        "http://localhost:8080/api/v1/alerts",
      );
      return res.alerts || [];
    },
  });

  const alertHistoryQuery = useQuery({
    queryKey: ["alert-history"],
    queryFn: async () => {
      const res = await $fetch<{ logs: any[] }>(
        "http://localhost:8080/api/v1/alerts/history",
      );
      return res.logs || [];
    },
    refetchInterval: 5000,
  });

  return { alertsQuery, alertHistoryQuery };
};
