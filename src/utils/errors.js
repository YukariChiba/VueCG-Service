module.exports = (error, request, response, next) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.status(error.status || 500);
  response.json(error.inner || {});
};
