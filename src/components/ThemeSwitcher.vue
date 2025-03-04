<template>

  <!-- Theme Switcher Button -->
  <button
    aria-label="تغییر تم"
    class="btn btn-ghost btn-circle btn-sm fixed top-3 left-4 z-[100] flex items-center justify-center"
    @click="toggleTheme"
  >
    <Icon :icon="globalStore.currentTheme === 'dark' ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'" class="h-4 w-4" />
  </button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import {useGlobalStore} from "@/stores/global.js";
const globalStore = useGlobalStore()

const toggleTheme = () => {
  globalStore.currentTheme = globalStore.currentTheme === "light" ? "dark" : "light";
  changeTheme();
};

const changeTheme = () => {
  applyTheme(globalStore.currentTheme);
  localStorage.setItem("theme", globalStore.currentTheme);
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && ["light", "dark"].includes(savedTheme)) {
    globalStore.currentTheme = savedTheme;
    applyTheme(savedTheme);
  } else {
    applyTheme(globalStore.currentTheme);
  }
});
</script>

<style scoped>
/* No additional styles needed */
</style>
