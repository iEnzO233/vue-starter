<script setup>
import { ref } from 'vue';
import ApiService from '@/services/ApiService';

// Reservation state
const selectedDaysForReservations = ref(30); // Default to 30 days for reservations
const reservationsCount = ref(0); // "رزروهای موفق" count
const isLoadingReservations = ref(false);


// Fetch reservation stats
const fetchReservationStats = async () => {
  isLoadingReservations.value = true;
  try {
    const response = await ApiService.query('/panel/reservation/stat', {selected_days: selectedDaysForReservations.value});
    reservationsCount.value = response.data.data.count;
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingReservations.value = false;
  }
};

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8"></div>
</template>

