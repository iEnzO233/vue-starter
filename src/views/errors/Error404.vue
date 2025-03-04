<script setup>

</script>

<template>
  <div class="flex items-center justify-center flex-col gap-10 min-h-screen">
    <img alt="" class="w-96" src="/media/images/404.svg">
    <p class="text-3xl font-medium">صفحه مورد نظر پیدا نشد</p>
    <button class="btn btn-primary px-10">
      <router-link
          class="flex items-center gap-3"
          to="item.route"
      >
        <Icon class="w-5 h-5" icon="solar:home-2-line-duotone"/>
        <span class="">خانه</span>
      </router-link>
    </button>
  </div>
</template>

<style scoped>

</style>