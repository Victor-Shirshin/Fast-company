import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

// Преимущество выноса http.servece как отдельного компанента в том что открывается возможность трансформации данных и работа как сданными в виде объектов так и массивов при этом не меняя весь код написанный ранее.
axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data ? Object.keys(data).map(key => ({
    ...data[key]
  })) : [];
};

axios.interceptors.response.use(
  (response) => {
    if (configFile.isFireBase) {
      response.data = { content: transformData(response.data) };
    };
    console.log("response.data", response.data);
    return response;
  },

  function (error) {
    // отрабатываем неожидаемые ошибки >= 400 && < 500
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Something was wrong. Try it later");
    }
    // чтобы работа promise продолжилась
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;