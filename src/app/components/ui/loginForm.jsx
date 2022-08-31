import React, { useState, useEffect } from "react";

import * as yup from "yup";

// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";

const loginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required("Поле password обязательно для заполнения")
      .matches(
        /(?=.*[A-Z])/,
        "Пароль должнен содержать хотя бы одну заглавную букву"
      )
      .matches(/(?=.*[0-9])/, "Пароль должнен содержать хотя бы одно число")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать один из специальных символов !@#$%^&*"
      )
      .matches(/(?=.{8,})/, "Пароль должнен состоять минимум из 8 символов"),
    email: yup
      .string()
      .required("Поле email обязательно для заполнения")
      .email("Email введён не корректно")
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: {
  //       message: "Поле email обязательно для заполнения"
  //     },
  //     isEmail: {
  //       message: "Email введён не корректно"
  //     }
  //   },
  //   password: {
  //     isRequired: {
  //       message: "Поле password обязательно для заполнения"
  //     },
  //     isCapitalSymbol: {
  //       message: "Пароль должнен содержать хотя бы одну заглавную букву"
  //     },
  //     isContainDigit: {
  //       message: "Пароль должнен содержать хотя бы одно число"
  //     },
  //     min: {
  //       message: "Пароль должнен состоять минимум из 8 символов",
  //       value: 8
  //     }
  //   }
  // };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    // setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log("dataLogin.jsx", data);
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
