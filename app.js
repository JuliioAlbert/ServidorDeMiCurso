require('./src/config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/', function (req, resp) {
    let datos = [
        { nombre: "Julio", edad: 21, deporte: "NAda" },
        { nombre: "Julio", edad: 21, deporte: "NAda" },
        { nombre: "Julio", edad: 21, deporte: "NAda" }
    ]
    resp.json({
        datos
    })

});
app.post('/usuario', function (req, res) {

    let body = req.body;
    const { edad, nombre } = body;

    if (nombre === undefined && edad === undefined) {
        res.status(400).json({
            msj: "Favor de llenar los datos",
            ok: false
        });
    } else {
        res.status(200).json({
            msj: "Si vienen tus datos",
            nombre,
            edad
        })
    }
});

// /productos 
// producto, precio
// Comparar que vengan los dos datos 
// Responder Si vienen 
// Responder Di no vienen 
// vas Responder si falta el precio 

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', function (req, res) {

    res.json({
        msj: "Delete usuario"
    });
});


app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto", process.env.PORT);
});