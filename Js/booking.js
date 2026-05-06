function toggleMenu(){
document.getElementById("navMenu").classList.toggle("active");
}

/* PRICE CALCULATOR */
const checkboxes=document.querySelectorAll(".materials input");
const totalDisplay=document.getElementById("total");

checkboxes.forEach(box=>{
box.addEventListener("change",calculateTotal);
});

function calculateTotal(){

let total=0;

checkboxes.forEach(box=>{
if(box.checked){
total+=parseInt(box.value);
}
});

totalDisplay.textContent=total;
}

/* BOOKING SUBMIT */
document.querySelector(".booking-form")
.addEventListener("submit",function(e){

e.preventDefault();

alert("✅ Wedding Booking Submitted Successfully!");

});