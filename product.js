let productsSection = document.querySelector(".productsSection");
let filterCategory = document.getElementById("filterCategory")

let fetchedData = []


xyz()
async function xyz(){
    try {
        let res = await fetch("https://63c8fd2e320a0c4c953e48fb.mockapi.io/products");
        let data = await res.json();
        fetchedData = data;
        displayProducts(fetchedData);
        showAllCategory(fetchedData);
    } catch (error) {
        console.log(error);
    }
}

function showAllCategory(data){
    categoryArr = []
    data.forEach(element => {
        categoryArr.push(element.category)
    })
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var unique = categoryArr.filter(onlyUnique);

    let filterCategoryDataHTML = "<h5>Category</h5>"
    unique.forEach(element => {
        filterCategoryDataHTML += `<div><input type="radio" name="category" value="${element}"><span>${element}</span></div>`
    })
    filterCategory.innerHTML = filterCategoryDataHTML;

    var category_filter_EL = document.querySelectorAll('input[type=radio][name="category"]');
    async function changeHandler(event) {
        let r = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products?category=${this.value}`)
        let d = await r.json()
        displayProducts(d)
    }
    Array.prototype.forEach.call(category_filter_EL, function(radio) {
        radio.addEventListener('change', changeHandler);
    });
}

function displayProducts(data){
    productsSection.innerHTML = ""
    // let cartDataInnerHTML = ""
    data.forEach((element) => {
        // cartDataInnerHTML += `<div onclick="addToLS(${element})">
        //                             <div class="cartImg">
        //                                 <img src="${element.avatar}" alt="">
        //                             </div>
        //                             <div class="cartDetail">
        //                                 <h6>${element.title}</h6>
        //                                 <h5><i class="fa-solid fa-indian-rupee-sign"></i> ${element.price}</h5>
        //                                 <p class="freeDeleveryTag">Free Deleviry</p>
        //                                 <div class="cartRating">
        //                                     <p>${element.rating%5} ⭐</p>
        //                                     <p>${element.reviews*153} Reviews</p>
        //                                 </div>
        //                             </div>
        //                         </div>`;
        let div = document.createElement("div")

        let d1 = document.createElement("div")
        d1.setAttribute("class", "cartImg")
        let img = document.createElement("img")
        img.src = element.avatar
        d1.append(img)

        let d2 = document.createElement("div")
        d2.setAttribute("class", "cartDetail")
        let h6 = document.createElement("h6")
        h6.innerText = element.title
        let h5 = document.createElement("h5")
        h5.innerText = element.price
        let p = document.createElement("p")
        p.setAttribute("class", "freeDeleveryTag")
        p.innerText = "Free Deleviry"

        let d3 = document.createElement("div")
        d3.setAttribute("class","cartRating")
        let p2 = document.createElement("p")
        p2.innerText = element.rating%5 + "⭐"
        let p3 = document.createElement("p")
        p3.innerText = element.reviews*153 + "Reviews"
        d3.append(p2,p3)

        d2.append(h6,h5,p,d3)


        div.append(d1,d2)
        div.addEventListener("click", ()=> {
            localStorage.setItem("currProduct", JSON.stringify(element))
            location.href = "./productDetail.html"
        })
        productsSection.append(div)
         
    })
    // productsSection.innerHTML = cartDataInnerHTML;
}


// function addToLS(id){
//     localStorage.setItem("currProduct", JSON.stringify(id))
//     location.href="./productDetail.html"
// }


// *********** Filter Functionality **********************

let priceSort = document.getElementById("priceSort")
priceSort.addEventListener("change", priceSortFunc)

async function priceSortFunc(){
    sortBy = priceSort.value=="LTH" ? "asc" : "desc"
    try {
        let res = await fetch(`https://63c8fd2e320a0c4c953e48fb.mockapi.io/products?sortBy=price&order=${sortBy}`)
        let d = await res.json()
        displayProducts(d)
    } catch (error) {
        console.log(error);
    }
}


var priceValueELL = document.querySelectorAll('input[type=radio][name="PriceValue"]');
function handlePriceValueFunc(event) {
    var lower = -Infinity, upper=Infinity
    if(this.value=="ZeroToNinetynine"){
        lower=0, upper=99
    }else if(this.value=="oneHunderedToOneNininetynine"){
        lower=100, upper=199
    }else if(this.value=="twoHunderedToTowNininetynine"){
        lower=200, upper=299
    }else if(this.value=="threeHunderedToThreeNininetynine"){
        lower=300, upper=399
    }else if(this.value=="fourHunderedToFourNininetynine"){
        lower=400, upper=499
    }else if(this.value=="fiveHunderedToFiveNininetynine"){
        lower=500, upper=599
    }else if(this.value=="sixHunderedToSixNininetynine"){
        lower=600, upper=699
    }else if(this.value=="sevenHunderedToNineNininetynine"){
        lower=700, upper=999
    }else if(this.value=="oneThousandAbove"){
        lower=1000
    }

    var filterdData = fetchedData.filter(element => {
        return element.price>=lower && element.price<=upper
    })
    displayProducts(filterdData)
}
Array.prototype.forEach.call(priceValueELL, function(radio) {
   radio.addEventListener('change', handlePriceValueFunc);
});





var sortRatingELL = document.querySelectorAll('input[type=radio][name="rating"]');

function handleRatingFunc(event) {
    rat = 5
    if(this.value=="One") rat = 1
    else if(this.value=="Two") rat = 2
    else if(this.value=="Three") rat = 3
    else if(this.value=="Four") rat = 4
    else if(this.value=="Five") rat = 5
    var filterdData = fetchedData.filter(element => {
        return element.rating%5==rat
    })
    displayProducts(filterdData)
}

Array.prototype.forEach.call(sortRatingELL, function(radio) {
   radio.addEventListener('change', handleRatingFunc);
});


