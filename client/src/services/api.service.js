import Cookies from "js-cookie";

const domain = "http://localhost:5555";

export async function sign_in(formData) {
  const url = `${domain}/login`;
  const _headers = { "Content-Type": "application/json" };
  const body = { body: JSON.stringify(formData) };

  return await call_private_api(url, "POST", _headers, body);
}

export async function sign_out() {
  const url = `${domain}/logout`;

  return await call_private_api(url, "DELETE");
}

export async function check_session() {
  const url = `${domain}/check_session`;

  return await call_private_api(url, "GET");
}

export async function get_subscriptions(userId) {
  const url = `${domain}/subscriptions/${userId}`;

  return await call_private_api(url, "GET");
}

export async function get_services() {
  const url = `${domain}/services`;

  return await call_private_api(url, "GET");
}

export async function get_transactions(userID) {
  const url = `${domain}/transactions/${userID}`;

  return await call_private_api(url, "GET");
}

export async function post_new_user(formData) {
  const url = `${domain}/users`;
  const _headers = { "Content-Type": "application/json" };
  const body = { body: JSON.stringify(formData) };

  return await call_public_api(url, "POST", _headers, body);
}

export async function add_sub_to_profile(userId, serviceId) {
  const url = `${domain}/subscription/${userId}`;
  const _headers = { "Content-Type": "application/json" };
  const body = { service_id: serviceId };

  return await call_private_api(url, "POST", _headers, {
    body: JSON.stringify(body),
  });
}

export async function get_escrow_account(userId) {
  const url = `${domain}/escrow/${userId}`;
  return await call_private_api(url, "GET");
}

export async function patch_escrow_account(userId, amount) {
  const url = `${domain}/escrow/${userId}`;
  const _headers = { "Content-Type": "application/json" };
  const body = { balance: amount };
  return await call_private_api(url, "PATCH", _headers, {
    body: JSON.stringify(body),
  });
}

export function delete_cookie(name) {
  Cookies.remove(name);
}

async function call_public_api(url, method, extra_headers, extras) {
  const opts = {
    headers: {
      "Access-Control-Allow-Credentials": true,
      ...extra_headers,
    },
    method,
    ...extras,
  };

  return await call_api(url, opts);
}

async function call_private_api(url, method, extra_headers, extras) {
  const opts = {
    headers: {
      "Access-Control-Allow-Credentials": true,
      ...extra_headers,
    },
    method,
    credentials: "include",
    ...extras,
  };

  return await call_api(url, opts);
}

async function call_api(url, opts) {
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
