const express = require("express");
const router = express.Router();

const sseChannels = require("../utils/sse");
const parser = require("../utils/parse");
const { setSceneAttr } = require("../utils/data");

router.post("/set", async (req, res) => {
  if (!req.body.scene || !req.body.attr || !req.body.value) {
    res.status(500);
    res.json({});
    return;
  }
  const value = parser(req.body.value, req.body.type);
  setSceneAttr(req.body.scene, req.body.attr, value);
  if (sseChannels[req.body.scene])
    sseChannels[req.body.scene].broadcast({
      type: "set",
      scene: req.body.scene,
      attr: req.body.attr,
      value: value,
    });
  res.json({});
});

module.exports = router;
