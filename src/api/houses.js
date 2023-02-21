import { APISettings } from "./config";
import axios from "axios";

export default {
  index() {
    console.log(APISettings);
    return axios.get(APISettings.baseURL + "houses", {
      headers: APISettings.headers,
    });
  },

  create(params) {
    console.log(APISettings);
    return axios.post(APISettings.baseURL + "houses", params, {
      headers: APISettings.headers,
    });
  },

  delete(keyDel) {
    console.log(APISettings);
    return axios.delete(APISettings.baseURL + "houses/" + keyDel, {
      headers: APISettings.headers,
    });
  },

  edit(keyEdit, params) {
    console.log(APISettings);
    return axios.post(APISettings.baseURL + "houses/" + keyEdit, params, {
      headers: APISettings.headers,
    });
  },

  foto(keyPhoto, imagem) {
    console.log(APISettings);
    let formData = new FormData();
    formData.append("image", imagem);
    return axios.post(
      APISettings.baseURL + "houses/" + keyPhoto + "/upload",
      formData,
      {
        headers: APISettings.headers,
      }
    );
  },
};
