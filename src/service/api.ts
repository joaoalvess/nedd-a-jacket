import axios from 'axios';

import {REACT_APP_API_KEY, REACT_APP_API_URL} from 'react-native-dotenv';
import {LANG, UNITS, EXCLUDE} from '../constants';

const api = axios.create({
  baseURL: `${REACT_APP_API_URL}`,
});

api.interceptors.request.use(config => {
  config.url = `${config.url}&appid=${REACT_APP_API_KEY}&exclude=${EXCLUDE}&lang=${LANG}&units=${UNITS}`;

  return config;
});

export default api;
