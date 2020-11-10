const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/sendtome",
    createProxyMiddleware({
      target: "https://dan-server-mail.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
