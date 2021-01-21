const conf = {
  development: {
    baseUrl: "http://127.0.0.1:1234",
    SERVICE_URI: "http://127.0.0.1:1234/api",
  },
  production: {
    baseUrl: "http://127.0.0.1:1234",
    SERVICE_URI: "http://127.0.0.1:1234/api",
  },
};

// developemnt
// production
export default conf[process.env.NODE_ENV];
