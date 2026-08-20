<script setup lang="ts">
defineProps<{
  analytics: Array<{
    sensor_id: string
    avg_water_level: number
    max_water_level: number
    total_records: number
  }>
}>()

const { selectedRange } = useIocQueries()

const ranges = [
  { label: 'All', value: 'all' },
  { label: '1 Hours', value: '1h' },
  { label: '24 Hours', value: '24h' },
  { label: '7 Days', value: '7d' },
] as const
</script>

<template>
  <section class="card-panel">
    <div class="flex flex-wrap justify-between items-center mb-4 gap-2">
      <h2 class="m-0 text-lg text-sky-600 dark:text-sky-400 flex items-center gap-2">
        <div class="i-lucide-cpu text-xl" />
        DuckDB Aggregates (Python)
      </h2>

      <!-- Time-Range Button Filter -->
      <div class="flex gap-1 bg-slate-200 dark:bg-slate-900 p-1 rounded-lg text-xs font-medium">
        <button
          v-for="r in ranges"
          :key="r.value"
          @click="selectedRange = r.value"
          :class="[
            'px-2.5 py-1 rounded-md cursor-pointer transition-colors',
            selectedRange === r.value
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          ]"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <div v-if="analytics.length === 0" class="text-sub italic py-4">
      No telemetry records found for range: <b>{{ selectedRange }}</b>
    </div>

    <div v-else class="grid grid-cols-1 gap-3">
      <div
        v-for="metric in analytics"
        :key="metric.sensor_id"
        class="bg-slate-100 dark:bg-slate-900/60 p-3.5 rounded-lg border-l-4 border-sky-500 flex flex-col gap-1.5"
      >
        <div class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <div class="i-lucide-database text-sky-500" />
          {{ metric.sensor_id }}
        </div>
        <div class="flex justify-between text-xs text-sub">
          <span>Avg: <b class="text-slate-700 dark:text-slate-200">{{ metric.avg_water_level }}m</b></span>
          <span>Max: <b class="text-slate-700 dark:text-slate-200">{{ metric.max_water_level }}m</b></span>
          <span>Records: <b class="text-slate-700 dark:text-slate-200">{{ metric.total_records }}</b></span>
        </div>
      </div>
    </div>
  </section>
</template>
