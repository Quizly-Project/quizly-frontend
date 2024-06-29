import React from 'react';
import styles from './InputField.module.css';

/**
 * InputField 컴포넌트는 다양한 입력 필드를 생성합니다.
 *
 * @param {Object} props
 * @param {string} props.label - 입력 필드의 레이블
 * @param {string} props.name - 입력 필드의 이름
 * @param {string} props.type - 입력 필드의 타입 ('text', 'email', 'password', 'textarea' 등)
 * @param {Function} props.register - react-hook-form의 register 함수
 * @param {Object} props.errors - react-hook-form의 errors 객체
 * @param {string} props.placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - 입력 필드의 크기
 * @param {boolean} [props.round=false] - 입력 필드의 모서리를 둥글게 만들지 여부
 * @param {Object} props.rest - 추가적인 props
 */
const InputField = ({
  label,
  name,
  type = 'text',
  className,
  register,
  errors,
  placeholder,
  size = 'medium',
  round = false,
  ...rest
}) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';

  const sizeClass = size
    ? `${Component}${size.charAt(0).toUpperCase() + size.slice(1)}`
    : '';

  const inputClassName =
    `${className} ${type === 'textarea' ? styles.textarea : styles.inputField} ${styles[sizeClass]} ${round ? styles.round : ''}`.trim();

  return (
    <>
      {errors[name] && (
        <p className={`${styles.errorMessage} center`} role="alert">
          {errors[name].message}
        </p>
      )}
      <div className={`${styles.inputContainer} alignCenter`}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}

        <Component
          id={name}
          name={name}
          type={type !== 'textarea' ? type : undefined}
          placeholder={placeholder}
          className={inputClassName}
          aria-invalid={errors[name] ? 'true' : 'false'}
          {...register(name, { ...rest })}
        />
      </div>
    </>
  );
};

export default InputField;
