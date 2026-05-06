function showMessage() {
    alert("Thank you for choosing our wedding wear rental!");
}

function sendMessage() {
    alert("Message sent successfully!");
    return false;
}
function showMessage(){
alert("Welcome! Your wedding dream starts here 💍");
}

let slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide(){

slides[index].classList.remove("active");

index = (index + 1) % slides.length;

slides[index].classList.add("active");

}

setInterval(changeSlide,4000);

