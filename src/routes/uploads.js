const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const  fs = require('fs');
const  path = require('path');



const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');

//app.use(fileUpload({ useTempFiles : true,}));
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) =>  {
    //Sacar el tipo de la url
    //Sacar el ID de la url
    let tipo = req.params.tipo;
    let id = req.params.id;
    if(!req.files){
        return res.status(404).json({
            ok:false,
            msj: "No Se Subio nada"
        })
    }
    //Solo validar [usuarios, productos]
    let tiposPermitidos = ['usuarios', 'productos'];

    if(tiposPermitidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok:false,
            err:{
                msj: `Los tipos permitidos son ${tiposPermitidos.join(', ') }`,
                tipo
            }
        })
    }
    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length-1];
    
    //Extensiones Permitidas
    let extensionesPermitidas = ['png', 'jpg', 'gif','jpeg'];

    if(extensionesPermitidas.indexOf(extension)<0){
        return res.status(400).json({
            ok:false,
            err:{
                msj: `Las extensiones Permitidas son ${extensionesPermitidas.join(',') }`,
                ext: extension
            }
        })
    }

    //Cambiar el Nombre 
    let nuevoNombre = `${tipo}-${id}-${new Date().getMilliseconds()}.${extension}`;
    archivo.mv(`uploads/${tipo}/${nuevoNombre}`, (err) => {
        if (err){
            borrarArchivo(nuevoNombre, tipo);
            return res.status(500).send(err);
        }
          //Aqui ya esta la imagen cargada tipo 
          if(tipo === 'usuarios'){
                //Usuarios
                imagenUsuario(id , res, nuevoNombre, tipo);
          }else {
              //Productos
              imagenProducto(id , res, nuevoNombre, tipo);
          }
      });
});

const imagenUsuario = (id , res, nuevoNombre, tipo ) => {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nuevoNombre, tipo);
            return res.status(500).json({
                err
            })
        }
        if(!usuarioDB){
            borrarArchivo(nuevoNombre, tipo);
            return res.status(400).json({
                ok:false,
                err:{
                    msj:'ID no Valido',
                }
            });
            
        } 
        borrarArchivo(usuarioDB.img, 'usuarios');
        usuarioDB.img= nuevoNombre;
        usuarioDB.save((err, usuarioGuardado)=> {
            res.status(200).json({
                ok:true,
                usuarioGuardado
            })
        })
    })
}

const imagenProducto = (id , res, nuevoNombre ) => {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarArchivo(nuevoNombre, tipo);
            return res.status(500).json({
                err
            })
        }
        if(!productoDB){
            borrarArchivo(nuevoNombre, tipo);
            return res.status(400).json({
                ok:false,
                err:{
                    msj:'ID no Valido',
                }
            });
        } 
        borrarArchivo(productoDB.img, 'productos');
        productoDB.img= nuevoNombre;
        productoDB.save((err, productoGuardado)=> {
            res.status(200).json({
                ok:true,
                productoGuardado
            })
        });
    })
}

const borrarArchivo = (nuevoNombre, tipo)=> {
    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${nuevoNombre}`);
    if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage);
    }
}



module.exports= app;
