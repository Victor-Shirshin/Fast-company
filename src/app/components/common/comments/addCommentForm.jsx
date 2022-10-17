import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
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

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <TextAreaField
            label="Сообщение"
            name="content"
            value={data.content || ""}
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
