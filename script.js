let inputSearchEl = document.querySelector(".searchInput");
let recentSearch = []
let inputSearchForm = document.getElementById("inputSearchForm");

let userNameDisplay = document.getElementById("userNameDisplay");
let loginLogoutBtn = document.getElementById("loginLogoutBtn");

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
    console.log(searchInnerData);
    document.querySelector(".listOfRecent").innerHTML = searchInnerData;
})

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
        fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            currLoginUser = data
            displayLoginUserName(currLoginUser);
        }).catch(er => {
            console.log("Please SignUp for Better expericene");
        })

    }
}

function displayLoginUserName(currLogedInUser){
    userNameDisplay.innerText = currLogedInUser.mobileNumber;
    userNameDisplay.style.color = "green";
    loginLogoutBtn.innerText = "Logout"
    loginLogoutBtn.style.backgroundColor = "red"
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