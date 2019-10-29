const getRouter = require("express").Router();

const Logic = require("../../logic/logic");

const get = async (req, res) => {
  const logic = new Logic();
  res.send(JSON.stringify(await logic.getGame(req.params.id)));
};

getRouter.get("/history/:id", get);

module.exports = getRouter;
