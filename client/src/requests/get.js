const get = async gameId => {
  const url = "/game/history/" + gameId;

  try {
    const data = await fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "GET"
    }).then(response => response.json());

    return data;
  } catch (e) {
    console.log("Error occured", e.stack);
    throw e;
  }
};
export { get };
