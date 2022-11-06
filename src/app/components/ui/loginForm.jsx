import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { login } from "../../store/users";
// import { useAuth } from "../hooks/useAuth";

const loginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  // const { login } = useAuth();
  const dispatch = useDispatch();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Поле email обязательно для заполнения"
      },
      isEmail: {
        message: "Email введён не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Поле password обязательно для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должнен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должнен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должнен состоять минимум из 8 символов",
        value: 8
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: data, redirect }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        submit
      </button>
    </form>
  );
};

export default loginForm;
