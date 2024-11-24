const connectToMongo=require("./db");
const express = require('express')
connectToMongo();
const app = express()

app.use(express.json())
const port = 3000

//available routes
app.use('/api/auth',require('./routes/auth'));
// app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})