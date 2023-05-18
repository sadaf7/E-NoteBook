const express = require('express');
const connectToMongo = require("./db");
const cors = require('cors')
connectToMongo();
const app = express();
app.use(cors())
const port = 4000;

app.use(express.json());
// available routes
app.use('/api/auth', require("./routes/auth"));
app.use('/api/notes', require("./routes/note"));

app.listen(port, () => {
    console.log(` App started on port ${port}`);
  })