function update(score, board, action, gameId) {
  fetch("/game/update/" + gameId, {
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    method: "PUT",
    body: JSON.stringify({
      inputBoard: board,
      inputScore: score,
      inputAction: action
    })
  })
    .then(response => response.text())
    .then(response => console.log(response))
    .catch(error => console.error(error));
}

export { update };
