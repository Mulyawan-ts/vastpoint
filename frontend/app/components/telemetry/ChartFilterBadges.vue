<script setup lang="ts">
import { useDashboardStore } from "~/stores/useDashboardStore";
const dashboardStore = useDashboardStore();

const sensors = ["ALL", "SAN-PLANT-A", "SAN-PLANT-B", "WADUK-01", "WADUK-02"];
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <button
      v-for="sensor in sensors"
      :key="sensor"
      @click="dashboardStore.setSensor(sensor)"
      :class="[
        'px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer',
        dashboardStore.selectedSensor === sensor
          ? 'bg-sky-600 text-white'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200',
      ]"
    >
      {{ sensor }}
    </button>
  </div>
</template>
