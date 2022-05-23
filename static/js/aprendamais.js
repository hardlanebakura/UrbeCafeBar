var categoryListField1 = document.getElementsByClassName("category_list_field");
var categoryListField2 = document.getElementsByClassName("category_list_field_1");
var favoritesNumber = document.getElementsByClassName("hm_favorites_number")[0];
var cartNumber = document.getElementsByClassName("hm_cart_number")[0];

var categoryFields = Array.from(categoryListField1).concat(Array.from(categoryListField2));

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


var cartitems = [];
var listoftitles = []
var listofpricings = []
var listofimagesources = []
if (sessionStorage.getObj('cartitems') == null) sessionStorage.setObj('cartitems', []);
if (sessionStorage.getObj('favitems') == null) sessionStorage.setObj('favitems', []);
favoritesNumber.innerHTML = sessionStorage.getObj('favitems').length;
cartNumber.innerHTML = sessionStorage.getObj('cartitems').length;

var titlecafe = document.getElementsByClassName("titlecafe")[0];
titlecafe.innerHTML = "APRENDA MAIS";

items.forEach(e => {

    for (const [key, value] of Object.entries(e)) {
        if (key == 'title') listoftitles.push(value);
        if (key == 'pricing') listofpricings.push(value);
        if (key == 'imagesource') listofimagesources.push(value);
    }

})

var mrow = document.getElementsByClassName("mrow");
mrow[mrow.length - 1].style.display = "flex";
mrow[mrow.length - 1].style.justifyContent = "center";

var listOfIndexes = [];

for (let i = 0; i < categoryFields.length; i++) {

    let addRedCartsOnLoad = categoryFields[i].parentNode.children[0].children[0].getElementsByTagName("img")[0].getAttribute("src");
    //list of imagesources on page
    if (addRedCartsOnLoad.substr(0, 2) == "./") addRedCartsOnLoad = addRedCartsOnLoad.slice(2);
    let j = categoryFields[i].parentNode.children[1].children[1].children[0].children.item(0).getAttribute("src");
    if (j.substr(0, 2) == "./") j = j.slice(2);
    let elemindex = listofimagesources.indexOf(addRedCartsOnLoad);
    listOfIndexes.push(elemindex);

    for (let elem = 0; elem < listOfIndexes.length; elem++) {

        var j_2 = categoryFields[elem].parentNode.children[1].children[0].children[0].children.item(0);
        //j2 = img1
        var j2 = categoryFields[elem].parentNode.children[1].children[1].children[0].children.item(0);
        //j2 = img2

        if (sessionStorage.getObj('favitems').length != 0 && sessionStorage.getObj('favitems').includes(listOfIndexes[elem])) {

            //let j2 = categoryFields[elem].parentNode.children[1].children[1].children[0].children.item(0);
            j_2.setAttribute("src", "static/images/hm_favorite_2_activated.png");
            //change color for those indexes
        } else if (sessionStorage.getObj('favitems').length != 0 && (sessionStorage.getObj('favitems').includes(listOfIndexes[elem]) == false)) {
            ////if item was removed on cart on different page remove it on this page
            j_2.setAttribute("src", "static/images/hm_favorite_2.png");
        }

        if (sessionStorage.getObj('favitems').length == 0) categoryFields[i].parentNode.children[1].children[0].children[0].children.item(0).setAttribute("src", "static/images/hm_favorite_2.png");

        if (sessionStorage.getObj('cartitems').length != 0 && sessionStorage.getObj('cartitems').includes(listOfIndexes[elem])) {

            //let j2 = categoryFields[elem].parentNode.children[1].children[1].children[0].children.item(0);
            j2.setAttribute("src", "static/images/hm_2_cart_2_a.png");
            //change color for those indexes
        } else if (sessionStorage.getObj('cartitems').length != 0 && (sessionStorage.getObj('cartitems').includes(listOfIndexes[elem]) == false)) {
            ////if item was removed on cart on different page remove it on this page
            j2.setAttribute("src", "static/images/hm_2_cart_2.png");
        }

        if (sessionStorage.getObj('cartitems').length == 0) categoryFields[i].parentNode.children[1].children[1].children[0].children.item(0).setAttribute("src", "static/images/hm_2_cart_2.png");

    }

    categoryFields[i].addEventListener("click", event => {

        if (event.target && event.target.matches(".favorite_img1")) {

            var j3 = 0;
            var titlecafe = document.getElementsByClassName("titlecafe")[0];
            titlecafe.innerHTML = "APRENDA MAIS";

            //this variable is needed so that image does not immediately jump to the next event.target

            if (event.target.getAttribute("src") == "static/images/hm_favorite_2.png") {

                event.target.setAttribute("src", "static/images/hm_favorite_2_activated.png");
                j3 = 1;
                favoritesNumber.innerText = (parseInt(favoritesNumber.innerText) + 1).toString();
                let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
                //if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
                if (targetimagesrc.substr(0, 2) == "./") targetimagesrc = targetimagesrc.slice(2);
                let elementindex = listofimagesources.indexOf(targetimagesrc);
                if (!(sessionStorage.getObj('favitems').includes(elementindex))) {

                    let k = sessionStorage.getObj('favitems');
                    k.push(elementindex);
                    sessionStorage.setObj('favitems', k);
                    favoritesNumber.innerHTML = sessionStorage.getObj('favitems').length;

                }

            }
            //now it will not jump without need to this part before next click

            if (event.target.getAttribute("src") == "static/images/hm_favorite_2_activated.png" && j3 == 0) {

                event.target.setAttribute("src", "static/images/hm_favorite_2.png");
                favoritesNumber.innerText = (parseInt(favoritesNumber.innerText) - 1).toString();
                let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
                //if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
                if (targetimagesrc.substr(0, 2) == "./") targetimagesrc = targetimagesrc.slice(2);
                let elementindex = listofimagesources.indexOf(targetimagesrc);
                let k = sessionStorage.getObj('favitems');
                k = k.filter(e => e !== elementindex);
                sessionStorage.setObj('favitems', k);
                favoritesNumber.innerHTML = sessionStorage.getObj('favitems').length;

            }

        }

        if (event.target && event.target.matches(".favorite_img2")) {

            var j1 = 0;
                //this variable is needed so that image does not immediately jump to the next event.target

            if (event.target.getAttribute("src") == "static/images/hm_2_cart_2.png") {

                event.target.setAttribute("src", "static/images/hm_2_cart_2_a.png");
                j1 = 1;
                cartNumber.innerText = (parseInt(cartNumber.innerText) + 1).toString();
                let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
                //if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
                if (targetimagesrc.substr(0, 2) == "./") targetimagesrc = targetimagesrc.slice(2);
                let elementindex = listofimagesources.indexOf(targetimagesrc);
                if (!(sessionStorage.getObj('cartitems').includes(elementindex))) {

                    let k = sessionStorage.getObj('cartitems');
                    k.push(elementindex);
                    sessionStorage.setObj('cartitems', k);
                    cartNumber.innerHTML = sessionStorage.getObj('cartitems').length;

                }
                //sessionStorage.setObj('cartitems', cartitems);

            }
            //now it will not jump without need to this part before next click

            if ((event.target.getAttribute("src") == "static/images/hm_2_cart_2_a.png") && j1 == 0) {

                event.target.setAttribute("src", "static/images/hm_2_cart_2.png");
                cartNumber.innerText = (parseInt(cartNumber.innerText) - 1).toString();
                let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
                //if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
                if (targetimagesrc.substr(0, 2) == "./") targetimagesrc = targetimagesrc.slice(2);
                let elementindex = listofimagesources.indexOf(targetimagesrc);
                let k = sessionStorage.getObj('cartitems');
                k = k.filter(e => e !== elementindex);
                sessionStorage.setObj('cartitems', k);
                cartNumber.innerHTML = sessionStorage.getObj('cartitems').length;

            }

        }

    })

}