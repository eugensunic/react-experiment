export function isUsernameValid(username) {
  return username.indexOf("@") > -1;
}

export function isEmpty(param) {
  return !param;
}

export function isPasswordLessThan5(password) {
  return password.length < 5;
}
