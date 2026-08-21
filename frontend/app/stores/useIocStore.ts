import { defineStore } from "pinia";

export const useIocStore = defineStore("ioc", () => {
  const liveTelemetry = ref([]);
  const analyticsSummary = ref([]);
  const activeAlerts = ref([]);
  const isLoading = ref(true);

  const fetchAllData = async () => {
    try {
      const [resTelemetry, resAnalytics, resAlerts] = await Promise.all([
        $fetch<{ data: any[] }>("http://localhost:8080/api/v1/telemetry"),
        $fetch<{ data: any[] }>(
          "http://localhost:8000/api/analytics/telemetry/summary",
        ),
        $fetch<{ alerts: any[] }>("http://localhost:8080/api/v1/alerts"),
      ]);

      liveTelemetry.value = resTelemetry.data || [];
      analyticsSummary.value = resAnalytics.data || [];
      activeAlerts.value = resAlerts.alerts || [];
    } catch (err) {
      console.error("IOC Data Fetch Error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    liveTelemetry,
    analyticsSummary,
    activeAlerts,
    isLoading,
    fetchAllData,
  };
});
