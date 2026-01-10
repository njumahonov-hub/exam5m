const { Saved } = require("../controller/saved.controller")
const auhtorization2 = require("../middleware/auhtorization2")

const savedrouter = require("express").Router()



savedrouter.post("/cars/:id/saved", auhtorization2, Saved)

module.exports = savedrouter