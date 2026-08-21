<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    logs?: Array<{
      id: number;
      sensor_id: string;
      water_level: number;
      message?: string;
      created_at: string;
    }>;
  }>(),
  {
    logs: () => [],
  },
);

// Menjamin safeLogs selalu berupa array meskipun data dari API belum siap
const safeLogs = computed(() => props.logs || []);

const formatDate = (isoStr: string) => {
  if (!isoStr) return "-";
  try {
    return new Date(isoStr).toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  } catch {
    return isoStr;
  }
};
</script>

<template>
  <section class="card-panel">
    <h2
      class="m-0 text-lg text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2 font-bold"
    >
      <div class="i-lucide-history text-xl" />
      Alert Incident Logs (SQLite)
    </h2>

    <div v-if="safeLogs.length === 0" class="text-sub italic py-4">
      No critical incidents recorded yet.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700 text-sub">
            <th class="p-2.5">TIMESTAMP</th>
            <th class="p-2.5">SENSOR</th>
            <th class="p-2.5">WATER LEVEL</th>
            <th class="p-2.5">STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="log in safeLogs.slice(0, 8)"
            :key="log.id"
            class="border-b border-slate-100 dark:border-slate-800/60"
          >
            <td class="p-2.5 font-mono text-slate-500">
              {{ formatDate(log.created_at) }}
            </td>
            <td class="p-2.5 font-bold text-slate-800 dark:text-slate-200">
              {{ log.sensor_id }}
            </td>
            <td class="p-2.5 font-bold text-rose-600 dark:text-rose-400">
              {{ log.water_level }}m
            </td>
            <td class="p-2.5">
              <span
                class="bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded text-[10px] font-bold"
              >
                CRITICAL EXCEEDED
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
