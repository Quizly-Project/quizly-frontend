import React from 'react';
import styles from './InputField.module.css';

const InputField = React.forwardRef(
  (
    {
      className,
      label,
      name,
      type,
      placeholder,
      error,
      round,
      sizeClass,
      register,
      ...rest
    },
    ref
  ) => {
    const Component = type === 'textarea' ? 'textarea' : 'input';
    const inputClassName =
      `${className} ${type === 'textarea' ? styles.textarea : styles.inputField} ${styles[sizeClass]} ${round ? styles.round : ''}`.trim();

    return (
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
          aria-invalid={error ? 'true' : 'false'}
          ref={ref}
          {...rest} // 'register' 속성이 여기에 포함되지 않도록 앞서 제외했습니다.
        />

        {error && (
          <p className={`${styles.errorMessage} center`} role="alert">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
