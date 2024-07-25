const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors(corsOptions)); //?
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //?

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => {
    console.log(req.body.cheie)
    res.send(req.body)
})

app.post('/login', (req, res) => {
    console.log(req.body)
    var username = "admin"
    var password = "123"

    if (req.body.username === username && req.body.password === password) {
        res.send({ message: "Login successful" })
    } else {
        res.status(401).send({ message: "Invalid credentials" })
    }
})

require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
