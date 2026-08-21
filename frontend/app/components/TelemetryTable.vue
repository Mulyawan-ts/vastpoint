<script setup lang="ts">
defineProps<{
  telemetry: Array<{
    id: number;
    sensor_id: string;
    water_level: number;
    flow_rate: number;
  }>;
}>();
</script>

<template>
  <section
    style="
      background: #1e293b;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #334155;
    "
  >
    <h2 style="margin-top: 0; font-size: 1.2rem; color: #4ade80">
      🟢 Telemetry Feed Stream (Go)
    </h2>
    <table
      style="
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        font-size: 0.9rem;
      "
    >
      <thead>
        <tr
          style="
            border-bottom: 2px solid #334155;
            text-align: left;
            color: #94a3b8;
          "
        >
          <th style="padding: 10px">SENSOR ID</th>
          <th style="padding: 10px">LEVEL (m)</th>
          <th style="padding: 10px">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in telemetry.slice(-6)"
          :key="item.id"
          style="border-bottom: 1px solid #334155"
        >
          <td style="padding: 10px; font-weight: bold; color: #38bdf8">
            {{ item.sensor_id }}
          </td>
          <td style="padding: 10px">{{ item.water_level }}</td>
          <td style="padding: 10px">
            <span
              v-if="item.water_level > 4.5"
              style="color: #ef4444; font-weight: bold"
              >CRITICAL</span
            >
            <span v-else style="color: #22c55e">NORMAL</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
