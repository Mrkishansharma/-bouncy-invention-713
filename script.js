// import {kkk} from "./product.js"
let inputSearchEl = document.querySelector(".searchInput");
let recentSearch = []
let inputSearchForm = document.getElementById("inputSearchForm");

let userNameDisplay = document.getElementById("userNameDisplay");
let loginLogoutBtn = document.getElementById("loginLogoutBtn");

// kkk()
//  show & hide close-search-icon
inputSearchEl.addEventListener("keydown", ()=>{
    document.querySelector(".closeIcon").style.display=inputSearchEl.value ? "block" : "none";
});

inputSearchForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    

    recentSearch.push(inputSearchEl.value);
    let searchInnerData = ""
    if(recentSearch.length){
        recentSearch.forEach((element) => {
            searchInnerData += `<div class="recentItem">
                            <i class="fa-solid fa-rotate-left"></i>
                            <p>${element}</p>
                        </div>`
        })
    }

    document.querySelector(".listOfRecent").innerHTML = searchInnerData;
    searchProductFunc(inputSearchEl.value)
    document.getElementById("posterHataneKeLiyeId").style.display="none"
})

async function searchProductFunc(s){
    var res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products?title=${s}`)
    var d = await res.json()
    displayProducts(d)

}
productsSection = document.querySelector(".productsSection");
function displayProducts(data){
    productsSection.innerHTML = ""
    let cartDataInnerHTML = ""
    data.forEach((element) => {
        cartDataInnerHTML += `<div onclick="addToLS(${element.id})">
                                    <div class="cartImg">
                                        <img src="${element.avatar}" alt="">
                                    </div>
                                    <div class="cartDetail">
                                        <h6>${element.title}</h6>
                                        <h5><i class="fa-solid fa-indian-rupee-sign"></i> ${element.price}</h5>
                                        <p class="freeDeleveryTag">Free Deleviry</p>
                                        <div class="cartRating">
                                            <p>${element.rating%5} ⭐</p>
                                            <p>${element.reviews*153} Reviews</p>
                                        </div>
                                    </div>
                                </div>`;
         
    })
    productsSection.innerHTML = cartDataInnerHTML;
}

document.querySelector("#loginLogoutBtn").addEventListener("click", ()=> {
    localStorage.removeItem("currLoginUserId")
    if(loginLogoutBtn.innerText=="SignUp"){
        location.href="./login.html";
    }else{
        location.href="./index.html";
        // location.reload()
    }
})


let currLoginUser = {}

findLoginUserName()
function findLoginUserName(){
    let currLoginUserId = JSON.parse(localStorage.getItem("currLoginUserId"))
    console.log("currLoginUserId", currLoginUserId);
    if(currLoginUserId){
        currLoginUserId=+currLoginUserId
        fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`)
        .then(res => res.json())
        .then(data => {
            currLoginUser = data
            displayLoginUserName(currLoginUser);
        }).catch(er => {
            console.log("Please SignUp for Better expericene");
        })

    }
}

function displayLoginUserName(currLogedInUser){
    if(currLogedInUser.address.name){
        userNameDisplay.innerText = currLogedInUser.address.name;
    }else{
        userNameDisplay.innerText = currLogedInUser.mobileNumber;
    }

    userNameDisplay.style.color = "#666666";
    loginLogoutBtn.innerText = "Logout"
    loginLogoutBtn.style.backgroundColor = "#fb3a3a"
    loginLogoutBtn.style.color = "white"
}




// cart button
let cartContainer = document.querySelector(".cartContainer")
cartContainer.addEventListener("click", ()=> {
    let login_user_id  = JSON.parse(localStorage.getItem("currLoginUserId"))
    if(login_user_id){
        location.href="./cart.html"
    }else{
        location.href="./login.html"
    }
})