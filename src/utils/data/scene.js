const db = require("../db").scene;

function getSceneAttrs(scene) {
  return getScene(scene)?.attrs ?? {};
}

function delSceneAttrs(scene, comp = null) {
  let sceneData = getScene(scene);
  if (comp) {
    delete sceneData.attrs[comp];
  } else {
    sceneData.attrs = {};
  }
  db.update((d) => d.scene.toString() === scene, sceneData);
}

function getScene(scene) {
  const results = db.get((d) => d.scene.toString() === scene);
  if (results.length) return results[0];
  else return null;
}

function isExistScene(scene) {
  return !!db.get((d) => d.scene.toString() === scene).length;
}

function listScene() {
  const scenes = db.get();
  let ret = [];
  scenes.forEach((s) =>
    ret.push({
      scene: s.scene,
      title: s.title,
    })
  );
  return ret;
}

function initScene(scene, title = null) {
  if (!db.get((d) => d.scene === scene).length)
    db.add({
      scene: scene,
      title: title || `Scene ${scene}`,
      attrs: {},
    });
}

function setSceneAttr(scene, comp, attr, value) {
  const results = db.get((d) => d.scene.toString() === scene);
  if (!results.length) return;
  let scene_attrs = results[0].attrs;
  if (!(comp in scene_attrs)) scene_attrs[comp] = {};
  scene_attrs[comp][attr] = value;
  let scene_data = getScene(scene);
  scene_data.attrs = scene_attrs;
  db.update((d) => d.scene.toString() === scene, scene_data);
}

module.exports = {
  getSceneAttrs,
  getScene,
  initScene,
  setSceneAttr,
  listScene,
  delSceneAttrs,
  isExistScene,
};
