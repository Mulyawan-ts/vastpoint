<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '~/stores/useDashboardStore'
import type { TelemetryItem } from '~/composables/useTelemetryChart'

const props = defineProps<{
  telemetry: TelemetryItem[]
}>()

const dashboardStore = useDashboardStore()

// Filter data telemetri berdasarkan sensor yang dipilih di Pinia
const filteredTelemetry = computed(() => {
  if (!props.telemetry) return []
  if (dashboardStore.selectedSensor === 'ALL') {
    return props.telemetry
  }
  return props.telemetry.filter((item) => item.sensor_id === dashboardStore.selectedSensor)
})

const getStatusBadge = (level: number) => {
  if (level > 4.5) return 'CRITICAL'
  if (level > 3.0) return 'WARNING'
  return 'NORMAL'
}
</script>

<template>
  <section class="card-panel">
    <div class="flex items-center justify-between mb-4">
      <h3 class="m-0 text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <div class="i-lucide-activity text-sky-500 text-base" />
        Telemetry Feed Stream (Go)
      </h3>
      <span class="text-xs text-sub font-mono">
        Filter: <b class="text-sky-500">{{ dashboardStore.selectedSensor }}</b>
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-700 text-sub">
            <th class="p-2.5">SENSOR ID</th>
            <th class="p-2.5">LEVEL (m)</th>
            <th class="p-2.5">STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredTelemetry"
            :key="item.sensor_id + item.timestamp"
            class="border-b border-slate-100 dark:border-slate-800/60"
          >
            <td class="p-2.5 font-bold font-mono text-slate-800 dark:text-slate-200">
              {{ item.sensor_id }}
            </td>
            <td class="p-2.5 font-mono text-slate-600 dark:text-slate-300">
              {{ item.water_level }}
            </td>
            <td class="p-2.5">
              <span
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold',
                  getStatusBadge(item.water_level) === 'CRITICAL'
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400'
                    : getStatusBadge(item.water_level) === 'WARNING'
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400'
                    : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400',
                ]"
              >
                {{ getStatusBadge(item.water_level) }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredTelemetry.length === 0">
            <td colspan="3" class="p-4 text-center text-sub italic">
              Tidak ada data telemetri untuk sensor {{ dashboardStore.selectedSensor }}.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
