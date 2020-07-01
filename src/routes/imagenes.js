const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { verificaToken } = require('../middleware/autenticacion');



app.get('/imagen/:tipo/:img',verificaToken, (req,res)=> {
    //Tipo 
    let tipo = req.params.tipo;
    //img
    let img = req.params.img;

  
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
         let pathImage = path.resolve(__dirname, '../../assets/imagen-no-disponible.png');
         res.sendFile(pathImage);
    }
});



module.exports = app;