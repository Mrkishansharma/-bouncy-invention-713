let productsSection = document.querySelector(".productsSection");


let fetchedData = []


fetch("https://63c8fd2e320a0c4c953e48fb.mockapi.io/products")
.then(res => res.json())
.then(data => {
    console.log(data);
    fetchedData = data;
    displayProducts(fetchedData);
}).catch(er => {
    console.log(er);
})


function displayProducts(data){
    productsSection.innerHTML = ""
    let cartDataInnerHTML = ""
    data.forEach((element,index) => {
        cartDataInnerHTML += `<div onclick="addToLS(${element.id})">
                                    <div class="cartImg">
                                        <img src="${element.avatar}" alt="">
                                    </div>
                                    <div class="cartDetail">
                                        <h3>${element.title}</h3>
                                        <h2>RS. ${element.price}</h2>
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

function addToLS(id){
    localStorage.setItem("currProduct", JSON.stringify(fetchedData[id-1]))
    location.href="./productDetail.html"
}