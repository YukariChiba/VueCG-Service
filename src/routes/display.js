const express = require("express");
const router = express.Router();

var SSE = require("better-sse");

const sseChannels = require("../utils/sse");
const { getSceneAttrs } = require("../utils/data");

router.get("/sse/:scene", async (req, res) => {
  if (!req.params.scene) return;
  const session = await SSE.createSession(req, res);
  sseChannels[req.params.scene] = SSE.createChannel();
  sseChannels[req.params.scene].register(session);
  session.push({ type: "apply", attrs: getSceneAttrs(req.params.scene) });
});

module.exports = router;
