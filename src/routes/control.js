const express = require("express");
const router = express.Router();

const sseChannels = require("../utils/sse");
const parser = require("../utils/parse");
const {
  setSceneAttr,
  listScene,
  delSceneAttrs,
  initScene,
  getSceneAttrs,
} = require("../utils/data/scene");
const { sseSet } = require("../utils/msg_sse");

router.get("/channels", (req, res) => {
  res.json(
    Object.keys(sseChannels).map((e) => {
      return {
        id: e,
        sessions: sseChannels[e].sessionCount,
      };
    })
  );
});

router.get("/scene", (req, res) => {
  let scenes = listScene();
  for (let i = 0; i < scenes.length; i++) {
    scenes[i].count = sseChannels[scenes[i].scene]?.sessionCount ?? -1;
  }

  res.json(scenes);
});

router.post("/scene", (req, res) => {
  if (!req.body.scene) {
    res.status(500);
    res.json({});
    return;
  }
  initScene(req.body.scene, req.body.title);
});

router.get("/scene/:scene/attr", async (req, res) => {
  if (!req.params.scene) {
    res.status(500);
    res.json({});
    return;
  }
  const attrs = getSceneAttrs(req.params.scene);
  res.json(attrs);
});

router.delete("/scene/:scene/attr", async (req, res) => {
  if (!req.params.scene || !req.body.comp) {
    res.status(500);
    res.json({});
    return;
  }
  delSceneAttrs(req.params.scene, req.body.comp);
  res.json({});
});

router.post("/scene/:scene/attr", async (req, res) => {
  if (
    !req.params.scene ||
    !req.body.comp ||
    !req.body.attr ||
    req.body.value === null
  ) {
    res.status(500);
    res.json({});
    return;
  }
  let value = req.body.value;
  if (req.body.type) value = parser(req.body.value, req.body.type);
  else {
    if (value === "false") value = false;
    if (value === "true") value = true;
  }
  setSceneAttr(req.params.scene, req.body.comp, req.body.attr, value);
  if (sseChannels[req.params.scene])
    sseSet(sseChannels[req.params.scene], req.body.comp, req.body.attr, value);
  res.json({});
});

module.exports = router;
