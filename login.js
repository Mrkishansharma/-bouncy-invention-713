let loginFormEl = document.getElementById("login-form");
let signUpHeadingEl = document.getElementById("signUp-heading");


// function goToHomePage(){
//     alert("hello0")
// }


let userData = []
fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users`)
.then(res => res.json())
.then(data => {
    userData = data
})



loginFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let phoneNumber = loginFormEl.mobileNumber.value;
    signUpHeadingEl.innerText = `Enter OTP sent to ${phoneNumber}`;
    
    loginFormEl.style.display="none";

    let changeNumberBtn = document.createElement("button");
    changeNumberBtn.innerText = "CHANGE NUMBER";
    changeNumberBtn.setAttribute("id", "changeNumberBtn");
    changeNumberBtn.addEventListener("click", ()=> {
        location.reload();
    })
    

    let otpInput = document.createElement("input");
    otpInput.setAttribute("placeholder", "Enter OTP");
    otpInput.setAttribute("id", "otpInput");
    
    let resendOTPBtn = document.createElement("button");
    resendOTPBtn.innerText = "RESEND OTP";
    resendOTPBtn.setAttribute("id", "resendOTPBtn");
    let isCounter = true
    resendOTPBtn.addEventListener("click", ()=> {
        if(isCounter){
            resendTime()
        }
    })
    resendTime()
    function resendTime(){
        let counter=59
        isCounter = false
        let c = setInterval(()=>{
            if(counter==0){
                clearInterval(c);
                isCounter = true
                resendOTPBtn.innerText = 'RESEND OTP'
                resendOTPBtn.style.fontWeight="bold"
            }else{
                resendOTPBtn.innerText = `Resend OTP in ${counter} s`
                resendOTPBtn.style.fontWeight="normal"
                counter--
            } 
        },1000)
    }

    let verifyBtn = document.createElement("button");
    verifyBtn.innerText = "Verify";
    verifyBtn.setAttribute("class", "formSubmitButton");

    verifyBtn.addEventListener("click", ()=> {
        let enteredOTP = document.getElementById("otpInput").value;
        if(phoneNumber=="1234567890" && enteredOTP=="0000"){
            alert("admin login")
        }else if(enteredOTP=="1234"){
            alert("Login Succesfully")
            checkLoginUser(phoneNumber)
            history. back()
            // location.href='./index.html'
        }else{
            alert("Wroung OTP")
        }
    })
    
    signUpHeadingEl.append(changeNumberBtn,otpInput, resendOTPBtn,verifyBtn);

})



function checkLoginUser(phoneNumber){
    let userId = "";
    console.log(userData);
    userData.forEach((element) => {
        if(element.mobileNumber==phoneNumber){
            userId = element.id;
            return
        }
    })

    if(userId){
        localStorage.setItem("currLoginUserId", userId)
    }else{
        fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users`, {
            method: "POST",
            body: JSON.stringify({
                "mobileNumber": phoneNumber
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        userId = 1 + Number(userData[userData.length-1].id) 
        localStorage.setItem("currLoginUserId", userId)
    }
    
}

