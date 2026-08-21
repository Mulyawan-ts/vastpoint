import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { onMounted, onUnmounted } from "vue";
import { toast } from "vue-sonner";

let lastToastAlertId: number | null = null;

export const useTelemetryQuery = () => {
  const queryClient = useQueryClient();
  let eventSource: EventSource | null = null;

  onMounted(() => {
    eventSource = new EventSource(
      "http://localhost:8080/api/v1/telemetry/stream",
    );

    eventSource.onmessage = (event) => {
      queryClient.invalidateQueries({ queryKey: ["telemetry-feed"] });
      queryClient.invalidateQueries({ queryKey: ["active-alerts"] });

      try {
        const payload = JSON.parse(event.data);
        if (payload.latest_alert) {
          // Hanya pemicu toast jika alert ID berbeda dari sebelumnya
          if (lastToastAlertId !== payload.latest_alert.id) {
            lastToastAlertId = payload.latest_alert.id;
            toast.error(`🚨 ALERT KRITIS: ${payload.latest_alert.sensor_id}`, {
              description: `Ketinggian air mencapai ${payload.latest_alert.water_level}m (> 4.5m)`,
              duration: 4000,
            });
          }
        }
      } catch {
        // Ignore parsing errors
      }
    };
  });

  onUnmounted(() => {
    if (eventSource) eventSource.close();
  });

  const telemetryQuery = useQuery({
    queryKey: ["telemetry-feed"],
    queryFn: async () => {
      const res = await $fetch<{ data: any[] }>(
        "http://localhost:8080/api/v1/telemetry",
      );
      return res.data || [];
    },
  });

  return { telemetryQuery };
};
