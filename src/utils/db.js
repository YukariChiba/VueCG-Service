const JsonRecords = require("json-records");
const scene_db = new JsonRecords("data/scenes.json");

module.exports = {
  scene: scene_db,
};
