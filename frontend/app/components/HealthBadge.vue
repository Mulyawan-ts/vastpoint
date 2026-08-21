<script setup lang="ts">
defineProps<{
  name: string;
  isOnline: boolean;
}>();
</script>

<template>
  <div
    class="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-2.5 py-1 rounded-md text-xs font-medium"
  >
    <span
      :class="
        isOnline
          ? 'bg-emerald-500 shadow-emerald-500/50'
          : 'bg-rose-500 shadow-rose-500/50'
      "
      class="w-2 h-2 rounded-full shadow-sm animate-pulse"
    />
    <span class="text-slate-600 dark:text-slate-300">{{ name }}:</span>
    <span
      :class="
        isOnline
          ? 'text-emerald-600 dark:text-emerald-400 font-bold'
          : 'text-rose-600 dark:text-rose-400 font-bold'
      "
    >
      {{ isOnline ? "ONLINE" : "OFFLINE" }}
    </span>
  </div>
</template>
