import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import styles from './SignIn.module.css';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async data => {
    try {
      const success = await login(data.username, data.password);
      if (!success) {
        setError('username', {
          type: 'manual',
          message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.',
        });
        setError('password', {
          type: 'manual',
          message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('username', {
        type: 'manual',
        message: '로그인 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h1 className={styles.quizlyTitle}>Quizly</h1>
      <div className={styles.quizTypeCard}>
        <h2 className={styles.quizTypeTitle}>로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="사용자 이름을 입력하세요."
            {...register('username', {
              required: '사용자 이름을 입력해주세요.',
            })}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 4,
                message: '비밀번호는 최소 4자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>
        <button
          onClick={() => navigate('/signup')}
          className={`${styles.button} ${styles.secondaryButton}`}
        >
          회원가입
        </button>
        <div className={styles.cardDecoration}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>
    </div>
  );
};

export default SignIn;
