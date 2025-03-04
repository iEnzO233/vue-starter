<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { Toaster } from '@/components/ui/sonner'
import {useGlobalStore} from "@/stores/global.js";
const globalStore = useGlobalStore()

</script>

<template>
  <Toaster position="top-center" richColors :theme="globalStore.currentTheme"/>
  <ThemeSwitcher />
  <RouterView />
</template>