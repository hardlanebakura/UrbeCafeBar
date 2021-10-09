var cart1 = document.getElementsByClassName("cart1")[0];
var cart11 = document.getElementsByClassName("cart11");
var cart12 = document.getElementsByClassName("cart12");
var cart12img = document.getElementsByClassName("cart12img");
var cart14 = document.getElementsByClassName("cart14");
var cart_total = document.getElementsByClassName("cart_total")[0];
var cartbutton = document.getElementsByClassName("cartbutton")[0];
var hm_favorites_number = document.getElementsByClassName("hm_favorites_number")[0];
var hm_cart_number = document.getElementsByClassName("hm_cart_number")[0];

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

var cartitems = sessionStorage.getObj('cartitems');
console.log(cartitems);

//if there are no cart items
if(cartitems.length == 0) {

cartbutton.style.display = "none";
cart_total.innerHTML = "Looks like you have no items in cart. Make sure to check our " + `<a href = "/">amazing coffees and teas</a>!`;

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

var cartsum = 0;

console.log(listoftitles);
for (let i = 0; i < cartitems.length; i++) {

cart1.insertAdjacentHTML("afterend", `<div class = "cart1"><div class = "cart11">${ listoftitles[cartitems[i]] } </div><div class = "cart12"><img src = ${listofimagesources[cartitems[i]]} class = "cart12img"></div><div class = "cart13"><div class = "cart131">Quantity:</div><div class = "cartquantity"><input class = "quantity" name = "quantity" value = "1"></div></div><div class = "cart14">${ listofpricings[cartitems[i]] }</div></div>`)

}

function change_items_in_input(i, original_price, cartsum1) {

console.log(quantity_input[i].value);
var cartpriceforoneitem = parseFloat(cart14[i].innerText.substr(3, cart14[i].innerText.length - 1).replace(",", "."));
console.log(parseFloat(quantity_input[i].value));
var cartprice = (parseFloat(quantity_input[i].value) * original_price).toFixed(2);
console.log(cartprice);
cart14[i].innerText = "R$ " + cartprice;
if (quantity_input[i].value.length == 0) cart14[i].innerText = "R$ " + "0";
console.log(original_price);
let re = /[\d.]+/g
let result = cart_total.innerHTML.match(re)[0];
let resultnumber = parseFloat(cart_total.innerHTML.match(re)[0]);
console.log(result)
console.log(cartprice + " " + typeof(cartprice));
console.log(parseFloat(cartprice) - parseFloat(original_price));
var firstdigit = cart_total.innerHTML.search(/\d/);
console.log(firstdigit);
var others_sum = 0;
for (let j = 0; j < cart11.length; j++) if (i != j) others_sum += parseFloat(cart14[j].innerText.substr(3, cart14[j].innerText.length - 1).replace(",", "."));
console.log(others_sum);
var totalcost = parseFloat(cartprice) + others_sum;

if (quantity_input[i].value.length != 0) {
cart_total.innerHTML = cart_total.innerHTML.replace(result, totalcost);
}
else {
cart_total.innerHTML = cart_total.innerHTML.replace(result, others_sum);

}

}

function calculate_cart(cartstring) {

cartstring1 = cartstring.substr(3,9);
cartstring1 = cartstring1.replace(/[\s–R]/g, "");
cartstring1 = cartstring1.replace(",",".");
//cartstring2 = cartstring.replace([^\d,]+, "");
//console.log(cartstring2);
cartsum += parseFloat(cartstring1);
return cartstring1;

}

console.log(cart14.length);

for (let i = 0; i < cart14.length; i++) {

console.log(cart14[i].innerHTML);
calculate_cart(cart14[i].innerHTML);

}
var quantity_input = document.getElementsByClassName("quantity");
var original_prices = []
var others_sum = 0;
for (let i = 0; i < cart11.length; i++) { original_prices.push((parseFloat(cart14[i].innerText.substr(3, cart14[i].innerText.length - 1).replace(",", "."))).toFixed(2)); }
console.log(original_prices);
for (let i = 0; i < cart11.length; i++) {
console.log(quantity_input[i].value);
quantity_input[i].addEventListener("keyup", event => {

change_items_in_input(i, original_prices[i], cartsum);

})

}

console.log(listofpricings);

cart_total.innerHTML += cartsum.toString();
console.log(cartsum);

console.log(cart14.length);

function validate_Cart() {

console.log("Validation is successful!");
return true;

}