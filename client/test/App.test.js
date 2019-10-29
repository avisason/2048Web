const assert = require("chai").assert;
const sinon = require("sinon");

function getBlankCoordinates(board) {
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
function randomStartingNumber() {
  const startingNumbers = [2, 4];
  const randomNumber =
    startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
  return randomNumber;
}
function placeRandom(board) {
  const blankCoordinates = getBlankCoordinates(board); //stub(list)
  const randomCoordinate =
    blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
  const randomNumber = randomStartingNumber(); //stub(2,4)
  board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
  return board;
}
function boardMoved(original, updated) {
  return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
}
function rotateRight(matrix) {
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
function checkForGameOver(board, boardTwo) {
  if (board === null || boardTwo === null) return null;
  const moves = [
    boardMoved(board, boardTwo[0]),
    boardMoved(board, boardTwo[1]),
    boardMoved(board, boardTwo[2])
  ];

  return moves.includes(true) ? false : true;
}
describe("getBlackCoordinates", () => {
  it("initialize new board - should return size of board", () => {
    const input = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    const output = getBlankCoordinates(input).length;
    const expectedOutput = 16;
    assert.equal(output, expectedOutput);
  });
  it("full taken board- should reutrn zero", () => {
    const input = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    const output = getBlankCoordinates(input).length;
    const expectedOutput = 0;
    assert.equal(output, expectedOutput);
  });
  it("givven empty board- should return zero", () => {
    const input = [];
    const output = getBlankCoordinates(input).length;
    const expectedOutput = 0;
    assert.equal(output, expectedOutput);
  });
  it("givven object who's not an array. - should return zero", () => {
    const input = 10;
    const output = getBlankCoordinates(input).length;
    const expectedOutput = 0;
    assert.equal(output, expectedOutput);
  });
});
describe("randomStartingNumber", () => {
  it("random value must be >=  2 && <=4", () => {
    const output = randomStartingNumber();
    const expectedOutput = true;
    assert.equal(output === 2 || output === 4, expectedOutput);
  });
  it("returned value must be a number", function() {
    assert.isNumber(randomStartingNumber());
  });
});
describe("placeRandom", () => {
  it("change board with expected result", () => {
    const input = [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    const getBlankCoordinatesFake = sinon.fake.returns([[1, 1]]);
    const output = getBlankCoordinatesFake();
    const randomCoordinate = output[Math.floor(Math.random() * output.length)];
    const randomStartingNumberFake = sinon.fake.returns(2);
    const randomNumberFake = randomStartingNumberFake();

    input[randomCoordinate[0]][randomCoordinate[1]] = randomNumberFake;
    const expectedOutput = [
      [1, 1, 1, 1],
      [1, 2, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ];
    assert.equal(input.join(","), expectedOutput.join(","));
  });
});
describe("boardMoved ", () => {
  it("identical boards- suppose to be false", () => {
    const input = [1, 2, 3, 4, 5];
    const output = boardMoved(input, input);
    const expectedOutput = false;
    assert.equal(output, expectedOutput);
  });
  it("Unidentical boards- suppose to be true", () => {
    const input = [[1, 2, 3, 4, 5], [0, 0, 3, 4, 5]];
    const output = boardMoved(input[0], input[1]);
    const expectedOutput = true;
    assert.equal(output, expectedOutput);
  });
  it("returned value is boolean", () => {
    const input = [1, 2, 3, 4, 5];
    const output = typeof boardMoved(input, input);
    const expectedOutput = "boolean";
    assert.equal(output, expectedOutput);
  });
  it("both values are null", () => {
    const input = null;
    const output = boardMoved(input, input);
    const expectedOutput = false;
    assert.equal(output, expectedOutput);
  });
});
describe("rotateRight ", () => {
  it("givven empty matrix should return empty list", () => {
    const input = [];
    const output = rotateRight(input);
    const expectedOutput = 0;
    assert.equal(output, expectedOutput);
  });
  it("givven matrix should return matrix", () => {
    let counter = 0;
    const input = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    const output = rotateRight(input);
    output.map(item => {
      item.map(item2 => {
        if (item2 !== null) counter++;
      });
    });
    const expectedOutput = 16;
    assert.equal(counter, expectedOutput);
  });
  it("givven matrix a, should return left rotation", () => {
    const input = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    const output = rotateRight(input);
    const outputString = output[0].join(",");
    assert.equal(outputString, [13, 9, 5, 1].join(","));
  });
  it(" f(f(f(f(a))))=a ", () => {
    const input = [
      [1, 2, 3, 5],
      [6, 7, 8, 9],
      [10, 11, 12, 13],
      [14, 15, 16, 17]
    ];
    let output = rotateRight(input);
    for (let i = 0; i < 3; i++) output = rotateRight(output);
    assert.equal(output[0].join(","), input[0].join(","));
  });
});
describe("checkForGameOver", () => {
  it("game is not over, returned value is false", () => {
    const boardMovedFake = sinon.fake.returns(false);
    const moves = [boardMovedFake(), boardMovedFake(), boardMovedFake()];
    const output = moves.includes(true) ? false : true;
    const expectedOutput = true;
    assert.equal(output, expectedOutput);
  });
  it("game is over, returned value is true", () => {
    const boardMovedFake = sinon.stub();
    boardMovedFake.onCall(0).returns(false);
    boardMovedFake.onCall(1).returns(true);
    boardMovedFake.onCall(2).returns(false);
    const moves = [boardMovedFake(), boardMovedFake(), boardMovedFake()];
    const output = moves.includes(true) ? false : true;
    const expectedOutput = false;
    assert.equal(output, expectedOutput);
  });
});
