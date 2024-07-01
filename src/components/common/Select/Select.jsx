import React from 'react';
import styles from './Select.module.css';

const Select = React.forwardRef(
  ({ id, label, options, error, ...rest }, ref) => {
    return (
      <div className={styles.selectWrapper}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <select id={id} className={styles.customSelect} ref={ref} {...rest}>
          <option value="" disabled>
            선택하세요
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className={styles.errorMessage}>{error.message}</p>}
      </div>
    );
  }
);

export default Select;
