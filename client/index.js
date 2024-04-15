var fulname = false;
var usename = false;
var pasword = false;
var conpasword = false;
var mai = false;
var cont = false;
var gen = false;

document.getElementById("loader").style.display = "none";

document.querySelector('form').addEventListener('submit',async (e) => {
    e.preventDefault()
    document.getElementsByTagName("body")[0].style.opacity = 0.4;
    const data = Object.fromEntries(new FormData(e.target).entries())
    document.getElementById("loader").style.display = "block";
    try{
        const response = await fetch("http://localhost:8080/register", 
        {method: "POST",mode: "cors",
        headers: {"Content-Type": "application/json"},body:JSON.stringify(data)})
        const res = await response.json();
        document.getElementsByTagName("body")[0].style.opacity = 1;
        alert(res.msg)
        console.log(res.data);
        document.getElementById("loader").style.display = "none";
    }
    catch(err){
        document.getElementsByTagName("body")[0].style.opacity = 1;
        alert("Something went wrong! Try Again.")
        console.log(err);
    }
    window.location.reload();

});

const check_Fullname = (fname)=>{ 
    var name = fname.split("");
    var status;    
    name.map(item=>{
        if(Number(item)){
            status= false;
        }
        else{
            const specialChars = "/[`!@#$%^&*()_+-=[]{};':\|,.<>/?~]/".split("");
            const specialchar = specialChars.map(elem=>{
                if(elem == item){
                    status = false;
                }
            })
        }
    })
    if(fname === null || fname === ""){
        let stat = document.getElementById("full_msg");
        stat.innerHTML ="* Invalid Name!, a-z & A-Z are Acceptable.";
        stat.style.color = "orangered";
        fulname = false;
        activebtn();
        document.getElementById("fname").value = null;
        return;
    }
    if(status == false){
        let stat = document.getElementById("full_msg");
        stat.innerHTML ="* Invalid Name!, a-z & A-Z are Acceptable.";
        stat.style.color = "orangered";
        fulname = false;
        activebtn();
        document.getElementById("fname").value = null;
        return;
    }
    else{
        let stat = document.getElementById("full_msg");
        stat.innerHTML ="";
        fulname = true;
        activebtn();
        return;
    }
}

const check_Username = (uname)=>{
    var name = uname.split("");
    var status;    
    name.map(item=>{
        const specialChars = "/[`!#$%^&*()_+-=[]{};':\|,.<>/?~]/".split("");
        const specialchar = specialChars.map(elem=>{
            if(elem == item){
                status = false;
            }
        })
    })

    if(uname === null || uname === ""){
        let stat = document.getElementById("user_msg");
        stat.innerHTML ="* Invalid UserName!,  Aa-Zz & 1-10 & @ are Acceptable.";
        stat.style.color = "orangered";
        usename = false;
        activebtn();
        document.getElementById("uname").value = null;
        return;
    }
    if(status == false){
        let stat = document.getElementById("user_msg");
        stat.innerHTML ="* Invalid UserName!,  Aa-Zz & 1-10 & @ are Acceptable.";
        stat.style.color = "orangered";
        usename = false;
        activebtn();
        document.getElementById("uname").value = null;
        return;
    }
    else{
        let stat = document.getElementById("user_msg");
        stat.innerHTML ="";
        stat.style.color = "lightgreen";
        usename = true;
        activebtn();
        return;
    }
}

const check_password = (pass)=>{
    var password = pass.split("");
    var num=0;
    var special = 0;
    if(pass.length >= 8){
        password.map(item=>{
            if(Number(item)){
                num+=1;
            }
            else{
                const specialChars = "/[`!@#$%^&*()_+-=[]{};':\|,.<>/?~]/".split("");
                const specialchar = specialChars.map(elem=>{
                    if(elem == item){
                        special+=1;
                    }
                })
            }
        })
        if(num<=0 || special<=0){
            let stat = document.getElementById("pass_msg");
            stat.innerHTML ="* Atleast 1-num & 1-spec.Char requiorangered!";
            stat.style.color = "orangered";
            pasword = false;
            activebtn();
            document.getElementById("pass").value = null;
            return
        }
        else{
            let stat = document.getElementById("pass_msg");
            stat.innerHTML ="";
            pasword = true;
            activebtn();
            return
        }
    }
    else{
        let stat = document.getElementById("pass_msg");
            stat.innerHTML ="* Weak password! Min (8 char) requiorangered!";
            stat.style.color = "orangered";
            document.getElementById("pass").value = null;
            pasword = false;
            activebtn();
            return
    }
}

const check_confirmpassword=(pass)=>{
    let password = document.getElementById("pass").value;
    if(pass !== password){
        let stat = document.getElementById("cpass_msg");
        stat.innerHTML ="* Confirm Password & Password must be same!";
        stat.style.color = "orangered";
        conpasword = false;
        activebtn();
        document.getElementById("conpass").value = null;
        return
    }
    else{
        let stat = document.getElementById("cpass_msg");
        stat.innerHTML ="";
        conpasword = true;
        activebtn();
        return
    }
}

function check_mail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    let stat = document.getElementById("mail_msg");
    stat.innerHTML ="";
    mai = true;
    activebtn();
    return;
  }
    let stat = document.getElementById("mail_msg");
    stat.innerHTML ="* Invalid email address!";
    stat.style.color = "orangered";
    mai = false;
    activebtn();
    document.getElementById("mail").value = null;
    return
}

function check_contact(num){
    const status = /^\d{10}$/.test(num);
    if(status){
        let stat = document.getElementById("contact_msg");
        stat.innerHTML ="";
        cont = true;
        activebtn();
        return;
    }
    else{
        let stat = document.getElementById("contact_msg");
        stat.innerHTML ="* Invalid Contact Number!";
        stat.style.color = "orangered";
        cont = false;
        activebtn();
        document.getElementById("contact").value = null;
        return
    }
}

function check_gender(e){
    gen = true;
    let stat = document.getElementById("gender_msg");
    stat.innerHTML ="";
    activebtn();
    return;
}


function activebtn(){
    if(((fulname && usename)&&(pasword && conpasword))&&(mai && gen) ){
        document.getElementById("sub_btn").disabled = false;
        document.getElementById("sub_btn").style.opacity = 1;
    }
    else{
        document.getElementById("sub_btn").disabled = true;
        document.getElementById("sub_btn").style.opacity = 0.5;
    }
}

activebtn();