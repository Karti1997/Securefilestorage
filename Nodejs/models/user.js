const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
   firstname:{type: String, required:true},
   username:{type: String, required:true,unique: true},
   password:{type: String, required:true},
   confirmpassword:{type: String, required:true},
   email:{type: String, required:true},
   phoneno:{type: Number, required:true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User",userSchema);