const express = require('express');
const cors = require("cors");
const app = express();
require("dotenv").config();
const {connection} = require("./db");
const {RegisterModel} = require("./register.model");
const bcrypt = require("bcrypt");

let PORT = process.env.PORT || 8500;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hey people, This is a server for Registration_Form!");
});

app.get("/register",async(req,res)=>{
    const register = await RegisterModel.find();
    res.status(200).send({data:register})
})

app.post("/register",async (req,res)=>{
    const {password,username,fullname,gender,contact,email} = req.body;
    const personexits = await RegisterModel.findOne({email})
    if(personexits?.email){
        res.send({"msg" : "Person Already Exists!"})
    }else{
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.send({"msg":"Registration Failed! PLease Try Again"})
            }
            const Register = new RegisterModel({
                email,
                gender,
                username,
                fullname,
                contact,
                password : hash
            })
            try{
                await Register.save()
                res.json({"msg" : "Registration successfull"})
            }
            catch(err){
                console.log(err)
                res.send({"msg":"Something went wrong, plz try again"})
            }
           
        });
    }
})


app.listen(PORT,async ()=>{
    try{
        await connection;
        console.log(`Your mongo DataBase is Connected`);
    }catch(err){
        console.log(err)
    }
    console.log(`Listening on port ${PORT}`);
})