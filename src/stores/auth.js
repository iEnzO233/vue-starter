import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/services/ApiService";
import JwtService from "@/services/jwtService";

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref({});
  const isAuthenticated = ref(!!JwtService.getToken());

  const setAuth = (authUser) => {
    isAuthenticated.value = true;
    user.value = authUser.user;
    errors.value = {};
    JwtService.saveToken(authUser.token);
    ApiService.setHeader();
  };

  const setError = (error) => {
    errors.value = { ...error };
  };

  const purgeAuth = () => {
    isAuthenticated.value = false;
    user.value = {};
    errors.value = {};
    JwtService.destroyToken();
    ApiService.setHeader();
  };

  const login = async (credentials) => {
    try {
      const response = await ApiService.post('/panel/login', credentials);
      console.log('response', response);
      // Adjusted to match the API response structure
      if (response.data && response.data.data) {
        setAuth(response.data.data);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error) {
      console.log('error', error)
      // Adjusted error extraction based on the provided structure
      if (error.response && error.response.data && error.response.data.meta) {
        setError(error.response.data.meta.message || {});
        throw error; // Re-throw the error to handle it in the component
      } else {
        setError({ general: 'خطایی رخ داده است. لطفاً مجدداً تلاش کنید.' });
        throw error;
      }
    }
  };

  const logout = () => {
    purgeAuth();
  };

  const register = (credentials) => {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors || response.data);
      });
  };

  const forgotPassword = (email) => {
    return ApiService.post("forgot_password", { email })
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors || response.data);
      });
  };

  const verifyAuth = () => {
    const token = JwtService.getToken();
    if (token) {
      ApiService.setHeader();
      ApiService.post("verify_token", { api_token: token })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors || response.data);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  };

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth
  };
});
