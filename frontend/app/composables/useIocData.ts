export const useIocData = () => {
  // Fetch data telemetri real-time dari Go Echo
  const fetchLiveTelemetry = async () => {
    try {
      const res = await $fetch<{ data: any[] }>('http://localhost:8080/api/v1/telemetry')
      return res.data || []
    } catch (err) {
      console.error('Failed to fetch live telemetry:', err)
      return []
    }
  }

  // Fetch data analitik agregasi dari Python Litestar (DuckDB)
  const fetchAnalyticsSummary = async () => {
    try {
      const res = await $fetch<{ data: any[] }>('http://localhost:8000/api/analytics/telemetry/summary')
      return res.data || []
    } catch (err) {
      console.error('Failed to fetch analytics summary:', err)
      return []
    }
  }

  const fetchActiveAlerts = async () => {
      try {
        const res = await $fetch<{ alerts: any[] }>('http://localhost:8080/api/v1/alerts')
        return res.alerts || []
      } catch {
        return []
      }
    }
  return {
    fetchLiveTelemetry,
    fetchAnalyticsSummary,
    fetchActiveAlerts,
  }
}
