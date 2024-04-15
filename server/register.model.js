const mongoose = require("mongoose")

const RegisterSchema = new mongoose.Schema({
    fullname : {type : String, require : true},
    username : {type : String, require : true},
    email : {type : String, require : true},
    password : {type : String, require : true},
    contact : {type : String, require :true},
    gender : {type : String, require : true}
})

const RegisterModel = mongoose.model("Register", RegisterSchema)


module.exports = {
    RegisterModel
}