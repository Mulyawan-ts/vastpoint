import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    selectedSensor: 'ALL', // 'ALL' | 'SAN-PLANT-A' | 'SAN-PLANT-B' | 'WADUK-01' | 'WADUK-02'
    timeRange: 'all', // 'all' | '1h' | '24h' | '7d'
  }),
  actions: {
    setSensor(sensorId: string) {
      this.selectedSensor = sensorId
    },
    setTimeRange(range: string) {
      this.timeRange = range
    },
  },
})
