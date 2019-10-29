const create = async () => {
  const url = "/game/create";

  try {
    const id = await fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "POST"
    }).then(response => response.json());

    return id;
  } catch (e) {
    console.log("Error occured", e.stack);
    throw e;
  }
};
export { create };
