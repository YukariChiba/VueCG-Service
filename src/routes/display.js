const express = require("express");
const router = express.Router();

var SSE = require("better-sse");

const sseChannels = require("../utils/sse");
const {
  getSceneAttrs,
  listScene,
  isExistScene,
} = require("../utils/data/scene");

const { sseApply, sseError } = require("../utils/msg_sse");

router.get("/scene", (req, res) => {
  res.json(listScene());
});

router.get("/sse/:scene", async (req, res) => {
  const session = await SSE.createSession(req, res);
  if (!req.params.scene) {
    sseError(session, "null_arg");
    return;
  }
  if (!isExistScene(req.params.scene)) {
    sseError(session, "invalid_scene");
    return;
  }
  sseChannels[req.params.scene] = SSE.createChannel();
  sseChannels[req.params.scene].register(session);
  sseApply(session, getSceneAttrs(req.params.scene));
});

module.exports = router;
