// RUN ON LOAD
document.addEventListener("DOMContentLoaded", () => {
  setupAdminHeader();
  loadSectionData("overview");
});

// ADMIN PROFILE SETUP
function setupAdminHeader() {
  const adminUser = window.db.getCurrentUser();
  if (adminUser) {
    document.getElementById("adminUsername").textContent = adminUser.name;
    document.getElementById("avatarLetter").textContent = adminUser.name.charAt(0).toUpperCase();
  }
}

// LOGOUT
function logoutAdmin() {
  window.db.logoutUser();
  alert("Logged out successfully.");
  window.location.href = "../index.html";
}

// SWITCH TABS
function switchTab(tabId, el) {
  // Update menu link active states
  if (el) {
    document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
    el.classList.add("active");
  } else {
    // If called programmatically (like "View All" on Overview tab)
    document.querySelectorAll(".sidebar-menu li").forEach(li => {
      const text = li.textContent.toLowerCase();
      if (text.includes(tabId)) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }

  // Update sections active states
  document.querySelectorAll(".section").forEach(sect => sect.classList.remove("active"));
  document.getElementById(`sect-${tabId}`).classList.add("active");

  // Set header title
  const titles = {
    overview: "Overview Dashboard",
    bookings: "Wedding Bookings Manager",
    services: "Boutique Services Coordinator",
    gallery: "Gallery Collection Manager",
    blogs: "feather Inspiration Articles",
    customers: "Customer Directory",
    inbox: "Message Inbox"
  };
  document.getElementById("tabTitle").textContent = titles[tabId] || "Admin Manager";

  // Load section specific data
  loadSectionData(tabId);
}

// SECTION DATA ROUTER LOADERS
function loadSectionData(tabId) {
  switch (tabId) {
    case "overview":
      loadOverviewStats();
      break;
    case "bookings":
      loadBookingsTable();
      break;
    case "services":
      loadServicesGrid();
      break;
    case "gallery":
      loadGalleryGrid();
      break;
    case "blogs":
      loadBlogsGrid();
      break;
    case "customers":
      loadCustomersTable();
      break;
    case "inbox":
      loadInboxMessages();
      break;
  }
}

// FILE WRITER READ BASE64 PREVIEW
function previewImageFile(input, imgElementId) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById(imgElementId).src = dataUrl;
    
    // Set hidden input data URL string
    if (imgElementId === 'serviceImgPreview') {
      document.getElementById('editServiceImgData').value = dataUrl;
    } else if (imgElementId === 'galleryImgPreview') {
      document.getElementById('editGalleryImgData').value = dataUrl;
    } else if (imgElementId === 'blogImgPreview') {
      document.getElementById('editBlogImgData').value = dataUrl;
    }
  };
  reader.readAsDataURL(file);
}

// Toggle blog media cover upload file type
function toggleMediaInput(mediaType) {
  const fileLabel = document.getElementById("mediaFileLabel");
  const blogFile = document.getElementById("editBlogFile");
  if (mediaType === "video") {
    fileLabel.textContent = "Upload Cover Video (MP4)";
    blogFile.accept = "video/mp4";
  } else {
    fileLabel.textContent = "Upload Cover Photo";
    blogFile.accept = "image/*";
  }
}

// ================= SECTION LOADER: OVERVIEW =================
function loadOverviewStats() {
  const bookings = window.db.getBookings() || [];
  const gallery = window.db.getGallery() || [];
  const users = window.db.getUsers() || [];
  
  // Calculate stats
  let totalRevenue = 0;
  bookings.forEach(b => {
    if (b.status === "Confirmed" || b.status === "Completed") {
      totalRevenue += parseInt(b.total) || 0;
    }
  });

  const customers = users.filter(u => u.role === "customer");

  // Populate HTML stats
  document.getElementById("stat-revenue").textContent = `$${totalRevenue.toLocaleString()}`;
  document.getElementById("stat-bookings").textContent = bookings.length;
  document.getElementById("stat-gallery").textContent = gallery.length;
  document.getElementById("stat-customers").textContent = customers.length;

  // Render recent 5 bookings
  const sortedBookings = [...bookings].reverse().slice(0, 5);
  const overviewTable = document.getElementById("overviewBookingsTable");
  
  if (sortedBookings.length === 0) {
    overviewTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No bookings listed yet.</td></tr>`;
    return;
  }

  overviewTable.innerHTML = sortedBookings.map(b => `
    <tr>
      <td style="font-weight: 600; color: var(--primary);">${b.id}</td>
      <td>${b.name}</td>
      <td>${b.date}</td>
      <td><strong>${typeof b.total === 'number' || !isNaN(Number(b.total)) ? `$${b.total}` : b.total}</strong></td>
      <td><span class="status ${b.status.toLowerCase()}">${b.status}</span></td>
    </tr>
  `).join("");
}

// ================= SECTION LOADER: BOOKINGS =================
function loadBookingsTable() {
  const bookings = window.db.getBookings() || [];
  const tbody = document.getElementById("bookingsTableBody");

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px;">No bookings found.</td></tr>`;
    return;
  }

  tbody.innerHTML = [...bookings].reverse().map(b => `
    <tr>
      <td style="font-weight: 600; color: var(--primary);">${b.id}</td>
      <td><strong>${b.name}</strong></td>
      <td>
        <div style="font-size: 13px;">${b.email}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${b.phone}</div>
      </td>
      <td>${b.date}</td>
      <td style="max-width: 200px; font-size: 13px;">${b.services.join(", ")}</td>
      <td><strong>${typeof b.total === 'number' || !isNaN(Number(b.total)) ? `$${b.total}` : b.total}</strong></td>
      <td><span class="status ${b.status.toLowerCase()}">${b.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-action edit" title="Edit Booking" onclick="openBookingModal('${b.id}')"><i class="fas fa-edit"></i></button>
          <button class="btn-action delete" title="Delete Booking" onclick="deleteBookingItem('${b.id}')"><i class="fas fa-trash-alt"></i></button>
        </div>
      </td>
    </tr>
  `).join("");
}

// BOOKING EDIT MODAL ACTIONS
function openBookingModal(id = "") {
  const modal = document.getElementById("bookingModal");
  const title = document.getElementById("bookingModalTitle");
  const form = document.getElementById("bookingForm");
  const servicesGroup = document.getElementById("editBookServicesGroup");
  
  // Render checkboxes dynamically from current services db
  const services = window.db.getServices() || [];
  servicesGroup.innerHTML = services.map(s => `
    <label class="checkbox-item">
      <input type="checkbox" name="editBookServices" value="${s.name}" data-price="${s.price}">
      <span>${s.name} ($${s.price})</span>
    </label>
  `).join("");

  form.reset();

  if (id) {
    title.textContent = `Edit Booking: ${id}`;
    document.getElementById("editBookingId").value = id;
    
    // Fetch booking details
    const bookings = window.db.getBookings() || [];
    const b = bookings.find(item => item.id === id);
    if (b) {
      document.getElementById("editBookName").value = b.name;
      document.getElementById("editBookEmail").value = b.email;
      document.getElementById("editBookPhone").value = b.phone;
      document.getElementById("editBookDate").value = b.date;
      document.getElementById("editBookStatus").value = b.status;
      document.getElementById("editBookTotal").value = b.total;
      document.getElementById("editBookRequests").value = b.requests || "";
      
      // Check corresponding services checkboxes
      const checkboxes = document.querySelectorAll('input[name="editBookServices"]');
      checkboxes.forEach(cb => {
        if (b.services.includes(cb.value)) {
          cb.checked = true;
        }
      });
    }
  } else {
    title.textContent = "Create Manual Booking";
    document.getElementById("editBookingId").value = "";
  }

  modal.classList.add("active");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.remove("active");
}

function saveBookingSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById("editBookingId").value;
  const name = document.getElementById("editBookName").value.trim();
  const email = document.getElementById("editBookEmail").value.trim();
  const phone = document.getElementById("editBookPhone").value.trim();
  const date = document.getElementById("editBookDate").value;
  const status = document.getElementById("editBookStatus").value;
  const requests = document.getElementById("editBookRequests").value.trim();
  
  // Collect checked services names & auto total
  const selectedServices = [];
  let calculatedTotal = 0;
  const checkboxes = document.querySelectorAll('input[name="editBookServices"]:checked');
  checkboxes.forEach(cb => {
    selectedServices.push(cb.value);
    calculatedTotal += parseInt(cb.getAttribute("data-price"));
  });

  if (selectedServices.length === 0) {
    alert("❌ Please select at least one service!");
    return;
  }

  const customTotalInput = document.getElementById("editBookTotal").value;
  const total = customTotalInput ? (isNaN(customTotalInput) ? customTotalInput : parseInt(customTotalInput)) : calculatedTotal;

  const bookingData = {
    name, email, phone, date, status, requests,
    services: selectedServices,
    total
  };

  if (id) {
    window.db.updateBooking(id, bookingData);
    alert(`✅ Booking ${id} updated successfully!`);
  } else {
    const saved = window.db.addBooking(bookingData);
    alert(`✅ Booking created manually. Ref ID: ${saved.id}`);
  }

  closeBookingModal();
  loadBookingsTable();
}

function deleteBookingItem(id) {
  if (confirm(`Are you sure you want to delete booking reference ${id}?`)) {
    window.db.deleteBooking(id);
    alert("Booking deleted.");
    loadBookingsTable();
  }
}


// ================= SECTION LOADER: SERVICES =================
function loadServicesGrid() {
  const services = window.db.getServices() || [];
  const grid = document.getElementById("servicesGrid");

  if (services.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No boutique services listed.</div>`;
    return;
  }

  grid.innerHTML = services.map(s => `
    <div class="admin-grid-card">
      <div class="card-media">
        <img src="${s.image}" alt="${s.name}">
      </div>
      <div class="card-details">
        <span>Boutique Item</span>
        <h4>${s.name}</h4>
        <p>${s.description || 'No description provided.'}</p>
        <div class="card-footer">
          <div class="card-price">$${s.price}</div>
          <div class="action-btns">
            <button class="btn-action edit" onclick="openServiceModal('${s.id}')"><i class="fas fa-edit"></i></button>
            <button class="btn-action delete" onclick="deleteServiceItem('${s.id}')"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function openServiceModal(id = "") {
  const modal = document.getElementById("serviceModal");
  const title = document.getElementById("serviceModalTitle");
  const form = document.getElementById("serviceForm");
  
  form.reset();
  document.getElementById("serviceImgPreview").src = "";
  document.getElementById("editServiceImgData").value = "";

  if (id) {
    title.textContent = "Edit Service Details";
    document.getElementById("editServiceId").value = id;
    
    const services = window.db.getServices() || [];
    const s = services.find(item => item.id === id);
    if (s) {
      document.getElementById("editServiceName").value = s.name;
      document.getElementById("editServicePrice").value = s.price;
      document.getElementById("editServiceDesc").value = s.description || "";
      document.getElementById("serviceImgPreview").src = s.image;
      document.getElementById("editServiceImgData").value = s.image; // Keep existing image if not changed
    }
  } else {
    title.textContent = "Add Service Details";
    document.getElementById("editServiceId").value = "";
  }

  modal.classList.add("active");
}

function closeServiceModal() {
  document.getElementById("serviceModal").classList.remove("active");
}

function saveServiceSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("editServiceId").value;
  const name = document.getElementById("editServiceName").value.trim();
  const price = parseInt(document.getElementById("editServicePrice").value);
  const description = document.getElementById("editServiceDesc").value.trim();
  const image = document.getElementById("editServiceImgData").value;

  if (!image) {
    alert("❌ Please select or upload a display photo!");
    return;
  }

  const serviceData = { name, price, description, image };

  if (id) {
    window.db.updateService(id, serviceData);
    alert("✅ Service updated successfully!");
  } else {
    window.db.addService(serviceData);
    alert("✅ New Service added successfully!");
  }

  closeServiceModal();
  loadServicesGrid();
}

function deleteServiceItem(id) {
  if (confirm("Are you sure you want to delete this service? It will disappear from the Customer Bookings page.")) {
    window.db.deleteService(id);
    alert("Service deleted successfully.");
    loadServicesGrid();
  }
}


// ================= SECTION LOADER: GALLERY =================
function loadGalleryGrid() {
  const gallery = window.db.getGallery() || [];
  const grid = document.getElementById("galleryGrid");

  if (gallery.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No gallery items listed.</div>`;
    return;
  }

  grid.innerHTML = gallery.map(item => `
    <div class="admin-grid-card">
      <div class="card-media">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="card-details">
        <span>Category: ${item.category}</span>
        <h4>${item.title || 'Untitled'}</h4>
        <div class="card-footer" style="padding-top: 10px; border-top: none;">
          <div></div>
          <button class="btn-action delete" onclick="deleteGalleryPhoto('${item.id}')"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>
  `).join("");
}

function openGalleryModal() {
  const modal = document.getElementById("galleryModal");
  document.getElementById("galleryForm").reset();
  document.getElementById("galleryImgPreview").src = "";
  document.getElementById("editGalleryImgData").value = "";
  modal.classList.add("active");
}

function closeGalleryModal() {
  document.getElementById("galleryModal").classList.remove("active");
}

function saveGallerySubmit(e) {
  e.preventDefault();

  const title = document.getElementById("editGalleryTitle").value.trim();
  const category = document.getElementById("editGalleryCategory").value;
  const image = document.getElementById("editGalleryImgData").value;

  if (!image) {
    alert("❌ Please wait for image processing or select another file!");
    return;
  }

  window.db.addGalleryItem({ title, category, image });
  alert("✅ Photo uploaded and saved to collection!");
  
  closeGalleryModal();
  loadGalleryGrid();
}

function deleteGalleryPhoto(id) {
  if (confirm("Are you sure you want to delete this gallery item?")) {
    window.db.deleteGalleryItem(id);
    alert("Photo removed.");
    loadGalleryGrid();
  }
}


// ================= SECTION LOADER: BLOGS =================
function loadBlogsGrid() {
  const blogs = window.db.getBlogs() || [];
  const grid = document.getElementById("blogsGrid");

  if (blogs.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No blog articles found.</div>`;
    return;
  }

  grid.innerHTML = blogs.map(b => {
    let mediaHTML = '';
    if (b.mediaType === 'video') {
      mediaHTML = `<video src="${b.mediaUrl}" muted></video>`;
    } else {
      mediaHTML = `<img src="${b.mediaUrl}" alt="${b.title}">`;
    }

    return `
      <div class="admin-grid-card">
        <div class="card-media">
          ${mediaHTML}
        </div>
        <div class="card-details">
          <span>${b.category} &bull; ${b.date || ''}</span>
          <h4>${b.title}</h4>
          <p>${b.snippet}</p>
          <div class="card-footer">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: var(--text-muted);">${b.mediaType}</div>
            <div class="action-btns">
              <button class="btn-action edit" onclick="openBlogModal('${b.id}')"><i class="fas fa-edit"></i></button>
              <button class="btn-action delete" onclick="deleteBlogItem('${b.id}')"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openBlogModal(id = "") {
  const modal = document.getElementById("blogModal");
  const title = document.getElementById("blogModalTitle");
  const form = document.getElementById("blogForm");
  
  form.reset();
  document.getElementById("blogImgPreview").src = "";
  document.getElementById("editBlogImgData").value = "";
  toggleMediaInput("image"); // reset to image

  if (id) {
    title.textContent = "Edit Blog Article";
    document.getElementById("editBlogId").value = id;
    
    const blogs = window.db.getBlogs() || [];
    const b = blogs.find(item => item.id === id);
    if (b) {
      document.getElementById("editBlogTitle").value = b.title;
      document.getElementById("editBlogCategory").value = b.category;
      document.getElementById("editBlogMediaType").value = b.mediaType;
      document.getElementById("editBlogSnippet").value = b.snippet;
      document.getElementById("editBlogContent").value = b.content;
      
      toggleMediaInput(b.mediaType);
      
      document.getElementById("editBlogImgData").value = b.mediaUrl;
      if (b.mediaType === "image") {
        document.getElementById("blogImgPreview").src = b.mediaUrl;
      } else {
        // Simple placeholder for video preview in modal
        document.getElementById("blogMediaPreviewContainer").innerHTML = `
          <video id="blogImgPreview" src="${b.mediaUrl}" controls style="max-height: 100%; object-fit: contain;"></video>
        `;
      }
    }
  } else {
    title.textContent = "Write Blog Article";
    document.getElementById("editBlogId").value = "";
    document.getElementById("blogMediaPreviewContainer").innerHTML = `
      <img id="blogImgPreview" src="" alt="No File Selected">
    `;
  }

  modal.classList.add("active");
}

function closeBlogModal() {
  document.getElementById("blogModal").classList.remove("active");
}

function saveBlogSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("editBlogId").value;
  const title = document.getElementById("editBlogTitle").value.trim();
  const category = document.getElementById("editBlogCategory").value;
  const mediaType = document.getElementById("editBlogMediaType").value;
  const snippet = document.getElementById("editBlogSnippet").value.trim();
  const content = document.getElementById("editBlogContent").value.trim();
  const mediaUrl = document.getElementById("editBlogImgData").value;

  if (!mediaUrl) {
    alert("❌ Please select or upload cover media!");
    return;
  }

  const blogData = { title, category, mediaType, snippet, content, mediaUrl };

  if (id) {
    window.db.updateBlog(id, blogData);
    alert("✅ Article updated!");
  } else {
    window.db.addBlog(blogData);
    alert("✅ Article published!");
  }

  closeBlogModal();
  loadBlogsGrid();
}

function deleteBlogItem(id) {
  if (confirm("Are you sure you want to delete this article?")) {
    window.db.deleteBlog(id);
    alert("Article deleted.");
    loadBlogsGrid();
  }
}


// ================= SECTION LOADER: CUSTOMERS =================
function loadCustomersTable() {
  const users = window.db.getUsers() || [];
  const tbody = document.getElementById("customersTableBody");
  
  // Filter for customers only (exclude admins)
  const customers = users.filter(u => u.role === "customer");

  if (customers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">No customers registered in database.</td></tr>`;
    return;
  }

  tbody.innerHTML = customers.map(u => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td>${u.phone || 'N/A'}</td>
      <td>${u.joinedDate || 'N/A'}</td>
      <td>
        <button class="btn-action delete" title="Remove Customer" onclick="deleteCustomerRecord('${u.email}')"><i class="fas fa-trash-alt"></i></button>
      </td>
    </tr>
  `).join("");
}

function openCustomerModal() {
  const modal = document.getElementById("customerModal");
  document.getElementById("customerForm").reset();
  modal.classList.add("active");
}

function closeCustomerModal() {
  document.getElementById("customerModal").classList.remove("active");
}

function saveCustomerSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("editCustName").value.trim();
  const email = document.getElementById("editCustEmail").value.trim();
  const phone = document.getElementById("editCustPhone").value.trim();
  const password = document.getElementById("editCustPassword").value;

  const res = window.db.registerUser(name, email, password, phone);
  
  if (res.success) {
    alert("✅ Customer account registered successfully!");
    closeCustomerModal();
    loadCustomersTable();
  } else {
    alert("❌ Error: " + res.message);
  }
}

function deleteCustomerRecord(email) {
  if (confirm(`Are you sure you want to remove customer account: ${email}? This will invalidate their credentials.`)) {
    window.db.deleteUser(email);
    alert("Customer account removed.");
    loadCustomersTable();
  }
}


// ================= SECTION LOADER: INBOX =================
function loadInboxMessages() {
  const messages = window.db.getMessages() || [];
  const container = document.getElementById("inboxList");

  if (messages.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 60px 0;">
        <i class="far fa-envelope" style="font-size: 45px; color: var(--primary); margin-bottom: 15px;"></i>
        <p>Your inbox is empty. No new contact messages.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = [...messages].reverse().map(m => `
    <div class="admin-list-item">
      <div class="item-main">
        <div class="item-title-row">
          <h4>${m.name}</h4>
          <span style="font-size: 12px; color: var(--primary); font-weight: 600;">Message ID: ${m.id}</span>
        </div>
        <div class="item-subtitle">
          <span><i class="far fa-envelope"></i> ${m.email}</span>
          <span><i class="far fa-clock"></i> Sent: ${m.date}</span>
        </div>
        <div class="item-message-body">${m.message}</div>
      </div>
      <button class="btn-action delete" title="Dismiss Message" onclick="dismissInboxMessage('${m.id}')" style="margin-left: 20px;">
        <i class="fas fa-check"></i>
      </button>
    </div>
  `).join("");
}

function dismissInboxMessage(id) {
  if (confirm("Mark this message as reviewed and remove it from inbox?")) {
    window.db.deleteMessage(id);
    alert("Message dismissed.");
    loadInboxMessages();
  }
}