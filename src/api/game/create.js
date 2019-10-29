const createRouter = require("express").Router();

const Logic = require("../../logic/logic");

const create = async (req, res) => {
  const logic = new Logic();
  const id = "" + (await logic.createNewGame());
  res.send(id);
};

createRouter.post("/create", create);

module.exports = createRouter;
