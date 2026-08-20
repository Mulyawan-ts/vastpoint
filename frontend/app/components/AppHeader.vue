<script setup lang="ts">
const colorMode = useColorMode()
const { exportTelemetryReport } = useExportPdf()
const { telemetryQuery, analyticsQuery, selectedRange } = useIocQueries()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

const handleExport = () => {
  const telemetry = telemetryQuery.data.value || []
  const analytics = analyticsQuery.data.value || []
  exportTelemetryReport(telemetry, analytics, selectedRange.value)
}
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/80 pb-4 mb-6">
    <div>
      <h1 class="m-0 text-sky-600 dark:text-sky-400 flex items-center gap-2.5 text-2xl font-bold">
        <div class="i-lucide-activity text-sky-600 dark:text-sky-400 text-3xl" />
        VASTPOINT — Operational Center
      </h1>
      <p class="m-0 mt-1 text-sub">
        Water Plant, Sanitation & Reservoir Management
      </p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Export PDF Button -->
      <button
        @click="handleExport"
        class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium transition-colors shadow-sm text-sm"
      >
        <div class="i-lucide-file-text text-base" />
        <span>Export PDF</span>
      </button>

      <!-- Theme Switcher -->
      <button
        @click="toggleTheme"
        class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
      >
        <div :class="colorMode.value === 'light' ? 'i-lucide-moon' : 'i-lucide-sun'" class="text-base" />
        <span>{{ colorMode.value === 'light' ? 'Dark Mode' : 'Light Mode' }}</span>
      </button>
    </div>
  </header>
</template>
