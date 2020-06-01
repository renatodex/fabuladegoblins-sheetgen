// Thanks to this -> https://gist.github.com/rendro/525bbbf85e84fa9042c2
import cookie from 'js-cookie'

export default function (cookie) {
  return cookie
  .split(';')
  .reduce((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent)
    const allNumbers = str => /^\d+$/.test(str);
    try {
      return Object.assign(res, { [key]: allNumbers(val) ?  val : JSON.parse(val) })
    } catch (e) {
      return Object.assign(res, { [key]: val })
    }
  }, {});
}

const getCookieFromBrowser = key => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

export function setCookie (key, value) {
  if (process.browser) {
    cookie.set(key, value, { expires: 1, path: "/" });
  }
}

export function getCookie (key, req) {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};
