const indexRouter = require("express").Router();
const gameRouter = require("./game/index");

indexRouter.use("/game", gameRouter);

module.exports = indexRouter;
