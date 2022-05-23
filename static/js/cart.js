var cart1 = document.getElementsByClassName("cart1")[0];
var cart11 = document.getElementsByClassName("cart11");
var cart12 = document.getElementsByClassName("cart12");
var cart12img = document.getElementsByClassName("cart12img");
var cart14 = document.getElementsByClassName("cart14");
var cartTotal = document.getElementsByClassName("cart_total")[0];
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

//if there are no cart items
if (cartitems.length == 0) {

    if (cartbutton != undefined) cartbutton.style.display = "none";
    cartTotal.innerHTML = "Looks like you have no items in cart. Make sure to check our " + `<a href = "/">amazing coffees and teas</a>!`;

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

for (let i = 0; i < cartitems.length; i++) {

    cart1.insertAdjacentHTML("afterend", `<div class = "cart1"><div class = "cart11">${ listoftitles[cartitems[i]] } </div><div class = "cart12"><img src = ${listofimagesources[cartitems[i]]} class = "cart12img"></div><div class = "cart13"><div class = "cart131">Quantity:</div><div class = "cartquantity"><input class = "quantity" name = "quantity" value = "1"></div></div><div class = "cart14">${ listofpricings[cartitems[i]] }</div></div>`)

}

function change_items_in_input(i, original_price, cartsum1) {

    var cartpriceforoneitem = parseFloat(cart14[i].innerText.substr(3, cart14[i].innerText.length - 1).replace(",", "."));
    var cartprice = (parseFloat(quantity_input[i].value) * original_price).toFixed(2);
    cart14[i].innerText = "R$ " + cartprice;
    if (quantity_input[i].value.length == 0) cart14[i].innerText = "R$ " + "0";
    let re = /[\d.]+/g
    let result = cartTotal.innerHTML.match(re)[0];
    let resultnumber = parseFloat(cartTotal.innerHTML.match(re)[0]);
    var firstdigit = cartTotal.innerHTML.search(/\d/);
    var others_sum = 0;
    for (let j = 0; j < cart11.length; j++)
        if (i != j) others_sum += parseFloat(cart14[j].innerText.substr(3, cart14[j].innerText.length - 1).replace(",", "."));
    var totalcost = parseFloat(cartprice) + others_sum;

    if (quantity_input[i].value.length != 0) {
        cartTotal.innerHTML = cartTotal.innerHTML.replace(result, totalcost);
    } else {
        cartTotal.innerHTML = cartTotal.innerHTML.replace(result, others_sum);

    }

}

function calculate_cart(cartstring) {

    cartstring1 = cartstring.substr(3, 9);
    cartstring1 = cartstring1.replace(/[\s–R]/g, "");
    cartstring1 = cartstring1.replace(",", ".");
    //cartstring2 = cartstring.replace([^\d,]+, "");
    cartsum += parseFloat(cartstring1);
    return cartstring1;

}

for (let i = 0; i < cart14.length; i++) {

    calculate_cart(cart14[i].innerHTML);

}
var quantity_input = document.getElementsByClassName("quantity");
var original_prices = []
var others_sum = 0;
for (let i = 0; i < cart11.length; i++) {
    original_prices.push((parseFloat(cart14[i].innerText.substr(3, cart14[i].innerText.length - 1).replace(",", "."))).toFixed(2));
}
for (let i = 0; i < cart11.length; i++) {

    quantity_input[i].addEventListener("keyup", event => {

        change_items_in_input(i, original_prices[i], cartsum);

    })

}

cartsum = cartsum.toFixed(2);
if (cartitems.length > 0) cartTotal.innerHTML += cartsum.toString();

function validate_Cart() {

    console.log("Validation is successful!");
    return true;

}