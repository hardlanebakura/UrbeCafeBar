var fav1 = document.getElementsByClassName("fav1")[0];
var fav11 = document.getElementsByClassName("fav11");
var fav12 = document.getElementsByClassName("fav12");
var fav12img = document.getElementsByClassName("fav12img");
var fav14 = document.getElementsByClassName("fav14");
var hm_favorites_number = document.getElementsByClassName("hm_favorites_number")[0];
var hm_cart_number = document.getElementsByClassName("hm_cart_number")[0];

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

var favitems = sessionStorage.getObj('favitems');

//if there are no fav items
if(favitems.length == 0) {

favbutton.style.display = "none";
fav_total.innerHTML = "Looks like you have no favorited items yet. Make sure to check our " + `<a href = "/">amazing coffees and teas</a>!`;

}

var listoftitles = []
var listofpricings = []
var listofimagesources = []
var es = []
if (sessionStorage.getObj('favitems') == null) sessionStorage.setObj('favitems', []);
hm_favorites_number.innerHTML = sessionStorage.getObj('favitems').length;
if (sessionStorage.getObj('cartitems') == null) sessionStorage.setObj('cartitems', []);
hm_cart_number.innerHTML = sessionStorage.getObj('cartitems').length;

items.forEach(e => {

for (const [key, value] of Object.entries(e)) {
  if (key == 'title') listoftitles.push(value);
  if (key == 'pricing') listofpricings.push(value);
  if (key == 'imagesource') listofimagesources.push(value);
}

})

for (let i = 0; i < favitems.length; i++) {

fav1.insertAdjacentHTML("afterend", `<div class = "fav1"><div class = "fav11">${ listoftitles[favitems[i]] } </div><div class = "fav12"><img src = ${listofimagesources[favitems[i]]} class = "fav12img"></div><div class = "fav13"></div><div class = "fav14">${ listofpricings[favitems[i]] }</div></div>`)

}