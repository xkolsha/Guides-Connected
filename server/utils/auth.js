const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Set the secret to a random 32 byte hex string Purpose: to seed the database with expert data
const secret = crypto.randomBytes(32).toString("hex");
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization; // Allow token to be sent via req.body, req.query, or headers

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If no token, return request object as is
    if (!token) {
      return req;
    }

    // Otherwise, decode and attach user data to request object
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      throw new AuthenticationError("Invalid token"); //
    }

    return req;
  },

  // Function for our authenticated routes
  signToken: function ({ name, _id }) {
    // Accepts a user object and returns a token
    const payload = { name, _id }; // Create token with user data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // Return signed and encrypted token
  },
};
