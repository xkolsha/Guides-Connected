const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Secret key for JWT signing and encryption
// In production, use a more secure way of storing the secret, like environment variables
const secret = crypto.randomBytes(32).toString("hex");
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // Decode and attach user data to the request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      throw new AuthenticationError("Invalid token");
    }

    return req;
  },

  signToken: function ({ name, _id }) {
    const payload = { name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
