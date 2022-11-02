import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { validator } from "../../../utils/validator";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backHistoryButton";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesStatus } from "../../../store/qualities";
import { getProfessions } from "../../../store/professions";

const UserPageEditor = () => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const professionLoading = useSelector(getQualitiesStatus());
  const professions = useSelector(getProfessions());
  const professionsList = professions.map((pofession) => ({
    label: pofession.name,
    value: pofession._id
  }));
  const { currentUser, createUser } = useAuth();
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesStatus());
  const qualitiesList = qualities.map((quality) => ({
    value: quality._id,
    label: quality.name,
    color: quality.color
  }));
  const isValid = Object.keys(errors).length === 0;
  const history = useHistory();

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    validate();
  }, [data]);

  function getQualitiesListById(qualitiesId) {
    const qualitiesArray = [];
    for (const qualId of qualitiesId) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  const transformData = (data) => {
    const result = getQualitiesListById(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
    return result;
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Поле имени обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Поле email обязательно для заполнения"
      },
      isEmail: {
        message: "Email введён не корректно"
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const userEdit = {
      ...data,
      qualities: data.qualities.map((item) => item.value)
    };

    try {
      await createUser(userEdit);
      history.push(`/users/${currentUser._id}`);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4 shadow">
          {!isLoading ? (
            <form onSubmit={handleSubmit}>
              <div className="col mb-4">
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Выбери свою профессию"
                  onChange={handleChange}
                  options={professionsList}
                  defaultOptions="Choose..."
                  name="profession"
                  value={data.profession}
                  error={errors.profession}
                />
                <RadioField
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                  ]}
                  value={data.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Выберите ваш пол"
                />
                <MultiSelectField
                  options={qualitiesList}
                  onChange={handleChange}
                  defaultValue={data.qualities}
                  name="qualities"
                  label="Выберите ваши качества"
                />
                <button
                  className="btn btn-primary w-100 mx-auto"
                  type="submit"
                  disabled={!isValid}
                >
                  Обновить изменённые данные пользователя
                </button>
              </div>
            </form>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </div>
  );
};

UserPageEditor.propTypes = {
  userId: PropTypes.string
};

export default UserPageEditor;
