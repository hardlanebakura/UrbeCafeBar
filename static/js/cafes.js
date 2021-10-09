var category_list_field = document.getElementsByClassName("category_list_field");
var category_list_field_1 = document.getElementsByClassName("category_list_field_1");
var hm_favorites_number = document.getElementsByClassName("hm_favorites_number")[0];
var hm_cart_number = document.getElementsByClassName("hm_cart_number")[0];

var categoryfields = Array.from(category_list_field).concat(Array.from(category_list_field_1));
console.log(categoryfields.length);

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
hm_favorites_number.innerHTML = sessionStorage.getObj('favitems').length;
hm_cart_number.innerHTML = sessionStorage.getObj('cartitems').length;
console.log(sessionStorage.getObj('favitems'));
console.log(sessionStorage.getObj('cartitems'));
console.log(sessionStorage.getObj('cartitems').length);
var titlecafe = document.getElementsByClassName("titlecafe")[0];
titlecafe.innerHTML = "NOSSOS CAFÉS";

items.forEach(e => {

for (const [key, value] of Object.entries(e)) {
  if (key == 'title') listoftitles.push(value);
  if (key == 'pricing') listofpricings.push(value);
  if (key == 'imagesource') listofimagesources.push(value);
}

})

listofelemindexes = [];

for (let i = 0; i < categoryfields.length; i++) {

let addredcartsonload = categoryfields[i].parentNode.children[0].getAttribute("src");
//list of imagesources on page
console.log(addredcartsonload);
if (addredcartsonload.substr(0,2) == "./") addredcartsonload = addredcartsonload.slice(2);
console.log(addredcartsonload);
let j = categoryfields[i].parentNode.children[1].children[1].children[0].children.item(0).getAttribute("src");
if (j.substr(0,2) == "./") j = j.slice(2);
console.log(j);
//list of current images relative to items images
let elemindex = listofimagesources.indexOf(addredcartsonload);
listofelemindexes.push(elemindex);
console.log(listofelemindexes);
for (let elem = 0; elem < listofelemindexes.length; elem++) {

var j_2 = categoryfields[elem].parentNode.children[1].children[0].children[0].children.item(0);
//j2 = img1
var j2 = categoryfields[elem].parentNode.children[1].children[1].children[0].children.item(0);
//j2 = img2

if (sessionStorage.getObj('favitems').length != 0 && sessionStorage.getObj('favitems').includes(listofelemindexes[elem])) {

console.log("ASD" + listofelemindexes[elem]);
console.log(categoryfields[elem].parentNode.children[1].children[1].children);
//let j2 = categoryfields[elem].parentNode.children[1].children[1].children[0].children.item(0);
j_2.setAttribute("src", "static/images/hm_favorite_2_activated.png");
//console.log(j2);
//change color for those indexes
}

else if (sessionStorage.getObj('favitems').length != 0 && (sessionStorage.getObj('favitems').includes(listofelemindexes[elem]) == false)){
////if item was removed on cart on different page remove it on this page
j_2.setAttribute("src", "static/images/hm_favorite_2.png");
}

if (sessionStorage.getObj('favitems').length == 0) categoryfields[i].parentNode.children[1].children[0].children[0].children.item(0).setAttribute("src", "static/images/hm_favorite_2.png");

if (sessionStorage.getObj('cartitems').length != 0 && sessionStorage.getObj('cartitems').includes(listofelemindexes[elem])) {

console.log("ASD" + listofelemindexes[elem]);
console.log(categoryfields[elem].parentNode.children[1].children[1].children);
//let j2 = categoryfields[elem].parentNode.children[1].children[1].children[0].children.item(0);
j2.setAttribute("src", "static/images/hm_2_cart_2_a.png");
//console.log(j2);
//change color for those indexes
}

else if (sessionStorage.getObj('cartitems').length != 0 && (sessionStorage.getObj('cartitems').includes(listofelemindexes[elem]) == false)){
////if item was removed on cart on different page remove it on this page
j2.setAttribute("src", "static/images/hm_2_cart_2.png");
}

if (sessionStorage.getObj('cartitems').length == 0) categoryfields[i].parentNode.children[1].children[1].children[0].children.item(0).setAttribute("src", "static/images/hm_2_cart_2.png");

}

categoryfields[i].addEventListener("click", event => {

if(event.target && event.target.matches(".favorite_img1")) {

var j3 = 0;
console.log("1");
//this variable is needed so that image does not immediately jump to the next event.target

if (event.target.getAttribute("src") == "static/images/hm_favorite_2.png") {

console.log("1");
event.target.setAttribute("src", "static/images/hm_favorite_2_activated.png");
j3 = 1;
hm_favorites_number.innerText = (parseInt(hm_favorites_number.innerText) + 1).toString();
let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
//if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
console.log(targetimagesrc);
if (targetimagesrc.substr(0,2) == "./") targetimagesrc = targetimagesrc.slice(2);
console.log(targetimagesrc);
console.log(event.target.getAttribute("src"));
let elementindex = listofimagesources.indexOf(targetimagesrc);
if (!(sessionStorage.getObj('favitems').includes(elementindex))) {

let k = sessionStorage.getObj('favitems');
k.push(elementindex);
sessionStorage.setObj('favitems', k);
console.log(sessionStorage.getObj('favitems'));
hm_favorites_number.innerHTML = sessionStorage.getObj('favitems').length;

}

}
//now it will not jump without need to this part before next click

if (event.target.getAttribute("src") == "static/images/hm_favorite_2_activated.png" && j3 == 0) {

event.target.setAttribute("src", "static/images/hm_favorite_2.png");
hm_favorites_number.innerText = (parseInt(hm_favorites_number.innerText) - 1).toString();
let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
console.log(targetimagesrc);
//if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
if (targetimagesrc.substr(0,2) == "./") targetimagesrc = targetimagesrc.slice(2);
console.log(targetimagesrc);
let elementindex = listofimagesources.indexOf(targetimagesrc);
let k = sessionStorage.getObj('favitems');
k = k.filter(e => e !== elementindex);
sessionStorage.setObj('favitems', k);
hm_favorites_number.innerHTML = sessionStorage.getObj('favitems').length;

}

}

if(event.target && event.target.matches(".favorite_img2")) {

var j1 = 0;
console.log(event.target.getAttribute("src"))
//this variable is needed so that image does not immediately jump to the next event.target

if (event.target.getAttribute("src") == "static/images/hm_2_cart_2.png") {

event.target.setAttribute("src", "static/images/hm_2_cart_2_a.png");
j1 = 1;
hm_cart_number.innerText = (parseInt(hm_cart_number.innerText) + 1).toString();
let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
//if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
console.log(targetimagesrc);
if (targetimagesrc.substr(0,2) == "./") targetimagesrc = targetimagesrc.slice(2);
console.log(targetimagesrc);
console.log(event.target.getAttribute("src"));
let elementindex = listofimagesources.indexOf(targetimagesrc);
if (!(sessionStorage.getObj('cartitems').includes(elementindex))) {

let k = sessionStorage.getObj('cartitems');
k.push(elementindex);
sessionStorage.setObj('cartitems', k);
console.log(sessionStorage.getObj('cartitems'));
hm_cart_number.innerHTML = sessionStorage.getObj('cartitems').length;

}
//sessionStorage.setObj('cartitems', cartitems);

}
//now it will not jump without need to this part before next click

if ((event.target.getAttribute("src") == "static/images/hm_2_cart_2_a.png") && j1 == 0) {

console.log("1");
event.target.setAttribute("src", "static/images/hm_2_cart_2.png");
hm_cart_number.innerText = (parseInt(hm_cart_number.innerText) - 1).toString();
let targetimagesrc = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
console.log(targetimagesrc);
//if attribute src is "./static..." it will turn it to "static..." in order to match what is in the items
if (targetimagesrc.substr(0,2) == "./") targetimagesrc = targetimagesrc.slice(2);
console.log(targetimagesrc);
let elementindex = listofimagesources.indexOf(targetimagesrc);
let k = sessionStorage.getObj('cartitems');
k = k.filter(e => e !== elementindex);
sessionStorage.setObj('cartitems', k);
hm_cart_number.innerHTML = sessionStorage.getObj('cartitems').length;

}

}

})

}