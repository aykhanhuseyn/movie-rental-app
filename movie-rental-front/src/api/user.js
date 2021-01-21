import { message as msg } from "antd";

const SERVICE_URI = process.env.REACT_APP_SERVICE_URI;
const headers = { "Content-Type": "application/json" };

export function register(values) {
  const method = "POST",
    body = JSON.stringify(values);
  fetch(`${SERVICE_URI}/register`, { headers, method, body })
    .then((data) => data.json())
    .then((json) => {
      json.message && msg.error(json.message);
      return json;
    });
}

export function login(values) {
  const method = "POST",
    body = JSON.stringify(values);

  return fetch(`${SERVICE_URI}/login`, { headers, method, body })
    .then((data) => data.json())
    .then((json) => {
      const { message } = json;
      if (message) {
        msg.error(message);
      }

      return json;
    });
}
