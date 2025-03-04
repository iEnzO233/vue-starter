
<script setup>
import {ref, computed, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Icon} from "@iconify/vue";
import {useAuthStore} from "@/stores/auth";
import {useGlobalStore} from "@/stores/global";
import { ScrollArea } from '@/components/ui/scroll-area'

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// Emits the `isCollapsed` state
const emit = defineEmits(["update:collapsed"]);

const isOpen = ref(false);
const isCollapsed = ref(false); // State for collapse/expand

// Sidebar menu divided into sections with required permissions
const menuSections = [
  {
    label: "اصلی",
    items: [
      {
        name: "dashboard",
        label: "داشبورد",
        route: { name: "dashboard" },
        icon: "solar:widget-5-line-duotone",
        permissions: [],
      }
    ]
  },
  {
    label: "مدیریت",
    items: []
  },

];

// Filter menu based on user permissions
const filteredMenuSections = computed(() => {
  return menuSections
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          if (!item.permissions || item.permissions.length === 0) {
            // If permissions are empty, show to everyone
            return true;
          }
          // Check if any of the permissions exist in user's permissions
          return item.permissions.some((permission) =>
              globalStore.userPermissions.includes(permission)
          );
        });

        return {
          ...section,
          items: filteredItems.map((item) => {
            if (item.children) {
              const filteredChildren = item.children.filter((subItem) => {
                if (!subItem.permissions || subItem.permissions.length === 0) {
                  return true;
                }
                return subItem.permissions.some((permission) =>
                    globalStore.userPermissions.includes(permission)
                );
              });

              return {
                ...item,
                children: filteredChildren,
              };
            }
            return item;
          }),
        };
      })
      .filter((section) => section.items.length > 0);
});

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
  isCollapsed.value = false;
  emit("update:collapsed", isCollapsed.value);
  document.documentElement.classList.toggle("open", isOpen.value);
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit("update:collapsed", isCollapsed.value); // Emit the collapse state
};

const isActiveRoute = (menuRoute) => {
  return route.name === menuRoute.name;
};

const handleLogout = () => {
  authStore.logout();
  router.push({name: "sign-in"});
};

// Watch for route changes and close the menu if the sidebar is open
watch(route, () => {
  if (isOpen.value) {
    isOpen.value = false;
    document.documentElement.classList.remove("open");
  }
});
</script>

<template>
  <button
      class="btn btn-circle btn-sm lg:hidden fixed top-3 right-4 z-40"
      @click="toggleDrawer"
  >
    <Icon icon="mdi:menu" class="w-6 h-6" />
  </button>
  <div
      class="h-full relative"
      :class="[isOpen ? 'fixed top-0 left-0 w-full z-10' : 'hidden lg:block']"
  >
    <aside
        class="w-full h-dvh text-base-content p-4 border-l card-border-color sticky inset-0 top-0 z-10 transition-all duration-300 ease-in-out"
        :class="{
        '!pt-[60px]': isOpen,
      }"
    >
      <!-- Collapse/Expand Button -->
      <div class="absolute top-2 -left-8 hidden lg:block">
        <button
            class="btn btn-ghost btn-square mb-4 w-fit h-fit min-h-0"
            @click="toggleCollapse"
        >
          <Icon
              :icon="isCollapsed ? 'tabler:layout-sidebar-right-collapse' : 'tabler:layout-sidebar-left-collapse'"
              class="w-6 h-6"
          />
        </button>
      </div>

      <!-- Sidebar content here -->
      <div class="flex flex-col h-full pt-2">
        <!-- Navigation Menu -->
        <ScrollArea class="h-[87dvh] rtl">
          <ul class="">
            <div
                v-for="(section, index) in filteredMenuSections"
                :key="index"
                class="mb-6"
            >
              <h4
                  v-if="section.label && !isCollapsed"
                  class="px-4 mb-2 text-sm font-semibold uppercase text-gray-500"
              >
                {{ section.label }}
              </h4>
              <div class="flex flex-col gap-3">
                <li
                    v-for="item in section.items"
                    :key="item.name"
                    class="hover:font-medium text-light-700 dark:text-dark-800 hover:text-light-900 dark:hover:text-[#f5f5f5] px-2 "
                    :class="isCollapsed ? 'mx-auto' : ''"
                >

                  <router-link
                      :to="item.route"
                      class="flex items-center gap-3 py-3 rounded-lg transition px-2"
                      :class="{
                    'justify-center': isCollapsed,
                    'justify-start': !isCollapsed,
                  }"
                  >
                    <Icon :icon="item.icon" class="w-[22px] h-[22px]" />
                    <span v-if="!isCollapsed">{{ item.label }}</span>
                  </router-link>
                </li>
              </div>
            </div>
          </ul>
        </ScrollArea>


        <!-- Logout Button -->
        <div class="mx-auto py-3">
          <button
              class="btn"
              @click="handleLogout"
          >
            <Icon class="w-5 h-5" icon="solar:logout-2-line-duotone" />
            <span v-if="!isCollapsed">خروج</span>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>


<style>
.router-link-exact-active {
  @apply  bg-[#f7f8fb];
}

.dark .router-link-exact-active {
  @apply  bg-[#2a2a3c];
}
</style>
