import React from 'react';
import styles from './Button.module.css';

/**
 * 다양한 스타일과 기능을 제공하는 재사용 가능한 버튼 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 버튼 안에 표시할 내용
 * @param {'primary' | 'secondary' | 'danger'} [props.color='primary'] - 버튼의 색상
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - 버튼의 크기
 * @param {boolean} [props.disabled=false] - 버튼 비활성화 여부
 * @param {boolean} [props.wide=false] - 버튼의 너비를 최대로 설정
 * @param {boolean} [props.round=false] - 버튼의 모서리를 둥글게 설정
 *
 * @example
 * // 기본 사용
 * <Button>Click me</Button>
 *
 * @example
 * // 커스텀 스타일 적용
 * <Button color="secondary" size="large" wide round>
 *   Submit
 * </Button>
 *
 * @returns {React.ReactElement} Button 컴포넌트
 */
const Button = ({
  children,
  color = 'primary',
  size = 'medium',
  disabled = false,
  wide = false,
  round = false,
  ...props
}) => {
  const className = `${styles.button} ${styles[color]} ${styles[size]} 
    ${disabled ? styles.disabled : ''} 
    ${wide ? styles.wide : ''} 
    ${round ? styles.round : ''} alignCenter`.trim();

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
