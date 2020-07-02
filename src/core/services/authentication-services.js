const axios = require('axios');

export const login = async (email, password) => {
  let res = await axios.post('https://api.itedu.me/user/login', {"email": email, "password": password})
    .then(res => {
      return {status: 200, userInfo: res.data.userInfo, token: res.data.token}
    })
    .catch(err => {
      return {status: 400, errorString: 'Username & password wrong!'}
    })
  return res
}

export const forgetPassword = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) return {status: 404, errorString: "Email is Not Correct!"};
  return {status: 200, message: `Check your email.\nWe just sent an email to you with a link to reset your password!`};
}