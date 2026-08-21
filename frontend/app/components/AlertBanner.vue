<script setup lang="ts">
defineProps<{
  alerts: Array<{
    id: number;
    sensor_id: string;
    water_level: number;
  }>;
}>();
</script>

<template>
  <div
    v-if="alerts.length > 0"
    class="bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/60 rounded-xl p-4 mb-6 text-rose-900 dark:text-rose-200 shadow-sm"
  >
    <div
      class="font-bold text-base text-rose-700 dark:text-rose-300 flex items-center gap-2"
    >
      <div
        class="i-lucide-alert-triangle text-xl text-rose-600 dark:text-rose-400"
      />
      <span>PERINGATAN: DETEKSI KETINGGIAN AIR KRITIS (> 4.5m)</span>
    </div>
    <div class="mt-3 text-sm flex gap-2 flex-wrap">
      <span
        v-for="alert in alerts.slice(0, 5)"
        :key="alert.id"
        class="bg-rose-200/80 dark:bg-rose-900/60 text-rose-900 dark:text-rose-100 px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5"
      >
        <div class="i-lucide-droplet text-xs" />
        <b>{{ alert.sensor_id }}</b
        >: {{ alert.water_level }}m
      </span>
    </div>
  </div>
</template>
