import axios from "axios";
import { toast } from "react-toastify";

import { httpAuth } from "../components/hooks/useAuth";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";

// Памятка. Переиспользуемый паттерн http.service.js вынесли чтобы не писать эту логику в каждом компоненте. И преимущество выноса http.servece как отдельного компонента в том что открывается возможность трансформации данных и работа как с данными в виде объектов так и массивов при этом не правя весь код проекте.
// axios.defaults.baseURL = configFile.apiEndpoint;

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const data = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });
        // console.log("data in http.service.js", data);
        localStorageService.setTokens({
          refreshToken: data.refresh_token, idToken: data.id_token, expiresIn: data.experes_in, localId: data.user_id
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id ? Object.keys(data).map(key => ({
    ...data[key]
  })) : data;
};

http.interceptors.response.use(
  (response) => {
    if (configFile.isFireBase) {
      response.data = { content: transformData(response.data) };
    };
    return response;
  },

  function (error) {
    // interceptors он всегда срабатывает до основного запроса
    // поэтому этот erorr отработает первым
    // отрабатываем неожидаемые ошибки >= 400 && < 500
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Something was wrong. Try it later");
    }
    // чтобы работа promise продолжилась
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};

export default httpService;