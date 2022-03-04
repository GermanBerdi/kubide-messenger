//mas adelante podria agregar al usuario el campo estado para implementar un tipo enumerado
/*enum statusType {
    online,
    offline,
    away,
    busy
}*/

// user
// - userId   : number;          //Id del usuario. Unico para cada usuario
// - name     : string;          //Nombre del usuario.
// - lastName : string;          //Apellido del usuario.
// - email    : string;          //Email del usuario. Lo usara de login. Unico para cada usuario
// - password : string;          //Password del usuario.
// - active   : boolean;         //Define si el usuario esta activo o no.
// - status   : statusType;      //Estado del usuario puede ser (online, offline, away, busy)

//importo mongoose
const mongoose = require("mongoose");
  
//creo un esquema con los campos de un usuario
const userSchema = new mongoose.Schema({
  "name"      : {type: String},
  "lastName"  : {type: String},
  "email"     : {type: String, required: true},
  "password"  : {type: String, required: true},
  "active"    : {type: Boolean, requiered: true}
});
  
//exporto un modelo que trabaja con la coleccion users
const userModel = mongoose.model("users", userSchema);
  
module.exports = userModel;