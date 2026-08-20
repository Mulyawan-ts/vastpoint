<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  telemetry: Array<{
    id: number
    sensor_id: string
    water_level: number
    timestamp: string
  }>
  alerts: Array<any>
}>()

// 1. Total Sensor Unik
const totalSensors = computed(() => {
  const sensors = props.telemetry.map((t) => t.sensor_id)
  return new Set(sensors).size
})

// 2. Rata-Rata Ketinggian Air
const avgWaterLevel = computed(() => {
  if (props.telemetry.length === 0) return '0.00'
  const total = props.telemetry.reduce((acc, curr) => acc + curr.water_level, 0)
  return (total / props.telemetry.length).toFixed(2)
})

// 3. Ketinggian Air Tertinggi
const maxWaterLevel = computed(() => {
  if (props.telemetry.length === 0) return '0.00'
  const max = Math.max(...props.telemetry.map((t) => t.water_level))
  return max.toFixed(2)
})

// 4. Jumlah Alert Aktif
const activeAlertsCount = computed(() => props.alerts.length)
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <!-- Card 1: Active Sensors -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p class="text-xs text-sub font-semibold uppercase tracking-wider">Active Sensors</p>
        <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 m-0">{{ totalSensors }}</h3>
        <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">● Operational</span>
      </div>
      <div class="p-3 bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 rounded-lg">
        <div class="i-lucide-radio text-2xl" />
      </div>
    </div>

    <!-- Card 2: Avg Water Level -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p class="text-xs text-sub font-semibold uppercase tracking-wider">Avg Water Level</p>
        <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 m-0">{{ avgWaterLevel }} <span class="text-xs font-normal">m</span></h3>
        <span class="text-[10px] text-slate-400 font-medium">Real-time aggregate</span>
      </div>
      <div class="p-3 bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-lg">
        <div class="i-lucide-droplets text-2xl" />
      </div>
    </div>

    <!-- Card 3: Peak Water Level -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p class="text-xs text-sub font-semibold uppercase tracking-wider">Peak Water Level</p>
        <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 m-0">{{ maxWaterLevel }} <span class="text-xs font-normal">m</span></h3>
        <span class="text-[10px] text-amber-500 font-medium">Highest detected</span>
      </div>
      <div class="p-3 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-lg">
        <div class="i-lucide-trending-up text-2xl" />
      </div>
    </div>

    <!-- Card 4: Critical Incidents -->
    <div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p class="text-xs text-sub font-semibold uppercase tracking-wider">Active Alerts</p>
        <h3 class="text-2xl font-bold mt-1 m-0" :class="activeAlertsCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-100'">
          {{ activeAlertsCount }}
        </h3>
        <span :class="activeAlertsCount > 0 ? 'text-rose-500 font-bold' : 'text-slate-400'" class="text-[10px]">
          {{ activeAlertsCount > 0 ? 'Action required (>4.5m)' : 'All clear' }}
        </span>
      </div>
      <div
        :class="activeAlertsCount > 0 ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'"
        class="p-3 rounded-lg"
      >
        <div class="i-lucide-shield-alert text-2xl" />
      </div>
    </div>
  </div>
</template>
