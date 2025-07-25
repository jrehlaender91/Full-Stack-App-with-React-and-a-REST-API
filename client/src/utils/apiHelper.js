export const api = (
  path,
  method = "GET",
  body = null,
  credentials = null
) => {
  const url = "https://full-stack-app-with-react-and-a-rest-api-production.up.railway.app/api" + path;

  const options = {
    method,
    headers: {}
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  if (credentials) {
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers.Authorization = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
} 