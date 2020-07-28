const axios = require('axios');

export const apiPaymentInfo = (courseId, token) => {
  const url = 'https://api.itedu.me/payment/get-course-info/' + courseId;

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get(url, config)
}

export const paymentFreeCourse = (courseId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.post('https://api.itedu.me/payment/get-free-courses', {courseId: courseId}, config)
}

