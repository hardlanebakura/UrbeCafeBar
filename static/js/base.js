var togold_1 = document.getElementsByClassName("gold");
var category_list_field = document.getElementsByClassName("category_list_field");
var category_list_field_1 = document.getElementsByClassName("category_list_field_1");
var categoryfieldbutton1 = document.getElementsByClassName("categoryfieldbutton1");
var categoryfieldbutton2 = document.getElementsByClassName("categoryfieldbutton2");
var hm_cart_number = document.getElementsByClassName("hm_cart_number")[0];
var searchbar_content = document.getElementsByClassName("searchbar_content")[0];
var searchbar_2_content = document.getElementsByClassName("searchbar_2_content")[0];
var searchbar_3_content = document.getElementsByClassName("searchbar_3_content")[0];
var searchbar_4_content = document.getElementsByClassName("searchbar_4_content")[0];
var search_content_items = document.getElementsByClassName("search_content_items")[0];

for (let i = 0; i < togold_1.length; i++) {

togold_1[i].addEventListener("mouseover", event => {

togold_1[i].style.color = "#ffdb00";

})


}

for (let i = 0; i < togold_1.length; i++) {

togold_1[i].addEventListener("mouseout", event => {

togold_1[i].style.color = "#222";

})


}

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

listoftitles = []
listofpricings = []
listofimagesources = []

items.forEach(e => {

for (const [key, value] of Object.entries(e)) {
  if (key == 'title') listoftitles.push(value);
  if (key == 'pricing') listofpricings.push(value);
  if (key == 'imagesource') listofimagesources.push(value);
}

})

console.log(listofimagesources);

for (let i = 0; i < listoftitles.length; i++) {

search_content_items.insertAdjacentHTML("beforeend", `<div class = "search1"><div class = "search11">${ listoftitles[i] }</div></div>`)

}

var search1 = document.getElementsByClassName("search1");
var search11 = document.getElementsByClassName("search11");
for (let i = 0; i < search11.length; i++) { if (i > 7) search11[i].style.display = "none"; }
console.log(search11.length);

for (let i = 0; i < search1.length; i++) {

searchbar_content.addEventListener("focusin", event => {

search1[i].style.display = "block";
search_content_items.nextElementSibling.style.marginTop = "-40px";

search11[i].addEventListener("click", event => {

searchbar_content.value = search11[i].innerText;

})

})

}

function searchbar() {

console.log(items.length);
filter = searchbar_content.value.toUpperCase();
console.log(items);


var j = 0; //max of 7 items in searchbar

for (let i = 0; i < items.length; i++) {

var search_content = listoftitles[i];
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

function validate_Form_1(){

var elementindex = listoftitles.indexOf(searchbar_content.value);
searchbar_2_content.value = elementindex;
searchbar_3_content.value = listofpricings[elementindex];
searchbar_4_content.value = listofimagesources[elementindex];
console.log(searchbar_content.value);
console.log(searchbar_2_content.value);
console.log(searchbar_3_content.value);
console.log(searchbar_4_content.value);

}
