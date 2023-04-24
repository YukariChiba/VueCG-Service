require("dotenv").config();

let config = {
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || "127.0.0.1",
};

fromenv = [];

fromenv.forEach((enval) => {
  if (process.env[enval]) config[enval] = process.env[enval];
  else {
    console.log(`Error: ${enval} is not defined in .env`);
    process.exit(1);
  }
});

module.exports = config;
