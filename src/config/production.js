module.exports = {
  env: "production",
  db: {
    host: process.env.DBURI,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD
  },
  port: process.env.PORT,
  loglevel: process.env.LOGLEVEL,
  jwtsecret: process.env.JWTSECRET,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};
