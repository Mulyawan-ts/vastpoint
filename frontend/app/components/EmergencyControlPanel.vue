<script setup lang="ts">
import { computed } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  actuators: Array<{
    device: string
    status: string
  }>
}>()

const { toggleMutation } = useActuatorQuery()

const getDeviceStatus = (deviceName: string, defaultStatus: string) => {
  const found = props.actuators.find((a) => a.device === deviceName)
  return found ? found.status : defaultStatus
}

const valveStatus = computed(() => getDeviceStatus('DRAINAGE_VALVE', 'CLOSED'))
const pumpStatus = computed(() => getDeviceStatus('AUX_PUMP', 'OFF'))

const toggleValve = () => {
  const nextStatus = valveStatus.value === 'OPEN' ? 'CLOSED' : 'OPEN'
  toggleMutation.mutate(
    { device: 'DRAINAGE_VALVE', status: nextStatus },
    {
      onSuccess: () => {
        toast.success(`Katup Pembuangan diubah ke: ${nextStatus}`)
      },
    }
  )
}

const togglePump = () => {
  const nextStatus = pumpStatus.value === 'ON' ? 'OFF' : 'ON'
  toggleMutation.mutate(
    { device: 'AUX_PUMP', status: nextStatus },
    {
      onSuccess: () => {
        toast.success(`Pompa Pendukung diubah ke: ${nextStatus}`)
      },
    }
  )
}
</script>

<template>
  <section class="card-panel">
    <h2 class="m-0 text-lg text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2 font-bold">
      <div class="i-lucide-sliders text-sky-500 text-xl" />
      Emergency Override Controls
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Device 1: Drainage Valve -->
      <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div>
          <div class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <div class="i-lucide-valve text-sky-500 text-lg" />
            Drainage Main Valve
          </div>
          <span class="text-xs text-sub">
            Status:
            <b :class="valveStatus === 'OPEN' ? 'text-emerald-500 font-bold' : 'text-slate-400'">
              {{ valveStatus === 'OPEN' ? 'OPEN (DRAINING)' : 'CLOSED' }}
            </b>
          </span>
        </div>

        <button
          @click="toggleValve"
          :disabled="toggleMutation.isPending.value"
          :class="valveStatus === 'OPEN' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'"
          class="text-white px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-sm disabled:opacity-50"
        >
          {{ valveStatus === 'OPEN' ? 'CLOSE VALVE' : 'OPEN VALVE' }}
        </button>
      </div>

      <!-- Device 2: Auxiliary Pump -->
      <div class="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div>
          <div class="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <div class="i-lucide-fan text-amber-500 text-lg" />
            Auxiliary Booster Pump
          </div>
          <span class="text-xs text-sub">
            Status:
            <b :class="pumpStatus === 'ON' ? 'text-amber-500 font-bold' : 'text-slate-400'">
              {{ pumpStatus === 'ON' ? 'RUNNING' : 'STOPPED' }}
            </b>
          </span>
        </div>

        <button
          @click="togglePump"
          :disabled="toggleMutation.isPending.value"
          :class="pumpStatus === 'ON' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-sky-600 hover:bg-sky-700'"
          class="text-white px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-sm disabled:opacity-50"
        >
          {{ pumpStatus === 'ON' ? 'STOP PUMP' : 'START PUMP' }}
        </button>
      </div>
    </div>
  </section>
</template>
