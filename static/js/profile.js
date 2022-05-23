var profilecart1 = document.getElementsByClassName("profilecart1")[0];
var profilecart11 = document.getElementsByClassName("profilecart11");
var profilecart12 = document.getElementsByClassName("profilecart12");
var profilecart12img = document.getElementsByClassName("profilecart12img");
var profilecart14 = document.getElementsByClassName("profilecart14");
var hm_favorites_number = document.getElementsByClassName("hm_favorites_number")[0];
var hm_cart_number = document.getElementsByClassName("hm_cart_number")[0];

profilecart1.style.marginTop = "100px";

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

var cartitems = sessionStorage.getObj('cartitems');
if (sessionStorage.getObj('cartitems') == null) sessionStorage.setObj('cartitems', []);
hm_cart_number.innerHTML = sessionStorage.getObj('cartitems').length;
if (sessionStorage.getObj('favitems') == null) sessionStorage.setObj('favitems', []);
hm_favorites_number.innerHTML = sessionStorage.getObj('favitems').length;

var listoftitles = []
var listofpricings = []
var listofimagesources = []
var es = []

items.forEach(e => {

for (const [key, value] of Object.entries(e)) {
  if (key == 'title') listoftitles.push(value);
  if (key == 'pricing') listofpricings.push(value);
  if (key == 'imagesource') listofimagesources.push(value);
}

})

//when expanding this page, in future there will be new features
//var cartsum = 0;
//
//for (let i = 0; i < cartitems.length; i++) {
//
//profilecart1.insertAdjacentHTML("afterend", `<div class = "profilecart1"><div class = "profilecart11">${ listoftitles[cartitems[i]] } </div><div class = "profilecart12"><img src = ${listofimagesources[cartitems[i]]} class = "profilecart12img"></div><div class = "profilecart13"></div><div class = "profilecart14">${ listofpricings[cartitems[i]] }</div></div>`)
//
//}

