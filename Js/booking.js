function toggleMenu(){
  document.getElementById("navMenu").classList.toggle("active");
}

// Fetch services from db
const services = window.db.getServices() || [];
const materialsList = document.getElementById("materialsList");
const totalDisplay = document.getElementById("total");
const bookingForm = document.getElementById("bookingForm");
const confirmModal = document.getElementById("confirmModal");
const bookingSummary = document.getElementById("bookingSummary");

// Pre-fill user details if logged in
const currentUser = window.db.getCurrentUser();
if (currentUser) {
  document.getElementById("custName").value = currentUser.name || "";
  document.getElementById("custEmail").value = currentUser.email || "";
  document.getElementById("custPhone").value = currentUser.phone || "";
}

// Render Checkboxes
if (materialsList && services.length > 0) {
  materialsList.innerHTML = services.map(s => `
    <div class="material-card" data-id="${s.id}">
      <input type="checkbox" id="check-${s.id}" value="${s.price}" data-name="${s.name}">
      <label class="material-card-label" for="check-${s.id}">${s.name}</label>
      <div class="material-card-price">$${s.price}</div>
    </div>
  `).join("");

  // Add event listeners to card clicks and checkboxes
  const cards = document.querySelectorAll(".material-card");
  cards.forEach(card => {
    const cb = card.querySelector('input[type="checkbox"]');
    
    // Toggle class on checkbox change
    cb.addEventListener("change", () => {
      if (cb.checked) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
      calculateTotal();
    });

    // Make card background clickable as well
    card.addEventListener("click", (e) => {
      if (e.target !== cb && e.target.tagName !== "LABEL") {
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    });
  });
}

function calculateTotal() {
  let total = 0;
  const checkboxes = document.querySelectorAll('.materials input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += parseInt(cb.value);
    }
  });
  totalDisplay.textContent = total;
}

// Handle Form Submission
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("custName").value;
  const email = document.getElementById("custEmail").value;
  const phone = document.getElementById("custPhone").value;
  const date = document.getElementById("weddingDate").value;
  const requests = document.getElementById("additionalRequests").value;

  // Selected services
  const selectedServices = [];
  let total = 0;
  const checkboxes = document.querySelectorAll('.materials input[type="checkbox"]');
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selectedServices.push(cb.getAttribute("data-name"));
      total += parseInt(cb.value);
    }
  });

  if (selectedServices.length === 0) {
    alert("❌ Please select at least one wedding material or service!");
    return;
  }

  // Create Booking object
  const newBooking = {
    name,
    email,
    phone,
    date,
    services: selectedServices,
    total,
    requests,
    status: "Pending"
  };

  const savedBooking = window.db.addBooking(newBooking);

  // Show Confirmation details inside modal
  bookingSummary.innerHTML = `
    <table class="booking-summary-table">
      <tr>
        <th>Booking Reference</th>
        <td style="font-weight: 700; color: var(--primary);">${savedBooking.id}</td>
      </tr>
      <tr>
        <th>Name</th>
        <td>${savedBooking.name}</td>
      </tr>
      <tr>
        <th>Wedding Date</th>
        <td>${savedBooking.date}</td>
      </tr>
      <tr>
        <th>Services Chosen</th>
        <td>${savedBooking.services.join(", ")}</td>
      </tr>
      <tr>
        <th>Total Price</th>
        <td style="font-weight: 700; color: var(--dark);">$${savedBooking.total}</td>
      </tr>
    </table>
  `;

  // Open modal
  confirmModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  confirmModal.classList.remove("active");
  document.body.style.overflow = "";
}

function goToHome() {
  closeModal();
  window.location.href = "index.html";
}