const express = require('express')
const cors = require("cors");

const authRoutes = require('./routes/auth')
const courseRoutes = require('./routes/course')
const donateRoutes = require('./routes/donate')

const app = express()
app.use(express.json());
app.use(cors());

const PORT = 3002

app.use(authRoutes)
app.use('/course', courseRoutes)
app.use(donateRoutes)

app.listen(PORT, () => {

    console.log("SERVER RUNNING ON PORT 3002")

})

