const express = require("express")

const cors = require("cors")

const server = express()

const projectRouter = require("./routers/projectRouter.js")
const actionRouter = require("./routers/actionRouter.js")

server.use(express.json())
server.use(cors())

server.use("/api/project", projectRouter)
server.use("/api/action", actionRouter)

server.get("/", (req, res) => {
    res.send(`<h1>Let's make this happen!</h1>`)
})

module.exports = server
