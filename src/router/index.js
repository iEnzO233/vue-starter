// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Adjust the path if necessary

// Define your routes
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          pageTitle: 'داشبورد',
          breadcrumbs: ['داشبورد'],
        },
      },
    ],
  },
  // Authentication routes (public)
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
          pageTitle: 'ورود',
        },
      },
    ],
  },
  // Error pages
  {
    path: '/error',
    component: () => import('@/layouts/SystemLayout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/errors/Error404.vue'),
        meta: {
          pageTitle: 'خطای 404',
        },
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/errors/Error500.vue'),
        meta: {
          pageTitle: 'خطای 500',
        },
      },
    ],
  },
  // Redirect any unmatched routes to 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: 'smooth',
      };
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth',
      };
    }
  },
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Set the page title
  if (to.meta.pageTitle) {
    document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
  }

  // Check if the route requires authentication
  if (to.meta.requiresAuth !== false) {
    // Route requires authentication
    if (!authStore.isAuthenticated) {
      try {
        await authStore.verifyAuth();
        if (authStore.isAuthenticated) {
          next();
        } else {
          next({ name: 'sign-in' });
        }
      } catch {
        next({ name: 'sign-in' });
      }
    } else {
      next();
    }
  } else {
    // Route does not require authentication
    next();
  }
});

export default router;
