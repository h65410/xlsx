const server =
  process.env.NODE_ENV == "production"
    ? "https://dailyprayer.abdulrcs.repl.co/api" // "https://lab01.deno.dev/api"
    : "https://dailyprayer.abdulrcs.repl.co/api"; // "http://localhost:4000/api"

export default (endpoint) => {
  function login(username, password, locale) {
    return send("post", { username, password, locale })
  }

  function _getAll() {
    return send("get")
  }

  function _create(body) {
    return send("post", body)
  }

  function _update(body) {
    return send("put", body)
  }

  function _remove(id) {
    return send("delete", { id })
  }

  // SEND FUNCTION
  async function send(method, body = undefined) {
    const opt = {
      method,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    }

    if (body && ["post", "put"].includes(method))
      opt.body = JSON.stringify(body)

    const ep = body && body.id ? `${endpoint}/${body.id}` : endpoint
    try {
      const response = await fetch(`${server}${ep}`, opt)
      if (response.ok) {
        return response.json()
      }
      throw Error(await response.text())
    } catch (error) {
      throw error
    }
  }

  return { login, _getAll, _create, _update, _remove }
}
