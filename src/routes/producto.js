const express = require('express');
const app = express();

//Modelos 
let Producto = require('../models/Producto');

app.get('/producto', function (req, res) {
    Producto.find({}, (err, productos) => {
        if(err){
            return res.status(500).json({
                err
            });
        }
        res.status(200).json({
            ok:true,
            productos
        })
    });
});



app.post('/producto', function (req, res) {
    let body = req.body;

    //Guardar en DB 
    let producto =  new Producto(body);
    producto.save((err, producto) => {
        if(err){
            return res.status(500).json({
                err
            })
        }
        res.status(200).json({
            ok:true,
            producto
        })
    });
    
});

module.exports=app;
