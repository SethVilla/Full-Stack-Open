import axios from 'axios';
import {getToken} from '../utils/util.js';
const baseUrl = '/api/blog';

export const getAll = () => {
  try {
    const request = axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return request.then(response => response.data);
  } catch (e) {
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};

export const addBlog = async blog => {
  try {
    const request = await axios.post(
      baseUrl,
      {
        blog,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    request.data.success = true;
    return request.data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};

export const onLike = async ({id, likes}) => {
  try {
    const request = await axios.patch(
      `${baseUrl + '/' + id}`,
      {
        blog: {likes},
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    request.data.success = true;
    return request.data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};

export const onRemove = async id => {
  console.log(getToken());
  try {
    const request = await axios.delete(`${baseUrl + '/' + id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    request.data.success = true;
    return request.data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e.response.data.error,
    };
  }
};
