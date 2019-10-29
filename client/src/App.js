import React from "react";
import ReactDOM from "react-dom";

import "./App.css";
import ButtonList from "./components/ButtonList";
import { organiseData } from "./logic/organise-data";
import { create } from "./requests/create";
import { get } from "./requests/get";
import { update } from "./requests/update";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      historyFlag: false,
      flag: true,
      gameNumber: 0,
      board: null,
      score: 0,
      gameOver: false,
      message: null,
      historyRespons: null,
      speed: 2000
    };
  }
  initBoard() {
    let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    board = this.placeRandom(this.placeRandom(board));
    this.setState({ board, score: 0, gameOver: false, message: null });
  }
  getBlankCoordinates(board) {
    const blankCoordinates = [];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          blankCoordinates.push([r, c]);
        }
      }
    }

    return blankCoordinates;
  }
  randomStartingNumber() {
    const startingNumbers = [2, 4];
    const randomNumber =
      startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }
  placeRandom(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate =
      blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = this.randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }
  boardMoved(original, updated) {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
  }
  move(direction) {
    if (!this.state.gameOver) {
      if (direction === 38) {
        const movedUp = this.moveUp(this.state.board);
        if (this.boardMoved(this.state.board, movedUp.board)) {
          const upWithRandom = this.placeRandom(movedUp.board);

          if (this.checkForGameOver(upWithRandom)) {
            this.setState({
              board: upWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            this.setState({
              board: upWithRandom,
              score: (this.state.score += movedUp.score)
            });
          }
        }
      } else if (direction === 39) {
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = this.placeRandom(movedRight.board);

          if (this.checkForGameOver(rightWithRandom)) {
            this.setState({
              board: rightWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            this.setState({
              board: rightWithRandom,
              score: (this.state.score += movedRight.score)
            });
          }
        }
      } else if (direction === 40) {
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = this.placeRandom(movedDown.board);

          if (this.checkForGameOver(downWithRandom)) {
            this.setState({
              board: downWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            this.setState({
              board: downWithRandom,
              score: (this.state.score += movedDown.score)
            });
          }
        }
      } else if (direction === 37) {
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.placeRandom(movedLeft.board);

          if (this.checkForGameOver(leftWithRandom)) {
            this.setState({
              board: leftWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            this.setState({
              board: leftWithRandom,
              score: (this.state.score += movedLeft.score)
            });
          }
        }
      }
    } else {
      this.setState({ message: "Game over. Please start a new game." });
    }
  }
  moveUp(inputBoard) {
    const rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;
    // Shift all numbers to the right
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }
    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = this.rotateLeft(board);

    return { board, score };
  }
  moveRight(inputBoard) {
    const board = [];
    let score = 0;

    // Shift all numbers to the right
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        current === 0 ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to right
    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return { board, score };
  }
  moveDown(inputBoard) {
    const rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    // Shift all numbers to the left
    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = this.rotateLeft(board);

    return { board, score };
  }
  moveLeft(inputBoard) {
    const board = [];
    let score = 0;

    // Shift all numbers equal tp zero to the right
    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        current === 0 ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    // Combine numbers and shift to left
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    return { board, score };
  }
  rotateRight(matrix) {
    const result = [];
    for (let c = 0; c < matrix.length; c++) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.push(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }
  rotateLeft(matrix) {
    const result = [];
    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }
  checkForGameOver(board) {
    const moves = [
      this.boardMoved(board, this.moveUp(board).board),
      this.boardMoved(board, this.moveRight(board).board),
      this.boardMoved(board, this.moveDown(board).board),
      this.boardMoved(board, this.moveLeft(board).board)
    ];

    return moves.includes(true) ? false : true;
  }
  async processHistory(id) {
    const dataFromServer = await get(id);
    this.historySelector(dataFromServer);
  }
  historySelector(data) {
    if (data == "empty") {
      this.initBoard();
    } else {
      const dataFromServer = organiseData(data);
      const organisedData = dataFromServer[0];

      this.setState({ gameNumber: dataFromServer[1] });
      this.setState({ score: dataFromServer[2] });

      if (this.state.historyFlag) {
        this.historyPlayer(organisedData, 0);
      } else if (performance.navigation.type == 1) {
        this.setState({ board: organisedData[organisedData.length - 1] });
      }
    }
  }
  historyPlayer(historyLog, counter) {
    let timer = setInterval(() => {
      this.setState({ board: historyLog[counter] });
      counter++;
      if (counter === historyLog.length) {
        clearInterval(timer);
      }
    }, this.state.speed);
  }
  componentWillMount() {
    this.initBoard();
    const body = document.querySelector("body");
    body.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  componentDidMount() {
    this.processHistory(-2);
  }
  async handleKeyDown(e) {
    if (this.state.historyFlag) {
      document
        .querySelector("body")
        .removeEventListener("keydown", this.handleKeyDown);
      return;
    }
    if (
      (e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40) &&
      !this.state.gameOver
    ) {
      //up , down , left, right
      this.move(e.keyCode);
      update(
        this.state.board,
        this.state.score,
        e.keyCode,
        this.state.gameNumber
      );
    } else if (e.keyCode === 78) {
      const id = await create();
      this.setState({ gameNumber: id });
      this.initBoard();
    }
  }
  render() {
    return (
      <div>
        <div
          className="button"
          onClick={() => {
            this.setState({ speed: this.state.speed + 100 });
          }}
        >
          {" "}
          +0.1Fps{" "}
        </div>
        <div
          className="button"
          onClick={() => {
            this.setState({ speed: this.state.speed - 100 });
          }}
        >
          {" "}
          -0.1Fps{" "}
        </div>
        <div
          className="button"
          onClick={() => {
            this.setState({ historyFlag: true });
          }}
        >
          {" "}
          See History{" "}
        </div>
        <div
          className="button"
          onClick={() => {
            this.setState({ historyFlag: false });
          }}
        >
          {" "}
          Resume{" "}
        </div>
        {this.state.historyFlag && (
          <ButtonList
            function={this.processHistory.bind(this)}
            gamesNumber={this.state.gameNumber}
          />
        )}
        <div className="score">Score: {this.state.score}</div>
        <div className="speed">History Fps: {this.state.speed / 1000}</div>
        <table>
          {this.state.board.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </table>

        <p>{this.state.message}</p>
      </div>
    );
  }
}
const Row = ({ row }) => {
  return (
    <tbody>
      <tr>
        {row.map((cell, i) => (
          <Cell key={i} cellValue={cell} />
        ))}
      </tr>
    </tbody>
  );
};
const Cell = ({ cellValue }) => {
  let color = "cell";
  let value = cellValue === 0 ? "" : cellValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <td>
      <div className={color}>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};
export default App;
