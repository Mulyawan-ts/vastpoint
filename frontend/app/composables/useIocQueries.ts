export const useIocQueries = () => {
  const { telemetryQuery } = useTelemetryQuery()
  const { selectedRange, analyticsQuery } = useAnalyticsQuery()
  const { alertsQuery, alertHistoryQuery } = useAlertQuery()
  const { goHealthQuery, pythonHealthQuery } = useHealthQuery()

  return {
    selectedRange,
    telemetryQuery,
    analyticsQuery,
    alertsQuery,
    alertHistoryQuery,
    goHealthQuery,
    pythonHealthQuery,
  }
}
