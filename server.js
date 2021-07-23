const express = require('express');
const mongoose = require('mongoose')
const routes = require('./src/routes')
require("dotenv/config")




const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("-> Database connect!")
})

app.use(express.json())
app.use(routes)







var port = process.env.PORT || 3000
app.listen(port, () => console.log("-> Server on in port: "+ port))



