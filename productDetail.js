let addToCartBtn = document.getElementById("addToCartBtn");
let buyNowBtn = document.getElementById('buyNowBtn');


let currProduct = JSON.parse(localStorage.getItem("currProduct")) || {};
let currLoginUserId = localStorage.getItem("currLoginUserId");


// show product in browser
if(currProduct){
    currProduct.quantity = 1
    document.getElementById("prdImage").src = currProduct.avatar;
    document.getElementById("prdTitle").innerText = currProduct.title;
    document.getElementById("prdPrice").innerText = currProduct.price;
    document.getElementById("prdRating").innerText = currProduct.rating%5 +" ⭐";
    document.getElementById("prdReview").innerText = currProduct.reviews*153 +" review";
    document.getElementById("prdName").innerText += ` ${currProduct.title}`;
    document.getElementById("prdCategory").innerText += ` ${currProduct.category}`;
    document.getElementById("prdDesc").innerText += ` ${currProduct.description}`;
}else{
    location.href="./index.html"
}





// localStorage.setItem("currLoginUserId", 1)

addToCartBtn.addEventListener("click", () => {
    if(currLoginUserId){
        getUserInfo();
    }else{
        location.href="./login.html";
    }
})

let fetchedUserData = {};

function getUserInfo(){
    fetch("https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/" + currLoginUserId)
    .then(res => res.json())
    .then(data => {
        fetchedUserData = data;
        console.log(fetchedUserData);
        addCartIntoUserAPI(fetchedUserData);
    }).catch(er => {
        console.log(er);
    })
}

function addCartIntoUserAPI(data){
    let flag = false;
    data.cart.forEach((element) => {
        if(element.id==currProduct.id){
            flag = true;
            return
        }
    })
    if(flag){
        alert("Already added into Cart");
    }else{
        alert("Successfully added into cart");
        data.cart.push(currProduct);
        fetchedUserData = data;

        fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`,{
                method:"PUT",
                body:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })


    }
    console.log(data);
}



// BUY NOW BUTTON 

let buyNowBtnClick = document.getElementById("buyNowBtn")
let addressFormEL = document.getElementById("address-form")

buyNowBtnClick.addEventListener("click", () => {
    if(currLoginUserId){
        autoFillAddress()
    }else{
        location.href="./login.html";
    }
})

let LoginUserInCartPage = {}
async function autoFillAddress(){
    try {
        let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`)
        let data = await res.json()
        LoginUserInCartPage = data
        if(LoginUserInCartPage.address.name){
            addressFormEL.addressName.value = LoginUserInCartPage.address.name
            addressFormEL.addressPhone.value = LoginUserInCartPage.address.phone
            addressFormEL.addressDetail.value = LoginUserInCartPage.address.address
            addressFormEL.addressPinCode.value = LoginUserInCartPage.address.pinCode
        }
        
    } catch (error) {
        console.log(error);
    }
}


addressFormEL.addEventListener("submit", (event)=> {
    event.preventDefault();
    alert("Order Succeesfull")

    // add address
    LoginUserInCartPage.address.name = addressFormEL.addressName.value 
    LoginUserInCartPage.address.phone =  addressFormEL.addressPhone.value
    LoginUserInCartPage.address.address = addressFormEL.addressDetail.value
    LoginUserInCartPage.address.pinCode = addressFormEL.addressPinCode.value

    // add product in order Array and delete from cart Array
    LoginUserInCartPage.order.push(...LoginUserInCartPage.cart)

    putDataInUserAPI(LoginUserInCartPage)
    document.getElementById("exampleModal").style.display = "none"

})

function putDataInUserAPI(data){
    fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`,{
                method:"PUT",
                body:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
}