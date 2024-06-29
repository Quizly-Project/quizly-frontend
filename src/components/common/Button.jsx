import React from 'react';
import styles from './Button.module.css';

/*
 * Button 컴포넌트는 다음과 같은 기능을 제공합니다.
 * 1. children: 버튼 안에 표시할 내용을 입력합니다.
 * 2. color: 버튼의 색상을 설정합니다. 기본값은 'primary'입니다.
 * 3. size: 버튼의 크기를 설정합니다. 기본값은 'medium'입니다.
 * 4. disabled: 버튼을 비활성화 상태로 만듭니다. 기본값은 false입니다.
 * 5. wide: 버튼의 너비를 최대로 설정합니다. 기본값은 false입니다.
 * 6. round: 버튼의 모서리를 둥글게 만듭니다. 기본값은 false입니다.
 * 7. ...props: 기타 버튼 요소에 추가할 속성을 설정합니다.
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
  const className = `${styles.button} ${styles[color]} ${styles[size]} ${disabled ? styles.disabled : ''} ${wide ? styles.wide : ''} ${round ? styles.round : ''}`;
  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
