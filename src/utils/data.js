const db = require("./db");

function getSceneAttrs(scene) {
  const results = db.get((d) => d.scene === scene);
  if (results.length) return results[0].attrs;
  else return {};
}

function initScene(scene) {
  if (!db.get((d) => d.scene === scene).length)
    db.add({
      scene: scene,
      attrs: {},
    });
}

function setSceneAttr(scene, attr, value) {
  const results = db.get((d) => d.scene === scene);
  if (!results.length) return;
  let scene_attrs = results[0].attrs;
  scene_attrs[attr] = value;
  db.update((d) => d.scene === scene, {
    scene: scene,
    attrs: scene_attrs,
  });
}

module.exports = {
  getSceneAttrs,
  initScene,
  setSceneAttr,
};
