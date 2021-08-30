import axios from 'axios';

import {API_URL, API_KEY} from 'react-native-dotenv';

const api = axios.create({
  baseURL: `${API_URL}?appid=${API_KEY}&`,
});

export default api;
