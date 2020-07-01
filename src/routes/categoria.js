const express = require('express');
const app = express();

const { verificaToken } = require('../middleware/autenticacion');

/// verifica token //let usuarioid = req.usuario._id;

// Modelo de Categoria 

let Categoria = require('../models/Categoria');


//////////////////////////////
// Mostrar las categorias //get 
////////////////////////////
app.get('/categoria',verificaToken, (req, res) => {
    Categoria.find({}, (err, categorias) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        res.status(200).json({
            ok: true,
            categorias
        });
    });
});

//////////////////////////////
// Mostrar una Categoria por ID //get findOne
////////////////////////////
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mjs: "El ID es incorrecto o no Existe el la BD"
                }
            })
        }
        res.status(200).json({
            ok: true,
            categorias
        });
    });
});

//////////////////////////////
// Crear una Categoria  //Post 
////////////////////////////
app.post('/categoria',verificaToken, (req, res) => {
    let usuarioid = req.usuario._id;
    let body= req.body;

    //Modelo 
    let categoria = new Categoria(body);
    categoria.creador=usuarioid;
    //ID del usuario auth
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        res.status(200).json({
            ok: true,
            categoriaDB
        })
    });
});

//////////////////////////////
// Eliminar una Categoria  //Delete 
////////////////////////////
app.delete('/categoria/:id', verificaToken,(req, res )=> {
    let id = req.params.id;


    Categoria.findByIdAndRemove(id, (err, categoriaDB)=> {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        res.status(200).json({
            ok: true,
            categoriaDB
        })
    });
});

module.exports = app;