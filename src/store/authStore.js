import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../api/axios';

const authAPI = {
  login: async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      // console.log(response);
      const nickname = response.headers.get('username');
      const token = response.headers.get('access');
      return { ...response.data, nickname, token };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  signup: async data => {
    try {
      const response = await api.post('/join', data);
      const token = response.headers.get('access');
      return { ...response.data, token };
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
          // console.log(data);
          set({
            user: data.nickname,
            isAuthenticated: true,
            token: data.token,
          });
          // console.log(data.nickname);
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
      setTokenFromRequestHeader: requestHeaders => {
        const token = requestHeaders.get('access');
        if (token) {
          set({ token });
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          console.error('Token not found in request headers');
        }
      },
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
