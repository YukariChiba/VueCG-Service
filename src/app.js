const config = require("./utils/config");
const express = require("express");
const app = express();

const plugin_cors = require("./plugins/cors");
const error_handler = require("./utils/errors");

const route_display = require("./routes/display");
const route_control = require("./routes/control");
const { initScene } = require("./utils/data");

app.use(plugin_cors);
app.use(error_handler);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/display", route_display);
app.use("/control", route_control);

initScene("114514");

app.listen(config.PORT, config.HOST, () => {
  console.log(`Cast API listening on ${config.PORT}...`);
});
