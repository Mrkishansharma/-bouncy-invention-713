$(".nav").click(function () {
    $("#mySidenav").css('width', '70px');
    $("#main").css('margin-left', '70px');
    $(".logo").css('visibility', 'hidden');
    $(".logo span").css('visibility', 'visible');
    $(".logo span").css('margin-left', '-10px');
    $(".icon-a").css('visibility', 'hidden');
    $(".icons").css('visibility', 'visible');
    $(".icons").css('margin-left', '-8px');
    $(".nav").css('display', 'none');
    $(".nav2").css('display', 'block');
});

$(".nav2").click(function () {
    $("#mySidenav").css('width', '300px');
    $("#main").css('margin-left', '300px');
    $(".logo").css('visibility', 'visible');
    $(".icon-a").css('visibility', 'visible');
    $(".icons").css('visibility', 'visible');
    $(".nav").css('display', 'block');
    $(".nav2").css('display', 'none');
});



let isLogedInAdmin = JSON.parse(localStorage.getItem("isLogedInAdmin"))
if(!isLogedInAdmin){
    location.href = "../login.html"
}
function logoutAdminFunc(){
    localStorage.removeItem("isLogedInAdmin");
    location.href = "../login.html"
}

let DashboardPage = document.getElementById("Dashboard--page")
let CustomerPage = document.getElementById("Customer--page")
let ProductPage = document.getElementById("Product--page")
let OrderPage = document.getElementById("Order--page")




// when page load first show Dasboard Page
goToDashboardPage();

function goToDashboardPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Dashboard";
    document.getElementById("headingOfPage2").innerHTML = "☰ Dashboard";
    DashboardPage.style.display="block";
    CustomerPage.style.display="none";
    ProductPage.style.display="none";
    OrderPage.style.display="none";

    
    fetchAllUser();
    async function fetchAllUser(){
        try {
            let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users`)
            let data = await res.json();
            dashboardMeUser(data)
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllProducts()
    async function fetchAllProducts(){
        try {
            let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products`)
            let data = await res.json();
            dashboardMeProduct(data)
        } catch (error) {
            console.log(error);
        }
    }
}


let Dashboard_Customers = document.getElementById("Dashboard-Customers")
let Dashboard_Products = document.getElementById("Dashboard-Products")
let Dashboard_Orders = document.getElementById("Dashboard-Orders")
let Dashboard_Revenue= document.getElementById("Dashboard-Revenue")


function dashboardMeUser(data){
    Dashboard_Customers.innerHTML = ` ${data.length}<br /><span>Customers</span> `
    
    let count_total_order = 0
    let find_total_revenue = 0
    data.forEach(item => {
        item.order.forEach(element => {
            count_total_order += element.quantity
            find_total_revenue += (element.quantity * element.price)
            
        })
    })
    Dashboard_Orders.innerHTML = ` ${count_total_order}<br/><span>Orders</span>`
    Dashboard_Revenue.innerHTML = `${find_total_revenue}<br /><span>Revenue</span>`

    

}
function dashboardMeProduct(data){
    Dashboard_Products.innerHTML = `${data.length}<br /><span>Products</span>`
}




function goToCustomerPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Customers Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Customers Details";
    DashboardPage.style.display="none";
    CustomerPage.style.display="block";
    ProductPage.style.display="none";
    OrderPage.style.display="none";

    let customerTableBody = document.querySelector("#customerTable tbody")
    
    fetchAllUser()
    async function fetchAllUser(){
        try {
            let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users`)
            let data = await res.json()
            displayAllCustomer(data);
        } catch (error) {
            console.log(error);
        }
    }

    function displayAllCustomer(data){
        customerTableBody.innerHTML = ""
        let customerkaHTML = ""
        data.forEach((element,index) => {
            customerkaHTML += `<tr>
                <td>${element.id}</td>
                <td>${element.address.name || "-" }</td>
                <td>${element.mobileNumber}</td>
                <td>${element.order.length}</td>
                <td>${element.address.address || "-"}</td>
            </tr>`
        })
        customerTableBody.innerHTML = customerkaHTML
    }
}


function goToProductPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Product Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Product Details";
    DashboardPage.style.display="none";
    CustomerPage.style.display="none";
    ProductPage.style.display="block";
    OrderPage.style.display="none";

    let productTableBody = document.querySelector("#productTable tbody")
    fetchAllUser()
    async function fetchAllUser(){
        try {
            let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products`)
            let data = await res.json()
            displayAllProduct(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    function displayAllProduct(data){
        productTableBody.innerHTML = ""
        let customerkaHTML = ""
        data.forEach((element,index) => {
            customerkaHTML += `<tr>
                <td>${element.id}</td>
                <td><img src="${element.avatar}" />
                </td>
                <td>${element.title}</td>
                <td>${element.category}</td>
                <td class="priceShiSetKarna"><i class="fa-solid fa-indian-rupee-sign"></i> ${element.price}</td>
                <td>${element.description}</td>
                <td>${element.rating%5}⭐</td>
                <td class="editBtn"  onclick="editProductFunc(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModal2"
                data-bs-whatever="@getbootstrap" >EDIT</td>
                <td class="removeBtn" onclick="removeProductFunc(${element.id})">REMOVE</td>
            </tr>`
        })
        productTableBody.innerHTML = customerkaHTML
    }
}



// REMOVE PRODUCT
async function removeProductFunc(id){

    try {
        let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        alert("Product Deleted")
        location.reload();
    } catch (error) {
        console.log("errrrr",error);
    }
}




// EDIT PRODUCT
async function editProductFunc(id){
    console.log("chala rha hai ", id);
    try {
        let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products/${id}`)
        let data = await res.json()
        document.getElementById("n_title").value = data.title
        document.getElementById("n_category").value = data.category
        document.getElementById("n_price").value = data.price
        document.getElementById("n_url").value = data.avatar
        document.getElementById("n_description").value = data.description
    } catch (error) {
        console.log(error);
    }

    let editProductForm = document.getElementById("editProduct-form");
    editProductForm.addEventListener("submit", (event)=> {
        event.preventDefault();
        let obj = {
            title: editProductForm.n_title.value,
            avatar: editProductForm.n_url.value,
            price: editProductForm.n_price.value,
            category: editProductForm.n_category.value,
            description : editProductForm.n_category.value
        }
        PutProductIntoAPI(id,obj)
    })
}

async function PutProductIntoAPI(id,obj){
    try {
        let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        alert("Successfully updated")
    } catch (error) {
        console.log(error)
    }
}



// ADD NEW PRODUCT
let addProductForm = document.getElementById("addProduct-form")
addProductForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    let obj = {
        title: addProductForm.new_title.value,
        avatar: addProductForm.new_url.value,
        price: addProductForm.new_price.value,
        category: addProductForm.new_category.value,
        description : addProductForm.new_description.value
    }

    postProductIntoAPI(obj)
    alert("Product Successfully Added!")
    location.reload()
    
})

async function postProductIntoAPI(obj){
    try {
        let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
}




async function goToOrderPage(){
    document.getElementById("headingOfPage").innerHTML = "☰ Order Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Order Details";
    DashboardPage.style.display="none";
    CustomerPage.style.display="none";
    ProductPage.style.display="none";
    OrderPage.style.display="block";

    let orderTableBody = document.querySelector("#customerTable tbody")
    fetchAllUser()
    async function fetchAllUser(){
        try {
            let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/users`)
            let data = await res.json()
            displayAllCustomer(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    function displayAllCustomer(data){
        // orderTableBody.innerHTML = ""
        document.getElementById("tbbody").innerHTML = ""
        let orderkaHTML = ""
        data.forEach((element,index) => {
            element.order.forEach((elem => {
                orderkaHTML += `<tr>
                    <td>${elem.id}</td>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td>${elem.quantity}</td>
                    <td>${element.id}</td>
                    <td>${element.address.name}</td>
                    <td>${element.address.address}</td>
                    <td>${elem.price*elem.quantity} /-</td>
                </tr>`
            }))
        })
        // console.log(data);
        // console.log("caaaa",orderTableBody)
        // orderTableBody.innerHTML = "customerkaHTML"
        document.getElementById("tbbody").innerHTML = orderkaHTML
        console.log("0000",orderTableBody)
    }
}