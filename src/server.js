require("dotenv").config()
const express = require("express")
const cors = require("cors")

const port = process.env.PORT || 5001

const app = express()
app.use(cors())

app.use(express.json())
app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working"})
})

app.listen(port, () => {
    syncTables()
    console.log(`server is running on port ${port}`)
})