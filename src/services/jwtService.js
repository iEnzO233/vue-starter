const ID_TOKEN_KEY = "id_token";

/**
 * @description get token from localStorage
 */
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token
 */
export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token from localStorage
 */
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
