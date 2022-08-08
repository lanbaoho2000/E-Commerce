const jwt = require("../utils/jwt");

const { createJWT, isTokenValid, attachCookiesToResponse } = jwt;

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
