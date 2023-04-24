var cors = require("cors");

const corsConfig = {
  origin: (origin, callback) => {
    callback(null, true);
  },
};

module.exports = cors(corsConfig);
