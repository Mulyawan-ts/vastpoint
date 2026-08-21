<script setup lang="ts">
const { telemetryQuery, analyticsQuery, alertsQuery, alertHistoryQuery } = useIocQueries()
const { actuatorQuery } = useActuatorQuery()
const { anomalyQuery } = useAnomalyQuery()

const liveTelemetry = computed(() => telemetryQuery.data.value || [])
const analyticsSummary = computed(() => analyticsQuery.data.value || [])
const activeAlerts = computed(() => alertsQuery.data.value || [])
const alertLogs = computed(() => alertHistoryQuery.data.value || [])
const actuators = computed(() => actuatorQuery.data.value || [])
const anomalies = computed(() => anomalyQuery.data.value || [])
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-8 transition-colors duration-300">
    <AppHeader />
    <AlertBanner :alerts="activeAlerts" />
    <KpiStatCards :telemetry="liveTelemetry" :alerts="activeAlerts" />

    <div class="flex flex-col gap-6">
      <section class="card-panel">
        <TelemetryChart :telemetry-data="liveTelemetry" />
      </section>

      <!-- Panel Control Sakelar Darurat -->
      <EmergencyControlPanel :actuators="actuators" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TelemetryTable :telemetry="liveTelemetry" />
        <AnalyticsCards :analytics="analyticsSummary" />
      </div>

      <!-- Pasang Komponen Anomaly Detection di Sini -->
      <AnomalyCard :anomalies="anomalies" />

      <AlertHistoryTable :logs="alertLogs" />
    </div>

    <ClientOnly>
      <Toaster position="bottom-right" close-button rich-colors />
    </ClientOnly>
  </div>
</template>
