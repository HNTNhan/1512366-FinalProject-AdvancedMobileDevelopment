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