class Plays {
  constructor(score, board, date, actionMade) {
    this.score = score;
    this.board = board;
    this.date = date;
    this.actionMade = actionMade;
  }
  print() {
    return `${this.score} ${this.board} ${this.date} ${this.actionMade}-\n `;
  }
}

module.exports = Plays;
