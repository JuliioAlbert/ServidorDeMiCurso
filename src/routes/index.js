const express = require('express');
const app = express();

app.get('/',  (req,res) => {
    res.send('Bienvenidos Cafe');
});

module.exports= app;