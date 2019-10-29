const bodyParser = require("body-parser");
const updateRouter = require("express").Router();

const Logic = require("../../logic/logic.js");

updateRouter.use(bodyParser.json());

const update = async (req, res, next) => {
  const logic = new Logic();
  await logic.updateGame(
    req.body.inputBoard,
    req.body.inputScore,
    req.body.inputAction,
    req.params.id
  );
  res.send("success");
};
updateRouter.put("/update/:id", update);
module.exports = updateRouter;
