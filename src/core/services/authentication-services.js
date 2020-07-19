import {Alert} from "react-native";

const axios = require('axios');

export const checkEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email)
}

export const checkName = (name) => {
  let reg=/^[a-zA-Z ]+$/;
  if (name === null || name === undefined) return name;
  name = name.toLowerCase();
  name = name.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  name = name.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  name = name.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  name = name.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  name = name.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  name = name.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  name = name.replace(/đ/g, "d");
  return reg.test(name)
}

export const checkPhone = (phone) => {
  let reg = /^[0-9]+$/;
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

export const apiUpdateProfile = (token, profile) => {
  const body = {
    name: profile.name,
    avatar: profile.avatar,
    phone: profile.phone,
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  return axios.put('https://api.itedu.me/user/update-profile', body, config)
}

export const apiChangeEmail = (token, email) => {
  const body = {
    newEmail: email
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  return axios.put('https://api.itedu.me/user/change-user-email', body, config)
}

export const apiChangePassword = (token, id, password) => {
  const body = {
    id: id,
    oldPass: password.currentPassword,
    newPass: password.newPassword
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  return axios.post('https://api.itedu.me/user/change-password', body, config)
}