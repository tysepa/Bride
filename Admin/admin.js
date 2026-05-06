// SWITCH SECTIONS
function showSection(id){
document.querySelectorAll(".section")
.forEach(sec => sec.classList.remove("active"));

document.getElementById(id).classList.add("active");
}

// BOOKINGS DATA
let bookings = [
{name:"Alice",date:"10 May",service:"Bride Dress"},
{name:"Eric",date:"12 May",service:"Car Decoration"}
];

const bookingList = document.getElementById("bookingList");

bookings.forEach(b=>{
bookingList.innerHTML += `
<tr>
<td>${b.name}</td>
<td>${b.date}</td>
<td>${b.service}</td>
<td><button>Delete</button></td>
</tr>`;
});

document.getElementById("totalBookings").innerText = bookings.length;


// IMAGE UPLOAD
function addImage(){
const file = document.getElementById("imageUpload").files[0];

if(!file) return;

const reader = new FileReader();

reader.onload=function(e){
const img=document.createElement("img");
img.src=e.target.result;
document.getElementById("galleryPreview").appendChild(img);
};

reader.readAsDataURL(file);
}


// SERVICES
function addService(){
const name=document.getElementById("serviceName").value;

if(name==="") return;

const li=document.createElement("li");
li.innerText=name;

document.getElementById("serviceList").appendChild(li);
}


// USERS SAMPLE
const users=["Jean","Marie","Claude"];

users.forEach(u=>{
const li=document.createElement("li");
li.innerText=u;
document.getElementById("userList").appendChild(li);
});

document.getElementById("totalUsers").innerText=users.length;


// LOGOUT
function logout(){
alert("Logged Out");
window.location.href="index.html";
}