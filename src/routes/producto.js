const express = require('express');
const app = express();
const _ = require('underscore');
const { verificaToken } = require('../middleware/autenticacion');


//Modelos 
let Producto = require('../models/Producto');

app.get('/producto', verificaToken, (req, res) => {

    let pagina = req.query.pagina || 0;
    pagina = Number(pagina);


    //Cantidad a imprimir
    let cantidad = req.query.cantidad || 4;
    cantidad = Number(cantidad);

    //Que busquemos todos los productos que estan disponibles

    Producto.find({ disponible: true })
        .skip(pagina)
        .limit(cantidad)
        .populate('creador', 'nombre correo')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            Producto.countDocuments({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    productos,
                    conteo
                })
            });
        });
});

app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('creador', 'nombre correo')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }

            if (!productoDB) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        msj: "El ID no es Valido"
                    }
                })
            }
            res.status(200).json({
                ok:true,
                productoDB
            });

        });
});

// ================
// Buscar Productos
// ================
app.get('/productos/buscar/:p', verificaToken, (req,res) => {
    let palabra = req.params.p;
    let buscar = new RegExp(palabra,'i');
    Producto.find({nombre: buscar})
        .populate()
        .exec( (err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
           res.status(200).json({
               ok:true,
               productosDB
           })
        });   
});



app.post('/producto', verificaToken, (req, res) => {


    
    let id = req.usuario._id; //ID del Usuario Atenticado
    
    
    let body = req.body;
    //Guardar en DB 
    let producto = new Producto(body);
    producto.creador = id;
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        res.status(200).json({
            ok: true,
            productoDB
        })
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {


    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precio']);

    let usuarioid = req.usuario._id;

    Producto.findOne({ _id: id }, (err, productodb) => {

        if (!(productodb.creador.toString() === usuarioid.toString())) {
            return res.status(400).json({
                msj: "No tienes permitido modificar este producto"
            })
        }

        Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            res.status(200).json({
                ok: true,
                productoDB
            });
        });
    });
});

// ================
//  Borrar un Producto
//  Buscar por el ID 
//  Solo el usuario que lo creo lo puede borrar 
//  Actualizar disponible : false
// ================

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let usuarioid = req.usuario._id;
    
    Producto.findById(id, (err, productoDB)=> {
        if (err) {
            return res.status(500).json({
                err
            })
        }
        productoDB.disponible= false;
        Producto.findByIdAndUpdate(id, productoDB ,{ new: true}, (err, productoDB)=> {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            res.status(200).json({
                ok:true,
                productoDB
            });
        });
    });
});

module.exports = app;
