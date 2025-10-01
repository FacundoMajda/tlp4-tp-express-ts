import "dotenv/config";

export const environment = {
  server: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.PORT || "3000"),
  },

  jwt: {
    secret: process.env.JWT_SECRET || "super-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },

  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    dbname: process.env.DB_NAME || "tlp4",
  },
};
