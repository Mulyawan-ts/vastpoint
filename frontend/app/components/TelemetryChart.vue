<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  type ChartData,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

const props = defineProps<{
  telemetryData: Array<{
    id: number;
    sensor_id: string;
    water_level: number;
    timestamp: string;
  }>;
}>();

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const availableSensors = computed(() => {
  const ids = props.telemetryData.map((r) => r.sensor_id);
  return Array.from(new Set(ids));
});

const selectedSensors = ref<string[]>([]);

watchEffect(() => {
  if (selectedSensors.value.length === 0 && availableSensors.value.length > 0) {
    selectedSensors.value = [...availableSensors.value];
  }
});

const toggleSensor = (sensorId: string) => {
  if (selectedSensors.value.includes(sensorId)) {
    if (selectedSensors.value.length > 1) {
      selectedSensors.value = selectedSensors.value.filter(
        (id) => id !== sensorId,
      );
    }
  } else {
    selectedSensors.value.push(sensorId);
  }
};

const chartData = computed<ChartData<"line">>(() => {
  const records = props.telemetryData;

  // 1. Ekstrak Label Waktu Unik & Terurut
  const labels = records.map((r) =>
    new Date(r.timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  );

  const sensorColors: Record<string, string> = {
    "SAN-PLANT-A": "#0284c7",
    "SAN-PLANT-B": "#16a34a",
    "WADUK-01": "#d97706",
    "WADUK-02": "#db2777",
  };

  // 2. Petakan titik data null/value sesuai posisi timestamp
  const datasets = selectedSensors.value.map((sensorId) => {
    const dataPoints = records.map((r) =>
      r.sensor_id === sensorId ? r.water_level : null,
    );

    return {
      label: sensorId,
      data: dataPoints,
      borderColor: sensorColors[sensorId] || "#3b82f6",
      backgroundColor: sensorColors[sensorId] || "#3b82f6",
      spanGaps: true, // PENTING: Hubungkan garis antar titik yang terpisah
      tension: 0.3,
    };
  });

  return { labels, datasets };
});

const chartOptions = computed<ChartOptions<"line">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 300, // Animasikan pergerakan garis dengan mulus
  },
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { color: isDark.value ? "#94a3b8" : "#64748b" },
      grid: { color: isDark.value ? "#334155" : "#e2e8f0" },
    },
    y: {
      min: 0,
      max: 7,
      ticks: { color: isDark.value ? "#94a3b8" : "#64748b" },
      grid: { color: isDark.value ? "#334155" : "#e2e8f0" },
      title: {
        display: true,
        text: "Water Level (m)",
        color: isDark.value ? "#94a3b8" : "#475569",
      },
    },
  },
}));
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <span class="text-xs text-sub font-semibold mr-1">Filter Sensors:</span>
      <button
        v-for="sensorId in availableSensors"
        :key="sensorId"
        @click="toggleSensor(sensorId)"
        :class="[
          'px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer border transition-all flex items-center gap-1.5',
          selectedSensors.includes(sensorId)
            ? 'bg-sky-100 dark:bg-sky-950/80 border-sky-400 dark:border-sky-600 text-sky-800 dark:text-sky-200'
            : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-400 opacity-60',
        ]"
      >
        <div
          class="w-2 h-2 rounded-full"
          :class="
            selectedSensors.includes(sensorId) ? 'bg-sky-500' : 'bg-slate-400'
          "
        />
        <span>{{ sensorId }}</span>
      </button>
    </div>

    <div class="h-72 relative">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
