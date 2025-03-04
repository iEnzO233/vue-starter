// src/services/ApiService.js

import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/services/jwtService';
import { toast } from 'vue-sonner'
/**
 * @description Service to call HTTP requests via Axios
 */
class ApiService {
  /**
   * @description Property to share Vue instance
   */
  static vueInstance = null;

  /**
   * @description Initialize Vue Axios and set up interceptors
   * @param {App} app - The Vue app instance
   */
  static init(app) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

    // Add response interceptors for handling messages
    ApiService.vueInstance.axios.interceptors.response.use(
        response => {
          // Success handling
          ApiService.handleSuccess(response);
          return response;
        },
        error => {
          // Error handling
          ApiService.handleError(error);
          return Promise.reject(error);
        }
    );
  }

  /**
   * @description Set the default HTTP request headers
   */
  static setHeader() {
    const token = JwtService.getToken();
    if (token) {
      ApiService.vueInstance.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    ApiService.vueInstance.axios.defaults.headers.common['Accept'] = 'application/json';
  }

  /**
   * @description Handle successful responses with toast notifications
   * @param {Object} response - The response object from Axios
   */
  static handleSuccess(response) {
    const { meta, data } = response.data;
    let ignoredMessages = ['Done!', 'Done']
    // Show success message if provided in meta, unless the message is "Done!" and data exists
    if (meta && meta.status === true && meta.message && !(ignoredMessages.includes(meta.message))) {
      toast.success(meta.message)
    }
  }

  /**
   * @description Handle error responses with toast notifications
   * @param {Object} error - The error object from Axios
   */
  static handleError(error) {
    const meta = error.response?.data?.meta;

    if (meta) {
      // Show specific field errors if available
      if (meta.errors) {
        Object.values(meta.errors).flat().forEach(err => {
          toast.error(err);
        });
      }
      // Show the main error message if present
      else if (meta.message) {
        toast.error(meta.message)
      }
    } else {
      // Fallback for unexpected errors
      toast.error('An unexpected error occurred');
    }
  }

  /**
   * @description Send the GET HTTP request with query parameters
   * @param {string} resource - The API endpoint
   * @param {object} params - Query parameters
   * @returns {Promise}
   */
  static query(resource, params) {
    return ApiService.vueInstance.axios.get(resource, { params: params });
  }

  /**
   * @description Send the GET HTTP request
   * @param {string} resource - The API endpoint
   * @param {string} [slug=''] - Additional path parameter
   * @returns {Promise}
   */
  static get(resource, slug = '') {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description Send the POST HTTP request
   * @param {string} resource - The API endpoint
   * @param {object} params - Request payload
   * @returns {Promise}
   */
  static post(resource, params) {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description Send the PUT HTTP request to update a resource
   * @param {string} resource - The API endpoint
   * @param {string} slug - Identifier of the resource to update
   * @param {object} params - Request payload
   * @returns {Promise}
   */
  static update(resource, slug, params) {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param {string} resource - The API endpoint
   * @param {object} params - Request payload
   * @returns {Promise}
   */
  static put(resource, params) {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param {string} resource - The API endpoint
   * @returns {Promise}
   */
  static delete(resource) {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
