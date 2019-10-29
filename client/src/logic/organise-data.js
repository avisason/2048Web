function organiseData(data) {
  let tempBoard = [];
  let inputBoard = [];
  const allBoard = [];
  const gamesCount = data[0].split(" ")[3].split("~")[1];
  const scoreUpdate = parseInt(data[data.length - 2].split(" ")[2]);

  for (let i = 0; i < data.length - 1; i++) {
    inputBoard = data[i]
      .split(" ")[1]
      .split(",")
      .map(Number);
    for (let j = 0; j < 16; j += 4) {
      tempBoard.push(inputBoard.slice(j, j + 4));
    }
    allBoard.push(tempBoard);
    tempBoard = [];
  }
  return [allBoard, gamesCount, scoreUpdate];
}

export { organiseData };
