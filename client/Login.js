
var mai = false;
var pasword = false;

document.getElementById("loader").style.display = "none";

document.querySelector('form').addEventListener('submit',async (e) => {
    e.preventDefault()
    console.log("working");
    document.getElementsByTagName("body")[0].style.opacity = 0.4;
    const data = Object.fromEntries(new FormData(e.target).entries())
    document.getElementById("loader").style.display = "block";
    try{
        const response = await fetch("http://localhost:8080/login", 
        {method: "POST",mode: "cors",
        headers: {"Content-Type": "application/json"},body:JSON.stringify(data)})
        const res = await response.json();
        document.getElementsByTagName("body")[0].style.opacity = 1;
        alert(res.msg)
        if(res.token){
            console.log(res.token);
        }
        document.getElementById("loader").style.display = "none";
    }
    catch(err){
        document.getElementsByTagName("body")[0].style.opacity = 1;
        alert("Something went wrong! Try Again.")
        console.log(err);
    }
    window.location.reload();

});


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

const check_password = (pass)=>{
    if(pass.length < 8){
        let stat = document.getElementById("pass_msg");
        stat.innerHTML ="* Enter a valid password!";
        stat.style.color = "orangered";
        pasword = false;
        activebtn();
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

function activebtn(){
    if(pasword == true && mai == true){
        document.getElementById("sub_btn1").disabled = false;
        document.getElementById("sub_btn1").style.opacity = 1;
    }
    else{
        document.getElementById("sub_btn1").disabled = true;
        document.getElementById("sub_btn1").style.opacity = 0.5;
    }
}

activebtn();