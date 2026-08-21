<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  anomalies: Array<{
    id: number;
    sensor_id: string;
    water_level: number;
    expected_avg: number;
    z_score: number;
    timestamp: string;
  }>;
}>();

const safeAnomalies = computed(() => props.anomalies || []);

const formatDate = (isoStr: string) => {
  if (!isoStr) return "-";
  try {
    return new Date(isoStr).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return isoStr;
  }
};
</script>

<template>
  <section class="card-panel">
    <div class="flex items-center justify-between mb-4">
      <h2
        class="m-0 text-lg text-amber-600 dark:text-amber-400 flex items-center gap-2 font-bold"
      >
        <div class="i-lucide-activity text-xl" />
        DuckDB Anomaly & Outlier Detection (Z-Score &ge; 2.0)
      </h2>
      <span
        class="text-xs bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-full font-bold"
      >
        {{ safeAnomalies.length }} Detected
      </span>
    </div>

    <div v-if="safeAnomalies.length === 0" class="text-sub italic py-4">
      No abnormal sensor spikes detected.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700 text-sub">
            <th class="p-2.5">TIME</th>
            <th class="p-2.5">SENSOR</th>
            <th class="p-2.5">DETECTED VALUE</th>
            <th class="p-2.5">EXPECTED AVG</th>
            <th class="p-2.5">Z-SCORE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in safeAnomalies.slice(0, 5)"
            :key="item.id"
            class="border-b border-slate-100 dark:border-slate-800/60"
          >
            <td class="p-2.5 font-mono text-slate-500">
              {{ formatDate(item.timestamp) }}
            </td>
            <td class="p-2.5 font-bold text-slate-800 dark:text-slate-200">
              {{ item.sensor_id }}
            </td>
            <td class="p-2.5 font-bold text-amber-600 dark:text-amber-400">
              {{ item.water_level }}m
            </td>
            <td class="p-2.5 text-slate-500">{{ item.expected_avg }}m</td>
            <td class="p-2.5">
              <span
                class="bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold"
              >
                {{ item.z_score }} &sigma;
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
