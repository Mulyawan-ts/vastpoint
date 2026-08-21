<script setup lang="ts">
import { toRef } from "vue";
import { useDashboardStore } from "~/stores/useDashboardStore";
import {
  useTelemetryChart,
  type TelemetryItem,
} from "~/composables/useTelemetryChart";
import ChartFilterBadges from "./ChartFilterBadges.vue";

const props = defineProps<{
  telemetryData: TelemetryItem[];
}>();

const dashboardStore = useDashboardStore();
const telemetryRef = toRef(props, "telemetryData");
const selectedSensorRef = toRef(dashboardStore, "selectedSensor");

const { chartOptions } = useTelemetryChart(telemetryRef, selectedSensorRef);
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-sm font-bold text-slate-700 dark:text-slate-200">
        Real-time Telemetry Trend
      </h3>
      <ChartFilterBadges />
    </div>

    <!-- Gunakan client-only echarts jika VChart tidak di-import global -->
    <div class="h-64 w-full">
      <ClientOnly>
        <v-chart :option="chartOptions" autoresize />
      </ClientOnly>
    </div>
  </div>
</template>
