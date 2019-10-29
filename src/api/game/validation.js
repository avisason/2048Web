const validationRouter = require("express").Router();

const Dal = require("../../dal/dal");

const validate = (req, res) => {
  const dal = new Dal();
  const inputId = req.params.id;
  (inputId <= dal.readGameNumber() && inputId >= 0) || inputId == -2
    ? res.send("legit")
    : res.send("illegal id");
};

validationRouter.use(validate);

module.exports = validationRouter;
