const gameRouter = require("express").Router();

const getRouter = require("./get");
const createRouter = require("./create");
const updateRouter = require("./update");
//const validationRouter = require("./validation");

//gameRouter.use(validationRouter);
gameRouter.use(createRouter);
gameRouter.use(updateRouter);
gameRouter.use(getRouter);

module.exports = gameRouter;
