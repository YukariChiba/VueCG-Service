const cron = require("node-cron");

const sseChannels = require("../utils/sse");
const { sseKeepAlive } = require("../utils/msg_sse");

function initKeepAlive() {
  cron.schedule("*/15 * * * * *", function () {
    Object.keys(sseChannels).forEach((k) => {
      sseKeepAlive(sseChannels[k]);
    });
  });
}

module.exports = {
  initKeepAlive,
};
