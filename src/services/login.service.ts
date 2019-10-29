export function isUsernameValid(username: string): boolean {
  return username.indexOf("@") > -1;
}

export function isEmpty(param: string): boolean {
  return !param;
}

export function isPasswordLessThan5(password: string): boolean {
  return password.length < 5;
}
