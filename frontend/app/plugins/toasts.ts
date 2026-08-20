import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css' // <--- PENTING: Import style bawaan Sonner!

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Toaster', Toaster)
  return {
    provide: {
      toast,
    },
  }
})
