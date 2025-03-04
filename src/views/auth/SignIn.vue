<template>
  <div class="container mx-auto">
    <div class="card border card-border-color max-w-md bg-base-200/10 dark:bg-base-200 w-full mx-auto mt-10">
      <form
        id="sign_in_form"
        class="card-body flex flex-col gap-5 p-10"
        @submit.prevent="handleLogin"
      >
        <div class="text-center flex flex-col gap-2 mb-2.5">
          <h3 class="text-lg font-medium text-primary leading-none mb-2.5">
            ورود
          </h3>
        </div>
        <div class="flex flex-col gap-5">
          <div>
            <label class="label">
              <span class="label-text">موبایل</span>
            </label>
            <input
              type="text"
              class="input input-bordered w-full ltr"
              v-model="mobile"
              placeholder="09123456789"
              name="mobile"
            />
            <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">
              {{ errors.mobile }}
            </p>
          </div>
          <div class="relative">
            <label class="label">
              <span class="label-text">رمز عبور</span>
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="input input-bordered w-full ltr"
                v-model="password"
                name="password"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2"
                @click="togglePasswordVisibility"
              >
                <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>
          <p v-if="errors.general" class="text-red-500 text-sm mt-1">
            {{ errors.general }}
          </p>
        </div>
        <button
          class="btn btn-primary flex justify-center items-center mt-4"
          type="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          <span v-else>ورود</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const mobile = ref('');
const password = ref('');
const errors = reactive({});
const loading = ref(false);
const showPassword = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  // Clear previous errors without breaking reactivity
  Object.keys(errors).forEach((key) => delete errors[key]);

  // Simple client-side validation
  if (!mobile.value) {
    errors.mobile = 'لطفاً شماره موبایل خود را وارد کنید.';
  } else if (!/^09\d{9}$/.test(mobile.value)) {
    errors.mobile = 'شماره موبایل وارد شده صحیح نیست.';
  }

  if (!password.value) {
    errors.password = 'لطفاً رمز عبور خود را وارد کنید.';
  }

  if (Object.keys(errors).length > 0) {
    return;
  }

  loading.value = true;

  try {
    await authStore.login({
      mobile: mobile.value,
      password: password.value,
    });

    // Navigate to the dashboard after successful login
    await router.push({ name: 'dashboard' });
  } catch (error) {
    // Handle error response
    if (error.response && error.response.data && error.response.data.meta) {
      const responseErrors = error.response.data.meta.errors || {};
      const message = error.response.data.meta.message || '';

      // Set field-specific errors if available
      if (responseErrors.mobile) {
        errors.mobile = responseErrors.mobile[0];
      }
      if (responseErrors.password) {
        errors.password = responseErrors.password[0];
      }

      // Set general error message
      if (message && !errors.mobile && !errors.password) {
        errors.general = message;
      }
    } else {
      errors.general = 'خطایی رخ داده است. لطفاً مجدداً تلاش کنید.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
