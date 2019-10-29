const express = require("express");

const indexRouter = require("../src/api/index");

const app = express();
const port = 9000;

app.use("/api", indexRouter);

app.listen(port, () => console.log(`2048 game is listening on port ${port}!`));
