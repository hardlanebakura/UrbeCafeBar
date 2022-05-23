var toGold = document.getElementsByClassName("gold");
var searchbarContent = document.getElementsByClassName("searchbar_content")[0];
var searchbar2Content = document.getElementsByClassName("searchbar_2_content")[0];
var searchbar3Content = document.getElementsByClassName("searchbar_3_content")[0];
var searchbar4Content = document.getElementsByClassName("searchbar_4_content")[0];
var searchContentItems = document.getElementsByClassName("search_content_items")[0];

for (let i = 0; i < toGold.length; i++) {

    toGold[i].addEventListener("mouseover", event => {

        toGold[i].style.color = "#ffdb00";

    })


}

for (let i = 0; i < toGold.length; i++) {

    toGold[i].addEventListener("mouseout", event => {

        toGold[i].style.color = "#222";

    })


}

var listOfTitles = [];
var listOfPricings = [];
var listOfImageSources = [];

items.forEach(e => {

    for (const [key, value] of Object.entries(e)) {
        if (key == 'title') listOfTitles.push(value);
        if (key == 'pricing') listOfPricings.push(value);
        if (key == 'imagesource') listOfImageSources.push(value);
    }

})

for (let i = 0; i < listOfTitles.length; i++) searchContentItems.insertAdjacentHTML("beforeend", `<div class = "search1"><div class = "search11">${listOfTitles[i]}</div></div>`)

var search1 = document.getElementsByClassName("search1");
var search11 = document.getElementsByClassName("search11");
for (let i = 0; i < search11.length; i++) {
    if (i > 7) search11[i].style.display = "none";
}

for (let i = 0; i < search1.length; i++) {

    searchbarContent.addEventListener("focusin", event => {

        search1[i].style.display = "block";
        searchContentItems.nextElementSibling.style.marginTop = "-40px";

        search11[i].addEventListener("click", event => {

            searchbarContent.value = search11[i].innerText;

        })

    })

}

function searchbar() {

    filter = searchbarContent.value.toUpperCase();


    var j = 0; //max of 7 items in searchbar

    for (let i = 0; i < items.length; i++) {

        var search_content = listOfTitles[i];
        var txtValue = search_content;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            search11[i].style.display = "";
            j = j + 1;
            if (j > 7) search11[i].style.display = "none";
        } else {
            search11[i].style.display = "none";
        }

    }

}

function validate_Form_1() {

    var elementIndex = listOfTitles.indexOf(searchbarContent.value);
    searchbar2Content.value = elementIndex;
    searchbar3Content.value = listOfPricings[elementIndex];
    searchbar4Content.value = listOfImageSources[elementIndex];

}


//styling
if (window.location.href.includes("cart")) {

    var footerMenu = document.getElementsByClassName("footermenu")[0];
    var cartNumber = document.getElementsByClassName("hm_cart_number")[0];
    footerMenu.style.marginTop = (419 - parseInt(cartNumber.innerText) * 117).toString() + "px";

}

//styling
if (window.location.href.includes("fav")) {

    var footerMenu = document.getElementsByClassName("footermenu")[0];
    var favNumber = document.getElementsByClassName("hm_favorites_number")[0];
    footerMenu.style.marginTop = (460 - parseInt(favNumber.innerText) * 117).toString() + "px";

}