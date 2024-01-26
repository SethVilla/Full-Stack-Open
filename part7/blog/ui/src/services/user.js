import axios from 'axios';
import {getToken} from '../utils/util.js';

export const getAllUsers = async () => {
  try {
    const res = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    res.data.success = true;
    return res.data;
  } catch (e) {
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};
