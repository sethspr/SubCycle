const domain = "http://localhost:5555";

export async function sign_in(formData) {
  const url = `${domain}/login`;
  const _headers = { "Content-Type": "application/json" };
  const body = { body: JSON.stringify(formData) };

  return await call_api(url, "POST", _headers, body);
}

export async function sign_out() {
  const url = `${domain}/logout`;

  return await call_api(url, "DELETE");
}

export async function check_session() {
  const url = `${domain}/check_session`;

  return await call_api(url, "GET");
}

export async function get_subscriptions() {
  const url = `${domain}/subscriptions`;

  return await call_api(url, "GET");
}

export async function get_services() {
  const url = `${domain}/services`;

  return await call_api(url, "GET");
}

export async function get_transactions() {
  const url = `${domain}/transactions`;

  return await call_api(url, "GET");
}

export async function post_new_user(formData) {
  const url = `${domain}/users`;
  const _headers = { "Content-Type": "application/json" };
  const body = { body: JSON.stringify(formData) };

  return await call_api(url, "POST", _headers, body);
}

async function call_api(url, method, extra_headers, extras) {
  const opts = {
    headers: {
      "Access-Control-Allow-Credentials": true,
      ...extra_headers,
    },
    method,
    credentials: "include",
    ...extras,
  };

  return await fetch(url, opts)
    .then(async (response) => {
      const resp = await response.json();

      return {
        data: resp,
        ok: response.ok,
        status: response.status,
      };
    })
    .catch((error) => {
      console.error(`API call to ${url} failed:`, error);
      return {
        data: null,
        ok: false,
        status: error.status,
      };
    });
}
