const express = require("express");

//rest object
const app = express();

//routes
// URL => http://localhost:3000
app.get("/", (req, res) => {
res.send("<h1>welcome to food app</h1>");
});

//PORT
const PORT = 3000;

//listen
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});