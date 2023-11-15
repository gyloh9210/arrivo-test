const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 60000,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  billplz: {
    secret: process.env.BILLPLZ_SECRET,
    api: process.env.BILLPLZ_API,
    callback: process.env.BILLPLZ_CALLBACK,
  },
};
module.exports = config;
