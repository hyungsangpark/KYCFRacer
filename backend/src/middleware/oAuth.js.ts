import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { config } from "../config/config";

/**
 * Useful JWT debugger https://jwt.io/#debugger-io for viewing the contents of a valid JWT token
 */

/**
 * This middleware is used to verify the JWT token sent by the client.
 * Official Auth0 docs: https://auth0.com/docs/quickstart/backend/nodejs/01-authorization
 */
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.auth.jwt,
  }),
  audience: config.auth.audience,
  issuer: config.auth.issuer,
  algorithms: ["RS256"],
});

export { checkJwt };
