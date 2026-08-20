import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),          // Kompatibel 100% dengan class Tailwind
    presetAttributify(),   // Mendukung styling lewat attribut
    presetIcons({         // Pilihan ikon otomatis (lucide, mdi, dll)
      scale: 1.2,
      cdn: 'https://esm.sh/',
      warn: true,
    }),
  ],
  shortcuts: {
      'card-panel': 'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 shadow-sm transition-colors',
      'text-heading': 'text-slate-800 dark:text-slate-100 font-bold',
      'text-sub': 'text-slate-500 dark:text-slate-400 text-sm',
  },
})
