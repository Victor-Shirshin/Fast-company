import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import API from "../../../api";

import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ userId: "", content: "" });
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.users.fetchAll().then(setUsers);
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Поле обязательно для заполнения"
      }
    },
    content: {
      isRequired: {
        message: "Поле обязательно для заполнения"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    setData({ userId: "", content: "" });
    setErrors({});
  };

  const arrayOfUsers =
    users &&
    Object.keys(users).map((item) => ({
      label: users[item].name,
      value: users[item]._id
    }));

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Комментарий"
          onChange={handleChange}
          options={arrayOfUsers}
          defaultOptions="Выберите пользователя"
          name="userId"
          value={data.userId}
          error={errors.userId}
        />
        <div className="mb-2">
          <TextAreaField
            label="Сообщение"
            name="content"
            value={data.content}
            onChange={handleChange}
            error={errors.content}
          />
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Опубликовать
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
