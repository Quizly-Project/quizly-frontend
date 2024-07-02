import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

// API 관련 함수들
const authAPI = {
  login: async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  },
  signup: async userData => {
    const response = await axios.post('/api/signup', userData);
    return response.data;
  },
  // 다른 API 호출 함수들...
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // login: async (email, password) => {
      //   try {
      //     const { user, token } = await authAPI.login(email, password);
      //     set({ user, token, isAuthenticated: true });
      //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //     return true;
      //   } catch (error) {
      //     console.error('Login failed:', error);
      //     return false;
      //   }
      // },
      login: userData => set({ user: userData, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete axios.defaults.headers.common['Authorization'];
      },
      signup: async userData => {
        try {
          const { user, token } = await authAPI.signup(userData);
          set({ user, token, isAuthenticated: true });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return true;
        } catch (error) {
          console.error('Signup failed:', error);
          return false;
        }
      },
      updateUser: userData =>
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
