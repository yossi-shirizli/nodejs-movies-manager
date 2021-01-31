/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addMovie = async data => {
  try {
    let filtered = Object.keys(data)
      .filter(k => data[k] != null)
      .reduce((a, k) => ({ ...a, [k]: data[k] }), {});

    const res = await axios({
      method: 'POST',
      url: '/api/v1/movies',
      data: filtered
    });

    // if Ok, reload homepage after 1.5sec
    if (res.data.status === 'success') {
      showAlert('success', 'New Movie Saved!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const editMovie = async (data, id) => {
  //api/v1/movies/5f95c6644c701c06e8de95a1
  try {
    // console.log(data);
    // console.log(id);
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/movies/${id}`,
      data
    });
    // console.log(data);
    // if Ok, reload homepage after 1.5sec
    // console.log(res.data);
    if (res.data.status === 'success' || res.data.status === 'succes') {
      showAlert('success', 'Updated Movie Data!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
