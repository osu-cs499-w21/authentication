import { serialize } from 'cookie';

import USER from '../data/user';

const TOKEN = "abcd1234";
const AUTH_COOKIE_NAME = "auth";

export const generateAuthToken = (username) => {
  return TOKEN;
};

const authTokenIsValid = (token) => {
  return token === TOKEN;
};

export const credentialsAreValid = (username, password) => {
  return username === USER.username && password === USER.password;
}

export const setAuthCookie = (res, token) => {
  res.setHeader("Set-Cookie", serialize(AUTH_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
    sameSite: true
    // secure: true
  }));
}

export const requireAuth = handler => (req, res) => {
  if (authTokenIsValid(req.cookies[AUTH_COOKIE_NAME])) {
    handler(req, res);
  } else {
    res.status(401).json({ err: "Unauthorized" });
  }
}
