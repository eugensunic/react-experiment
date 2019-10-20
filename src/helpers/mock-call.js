export const mockLoginRequest = (url, options) => {
  return fetch(url, options).then(res => (res.ok ? res.json() : undefined));
};
