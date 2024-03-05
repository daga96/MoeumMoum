import sendRequest from "../utils/request";

export function addUser(params) {
  return sendRequest({
    url: `/addUser`,
    method: "post",
    data: params,
  });
}

export function addFormants(params) {
  return sendRequest({
    url: `/addFormants`,
    method: "post",
    data: params,
  });
}

export function getFormants(params) {
  return sendRequest({
    url: `/getFormants`,
    method: "post",
    data: params,
  });
}

export function getFormantsLanguage(params) {
  return sendRequest({
    url: `/getFormantsLang`,
    method: "post",
    data: params,
  });
}
