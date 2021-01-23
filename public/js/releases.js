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
    if (res.data.status === 'success') {
      showAlert('success', 'New Release Saved!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const editRelease = async () => {
  console.log('Starting Edit Release');
  //   try {
  //     console.log('Edit Movie - OK');
  //   } catch (err) {
  //     // showAlert('error', err.response.data.message);
  //     console.log('Edit Movie - Error');
  //   }
};
