import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import api from "../../../api";
import { validator } from "../../../utils/validator";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserPageEditor = ({ userId }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    qualities: [],
    sex: "male"
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isValid = Object.keys(errors).length === 0;
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...rest }) =>
      setData((prevState) => ({
        ...prevState,
        ...rest,
        profession: profession._id,
        qualities: transformData(qualities)
      }))
    );
    api.professions.fetchAll().then((data) => {
      const professionsList = transformData(data);
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = transformData(data);
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const transformData = (data) => {
    const arr = Array.isArray(data) ? data : Object.values(data);
    console.log("arr", arr);
    return arr.map((item) => {
      const { name: label, _id: value, ...rest } = item;
      return { label, value, ...rest };
    });
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
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
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4 shadow">
          {!isLoading && Object.keys(professions).length > 0 ? (
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
                  options={professions}
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
                  options={qualities}
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