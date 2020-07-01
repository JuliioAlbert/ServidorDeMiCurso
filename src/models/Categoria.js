const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CategoriaSchema = new Schema({
    descripcion:{
        type: String,
        unique: true,
        required:[true, "La descripcion es Obligatoria"]
    },
    creador :{
        type: Schema.Types.ObjectId,
    }
    /// descripcion // unique, requerida
    /// creador //ObjetID

});



module.exports = mongoose.model('Categoria', CategoriaSchema);