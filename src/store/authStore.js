import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api/axios';

const authAPI = {
  login: async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  signup: async data => {
    try {
      const response = await api.post('/join', data);
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await api.post('/logout'); // 서버에 로그아웃 요청 (필요한 경우)
    } catch (error) {
      console.error('Logout failed:', error);
      // 로그아웃은 클라이언트에서 처리할 수 있으므로 에러를 던지지 않음
    }
  },
  // 다른 API 호출 함수들...
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: async (username, password) => {
        try {
          const data = await authAPI.login(username, password);
          set({
            user: data.username,
            isAuthenticated: true,
            token: data.token,
          });
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          return true;
        } catch (error) {
          console.error('Login failed in store:', error);
          return false;
        }
      },
      logout: async () => {
        try {
          await authAPI.logout();
        } finally {
          set({ user: null, isAuthenticated: false, token: null });
          delete api.defaults.headers.common['Authorization'];
        }
      },
      signup: async userData => {
        try {
          const data = await authAPI.signup(userData);
          set({
            user: userData.username,
            isAuthenticated: true,
            token: data.token,
          });
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          return true;
        } catch (error) {
          console.error('Signup failed in store:', error);
          return false;
        }
      },
      updateUser: userData => {
        set(state => ({
          user: { ...state.user, ...userData },
        }));
      },
      getToken: () => get().token,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;
