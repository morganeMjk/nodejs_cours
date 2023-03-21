const express = require ('express')
const app = express()
const port = 3030;
const bodyParser = require('body-parser')
const cors = require("cors");
const sequelize = require("./config/database.config")


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => res.send('Hello World'))

// User routes
app.use('/user', require("./src/routes/user.routes"))

// Post routes
app.use('/post', require("./src/routes/post.routes"));

app.listen(port, async () => {
    try {
    await sequelize.authenticate();
    console.log('Conœction has been established successfully.');
    console.log(`Example app listening at http://localhost:${port}`)
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
})