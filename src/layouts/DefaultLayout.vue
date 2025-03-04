<script setup>
import {onMounted, ref} from 'vue';
import {RouterView, useRouter} from "vue-router";
import SideBar from "@/components/SideBar.vue";
import ApiService from '@/services/ApiService';
import {useAuthStore} from '@/stores/auth';
import {useGlobalStore} from "@/stores/global.js";
import {ScrollArea} from '@/components/ui/scroll-area'

const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const isSidebarCollapsed = ref(false); // Tracks the sidebar's collapse state

// Function to validate token
const validateToken = async () => {
  try {
    const response = await ApiService.get('/panel/check-token');
    globalStore.userPermissions = response.data?.data?.permissions;
  } catch (error) {
    console.error('Invalid token, logging out...', error);
    authStore.logout();
    await router.push('/auth/sign-in');
  }
};

// Validate token on mounted
onMounted(() => {
  validateToken();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-5">
    <!-- Sidebar -->
    <div :class="{
        'lg:col-span-3 xl:col-span-2': !isSidebarCollapsed,
        'lg:col-span-1 xl:col-span-1': isSidebarCollapsed,
      }"
         class="col-span-12 "
    >
      <SideBar @update:collapsed="isSidebarCollapsed = $event"/>
    </div>

    <!-- Main Content -->
    <div
        :class="{
        'lg:col-span-9 xl:col-span-10': !isSidebarCollapsed,
        'lg:col-span-11 xl:col-span-11': isSidebarCollapsed,
      }"
        class="col-span-12 transition-all duration-300 ease-in-out"
    >
      <ScrollArea class="h-dvh w-full rtl">
        <div class="container mx-auto h-full py-20">
          <RouterView/>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
