import axios from 'axios';
import useAuthStore from '../store/authStore';

// const baseURL = process.env.REACT_APP_API_URL || 'http://192.168.0.98:8080';
const baseURL = 'http://192.168.0.111:8080';

const api = axios.create({
  baseURL: baseURL,
  // timeout: 5000, // 5초 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    // 응답 데이터 처리
    return response;
  },
  error => {
    // 응답 에러 처리
    if (error.response) {
      if (error.response.status === 401) {
        useAuthStore.getState().logout();
      }
      // 서버 응답이 2xx 범위를 벗어난 상태 코드를 반환한 경우
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error('Request error:', error.request);
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const createQuiz = async quizData => {
  try {
    const response = await api.post('/quizgroup', quizData);
    return response.data;
  } catch (error) {
    console.error('퀴즈 생성 중 오류 발생:', error);
    throw error;
  }
};

export const getQuizzes = async () => {
  try {
    const response = await api.get(`/quizgroup/list`);
    return response.data;
  } catch (error) {
    console.error('퀴즈 조회 중 오류 발생:', error);
    throw error;
  }
};

export default api;
