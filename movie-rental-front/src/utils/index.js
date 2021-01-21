import jwtDecode from "jwt-decode";

export const Cookie = {
  create(cookieName, cookieValue, expirationDays = 7, path = "/") {
    let d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue}; expires=${d.toUTCString()}; path=${path}}`;
  },
  read(cookieName) {
    let name = cookieName + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
};

export const Data = {
  create(key, data) {
    if (!Data.__keyExists(key)) Data._set(key, data);
    else console.error(`${key} is existing. Try update method.`);
  },
  update(key, data) {
    if (!Data.__keyExists(key)) Data.set(key, data);
    else console.error(`${key}bdoes not exist. Try to create method first.`);
  },
  read(key) {
    if (localStorage.getItem(key) !== null) {
      let raw = localStorage.getItem(key);
      let parsed = key === "token" ? raw : JSON.parse(raw);
      if (
        raw !== null &&
        typeof parsed === "object" &&
        parsed.hasOwnProperty("symbol")
      ) {
        return parsed.data;
      }
      return parsed;
    } else {
      console.error(`${key} not found.`);
      return null;
    }
  },
  delete(key) {
    if (Data.__keyExists(key)) Data.__remove(key);
    else console.warn(`${key} does not exist. Try to create first.`);
  },
  _set(key, data) {
    let stringData;
    switch (typeof data) {
      case "object":
        stringData = JSON.stringify(data);
        break;
      case "undefined":
        stringData = "";
        break;
      case "symbol":
        stringData = JSON.stringify({ symbol: true, data: data.description });
        break;
      default:
        stringData = `${data}`;
        break;
    }
    localStorage.setItem(key, stringData);
  },
  __keyExists(key) {
    return localStorage.getItem(key) !== null;
  },
  __remove(key) {
    localStorage.removeItem(key);
  },
  __clear() {
    localStorage.clear();
  },
};

export function checkTokenNotExpired(token) {
  return jwtDecode(token).exp > (new Date().getTime() + 1) / 1000;
}
