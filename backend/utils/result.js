const httpStatus = require("http-status");

const util = require("./common");

function json(res, data, code = httpStatus.OK, message = null) {
  res.type("json").status(code).json({ code, message, data });
}

function success(res, data = null, message = null) {
  json(res, data, httpStatus.OK, message);
}

function error(res, code, message = null) {
  const err = util.isEmpty(code)
    ? { code: httpStatus.INTERNAL_SERVER_ERROR, message: "Unknown error" }
    : { code: code, message: message };
  json(res, "", err.code, message || err.message);
}

module.exports = {
  json,
  success,
  error,
};
