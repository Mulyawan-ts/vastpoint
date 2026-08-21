import { computed } from 'vue'

export interface TelemetryItem {
  sensor_id: string
  water_level: number
  timestamp: string
}

export const useTelemetryChart = (
  telemetryData: Ref<TelemetryItem[]>,
  selectedSensor: Ref<string>
) => {
  // Filter data berdasarkan sensor yang dipilih di Pinia
  const filteredData = computed(() => {
    if (selectedSensor.value === 'ALL') return telemetryData.value
    return telemetryData.value.filter((d) => d.sensor_id === selectedSensor.value)
  })

  // Format Opsi ECharts / Chart Config
  const chartOptions = computed(() => {
    const timestamps = filteredData.value.map((d) =>
      new Date(d.timestamp).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )

    const seriesData = filteredData.value.map((d) => d.water_level)

    return {
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: timestamps },
      yAxis: { type: 'value', name: 'Water Level (m)' },
      series: [
        {
          name: 'Water Level',
          type: 'line',
          smooth: true,
          data: seriesData,
          areaStyle: { opacity: 0.1 },
        },
      ],
    }
  })

  return { chartOptions }
}
