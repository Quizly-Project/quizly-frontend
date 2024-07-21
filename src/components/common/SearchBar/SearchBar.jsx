import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './SearchBar.module.css';
import stylesInput from '../../common/InputField/InputField.module.css';
import InputField from '../InputField/InputField.jsx';

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data.target.value);
  };

  return (
    <form className={stylesInput.purpleSearchContainer} onChange={onSubmit}>
      <InputField
        name="search"
        type="text"
        placeholder="검색"
        className={stylesInput.purpleSearch}
        register={register}
        errors={errors}
        round={true}
      />
    </form>
  );
};

export default SearchBar;
