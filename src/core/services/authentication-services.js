export const login = (username, password) => {
  if(username === 'admin') {
    if(password === '123456') {
      return {status: 200, user: {username, token: 'abc'}}
    } else {
      return {status: 404, errorString: 'Username & password wrong!'}
    }

  }
  return {status: 404, errorString: 'Username is not existed!'}
}

export  const forgetPassword = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) return {status: 404, errorString: "Email is Not Correct!"};
  return {status: 200, message: `Check your email.\nWe just sent an email to you with a link to reset your password!`};
}