const images = [
"https://images.unsplash.com/photo-1529634893247-1a28d1a29b23",
"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
"https://images.unsplash.com/photo-1519741497674-611481863552",
"https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
"https://images.unsplash.com/photo-1520854221256-17451cc331bf",
"https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
"https://images.unsplash.com/photo-1542044801-30d3f9e49a93",
"https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
"https://images.unsplash.com/photo-1519741347686-c1e0aadf4611",
"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
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
