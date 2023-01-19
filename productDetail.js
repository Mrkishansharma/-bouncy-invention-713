let addToCartBtn = document.getElementById("addToCartBtn");
let buyNowBtn = document.getElementById('buyNowBtn');


let currProduct = JSON.parse(localStorage.getItem("currProduct"));
let currLoginUserId = localStorage.getItem("currLoginUserId");
console.log(currProduct);


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