const axios = require('axios');

export const checkEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email)
}

export const checkName = (name) => {
  let reg=/^[a-zA-Z ]+$/;
  return reg.test(name)
}

export const checkPhone = (phone) => {
  let reg = /^[0-9]$/;
  return reg.test(phone)
}

export const apiLogin = async (email, password) => {
  return await axios.post('https://api.itedu.me/user/login', {
    "email": email,
    "password": password
  })
}

export const apiRegister = (username, email, phone, password) => {
  const body = {
    name: username,
    email: email,
    phone: phone,
    password: password
  }
  return axios.post('https://api.itedu.me/user/register', body)
}

export const apiForgotPassword = (email) => {
  const body = {
    email: email,
  }
  return axios.post('https://api.itedu.me/user/forget-pass/send-email', body)
}

// export const forgetPassword = (email) => {
//   if (checkEmail(email) === false) return {status: 404, errorString: "Email is Not Correct!"};
//   return {status: 200, message: `Check your email.\nWe just sent an email to you with a link to reset your password!`};
// }