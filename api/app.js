const app = require('express')();
// var http = require('http').Server(express);
const port = process.env.PORT || 8000;
// const reqVM = require("./model/general/viewmodel")

const cors = require('cors');

const server = require('http').createServer(app);
server.listen(port, () => {
    console.log("listening at PPPPORRT", port)
})
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const drivers = require("./model/drivers")



app.post("/maps", async function (req, res) {
    const n = req.body.n

    try {
        const result = await drivers.getDrivers(n)
        res.status(200).send(result)
    }
    catch (e) {
        console.log("problem on request")
        console.log(e)
        res.status(500).send([])

    }

    //     console.timeEnd("     getbestposts")


})






