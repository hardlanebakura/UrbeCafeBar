email = document.getElementById("email")
username = document.getElementById("username_11");
password_1 = document.getElementById("password_11");
password_2 = document.getElementById("password_12");

function validate_Form_2(e) {

const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
r = email.value != "" && re.test(email.value) && username.value != "" && password_1.value != "" && password_2.value != "" && password_1.value.length > 7;
console.log("r" + r);
if (r) {

if (password_1.value == password_2.value) return true;
else return false;

}

else return false;

}