(async function () {
  globalThis.electron = await require("electron")
  await import("./src/main.js")
})()