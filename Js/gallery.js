const images = [
"./Assets/rwanda_wedding_1.jpg",
"./Assets/rwanda_wedding_3.jpg",
"./Assets/rwanda_wedding_5.jpg",
"./Assets/img1.jpg",
"./Assets/food.jpg",
"./Assets/grooms.jpg",
"./Assets/place.jpg",
"./Assets/dressing.jpg",
"./Assets/img2.jpg"
];

const gallery = document.getElementById("gallery");

images.forEach((imgSrc) => {

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = imgSrc;

    const btn = document.createElement("button");
    btn.innerText = "Rent This Dress";

    card.appendChild(img);
    card.appendChild(btn);

    gallery.appendChild(card);
});
