require('dotenv').config();
const express = require('express');
const app = express();
const authorRoutes = require("./routes/author.js");
const bookRoutes = require("./routes/book.js");
 
const cors = require('cors');

app.use(cors());
app.use(express.json());

const client = require("./database.js");

client.connect(() => {
    console.log("Databse Connected")
})

const port = process.env.PORT || 8000;


app.get("/", (req, res) => {
    res.status(200).send("Server is up and running!!");
});


app.use("/author", authorRoutes);
app.use("/book", bookRoutes);

app.listen(port, () => {
    console.log(`Server is Running on ${port}...` );
});