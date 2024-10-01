const express = require('express')

const app = express()

app.use("/", (req,res) => {
    res.json({message: "hello docker compose"})
})

app.listen(3000, (req,res) =>{
    console.log('Connect Server');
})