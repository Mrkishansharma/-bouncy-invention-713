let cartPage = document.querySelector(".cartPage")
let emptyCartPage = document.querySelector(".p--emptyCartPage")
let cartShowEl = document.querySelector(".cartShow");
let totalProductPrice = document.getElementById("totalProductPrice");
let totalOrderPrice = document.getElementById("totalOrderPrice");
let totalQty = document.getElementById("totalQty")


function hideCartPageData(){
    cartPage.style.display="none" 
    emptyCartPage.style.display="block"
}
function goTOProductPage(){
    location.href="./product.html"
}

let currLoginUserId = JSON.parse(localStorage.getItem("currLoginUserId"));

let userInCartPage = {};

fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`)
.then(res => res.json())
.then(data => {
    userInCartPage = data
    displayAllCartData(userInCartPage)
}).catch(er => {
    console.log(er);
})

function displayAllCartData(data){
    if(data.cart.length==0){
        hideCartPageData()
    }
    let totalPrice = 0
    let countQty = 0
    cartShowEl.innerHTML = ""
    console.log(data.cart);
    let printKaData = ""
    data.cart.forEach((element, index) =>{
        printKaData += `
        <div>
            <div>
                <img src="${element.avatar}" id="prdImage" alt="">
            </div>
            <div>
                <p id="prdTitle">${element.title}</p>
                <div class="price--cartPrd">
                    <i class="fa-solid fa-indian-rupee-sign"></i>
                    <span id="prdPrice">${element.price}</span>
                </div>
                <div>
                    <span class="qty-cartPrd">
                        Qty: 
                        <button id="decreaseQty" onclick="descreaseQty(${element.id})"> - </button>
                        <span id="prdQnatity"> ${element.quantity}</span>
                        <button id="increaseQty" onclick="increaseQty(${element.id})"> + </button>
                    </span>
                    <button id="prdRemove" onclick="deleteProduct(${element.id})"> <i class="fa-solid fa-xmark"></i> Remove </button>
                </div>
            </div>
        </div>`

        totalPrice += (element.price*element.quantity)
        countQty += element.quantity
    })

    // console.log(printKaData);

    totalOrderPrice.innerHTML = totalPrice
    totalProductPrice.innerHTML = totalPrice
    cartShowEl.innerHTML = printKaData
    totalQty.innerHTML = countQty
}


function putDataInUserAPI(data){
    fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users/${currLoginUserId}`,{
                method:"PUT",
                body:JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
}

function descreaseQty(id){
    userInCartPage.cart.forEach(element => {
        if(element.id==id){
            if(element.quantity==1){
                return
            }else{
                element.quantity--
                return
            }
        }
    })
    displayAllCartData(userInCartPage) 
    putDataInUserAPI(userInCartPage)
}
function increaseQty(id){
    userInCartPage.cart.forEach(element => {
        if(element.id==id){
            element.quantity++
            return
        }
    })
    displayAllCartData(userInCartPage) 
    putDataInUserAPI(userInCartPage)
}

function deleteProduct(id){
    userInCartPage.cart.forEach((element, index) => {
        if(element.id==id){
            userInCartPage.cart.splice(index,1)
            return
        }
    })
    displayAllCartData(userInCartPage) 
    putDataInUserAPI(userInCartPage)
}



// ********************ADDRESS FORM & ORDER **********************

let addressFormEL = document.getElementById("address-form")
let continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", ()=> {
    if(userInCartPage.address.name){
        addressFormEL.addressName.value = userInCartPage.address.name
        addressFormEL.addressPhone.value = userInCartPage.address.phone
        addressFormEL.addressDetail.value = userInCartPage.address.address
        addressFormEL.addressPinCode.value = userInCartPage.address.pinCode
    }
})

addressFormEL.addEventListener("submit", (event)=> {
    event.preventDefault();
    alert("Order Succeesfull")

    // add address
    userInCartPage.address.name = addressFormEL.addressName.value 
    userInCartPage.address.phone =  addressFormEL.addressPhone.value
    userInCartPage.address.address = addressFormEL.addressDetail.value
    userInCartPage.address.pinCode = addressFormEL.addressPinCode.value

    // add product in order Array and delete from cart Array
    userInCartPage.order.push(...userInCartPage.cart)
    userInCartPage.cart.length=0

    putDataInUserAPI(userInCartPage)
    displayAllCartData(userInCartPage)
    document.getElementById("exampleModal").style.display = "none"

})