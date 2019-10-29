export const mockLoginRequest = (url: string, options?: any): Promise<any> => {
  return fetch(url, options).then(res => (res.ok ? res.json() : undefined));
};
