const Dal = require("../dal/dal");
const Play = require("./plays");

class Logic {
  async createNewGame() {
    const dal = new Dal();
    let id = (await parseInt(dal.readGameNumber())) + 1;

    await dal.writeGameNumber(id);
    await dal.writeToFileSystem(
      id,
      new Play(0, this.generateBoard(), new Date().valueOf(), "created~" + id)
    );
    return id;
  }
  generateBoard() {
    return new Array(16).fill(0);
  }
  async updateGame(board, score, action, gameId) {
    const dal = new Dal();
    await dal.writeToFileSystem(
      gameId,
      new Play(score, board, new Date().valueOf(), action)
    );
  }
  async getGame(gameId) {
    const dal = new Dal();
    let data;
    gameId == -2
      ? (data = dal.recentBoard().split("-")) // refresh request
      : (data = dal.readFromFileSystem(gameId).split("-")); // history request

    return data;
  }
}
module.exports = Logic;
