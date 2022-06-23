import dotenv from "dotenv";

/**
 * This file combines the environment variables from the .env file and puts it into a more accessible reusable object.
 */

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@kycfracer.rrrpo.mongodb.net/?retryWrites=true&w=majority`;

const JWKS_URI = process.env.JWKS_URI;
const AUDIENCE = process.env.AUDIENCE;
const ISSUER = process.env.ISSUER;

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

if (!JWKS_URI || !AUDIENCE || !ISSUER) {
  throw new Error("Missing environment variables");
}

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  auth: {
    jwt: JWKS_URI,
    audience: AUDIENCE,
    issuer: ISSUER,
  },
};
