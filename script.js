let inputSearchEl = document.querySelector(".searchInput");
let recentSearch = []
let inputSearchForm = document.getElementById("inputSearchForm");

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
    location.href="./login.html";
})
