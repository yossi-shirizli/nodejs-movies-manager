/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addRelease = async data => {
  try {
    let filtered = Object.keys(data)
      .filter(k => data[k] != null)
      .reduce((a, k) => ({ ...a, [k]: data[k] }), {});

    const res = await axios({
      method: 'POST',
      url: '/api/v1/releases',
      data: filtered
    });

    // if Ok, reload homepage after 1.5sec
    // if (res.data.status === 'success') {
    if (res.status === 201) {
      showAlert('success', 'New Release Saved!');
      window.setTimeout(() => {
        // location.assign('/');
        history.back();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const editRelease = async (data, id) => {
  // {{URL}}api/v1/releases/5f9da336f9854d043e6ea509
  // console.log('Edit Release Id ', id);
  // console.log(data);
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/releases/${id}`,
      data
    });
    // console.log('Edit Movie - OK');
    // if (res.data.status === 'success' || res.data.status === 'succes') {
    if (res.status === 200) {
      showAlert('success', 'Updated Release Data!');
      window.setTimeout(() => {
        history.back();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    // console.log('Edit Movie - Error');
  }
};

export const deleteRelease = async id => {
  // {{URL}}api/v1/releases/5f9da336f9854d043e6ea509

  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/releases/${id}`
    });
    if (res.status === 204) {
      showAlert('success', 'Release Deleted!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
