const fs = require("fs");

const idLogPath = "../src/archieve/idLog.txt";
const gamesPath = "../src/archieve/Game";

class gameDal {
  writeToFileSystem(gameId, data) {
    const logger = fs.createWriteStream(gamesPath + gameId + ".txt", {
      flags: "a"
    });
    logger.write(data.print());
    logger.end();
  }

  readFromFileSystem(gameId) {
    try {
      return fs.readFileSync(gamesPath + gameId + ".txt", "utf8");
    } catch (error) {
      console.error(error);
    }
  }
  writeGameNumber(gameId) {
    const file = fs.createWriteStream(idLogPath);
    file.write("" + gameId);
    file.end();
  }
  readGameNumber() {
    let gameId;
    try {
      gameId = fs.readFileSync(idLogPath, "utf8");
    } catch (err) {
      gameId = -1; // no gameId log
    } finally {
      return gameId;
    }
  }
  recentBoard() {
    let ret;
    const id = this.readGameNumber();
    id === -1 ? (ret = "empty") : (ret = this.readFromFileSystem(id));
    return ret;
  }
}
module.exports = gameDal;
