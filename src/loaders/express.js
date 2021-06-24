const express = require("express");
const cors = require("cors");
const apiRouter = require("../../src/routes/v1/api");
const bookingRouter = require("../../src/routes/v1/booking");
const config = require("../../src/config/app");
// const { connectToDB } = require("./mongoose");
// //  连接数据库 监听 也可以放在最外面
// connectToDB();

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, apiRouter);
  app.use(config.api.prefix, bookingRouter);
  return app;
};
