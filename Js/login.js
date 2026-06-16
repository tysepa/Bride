// Switch between Login and Sign Up forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");

if (showSignupBtn) {
  showSignupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  });
}

if (showLoginBtn) {
  showLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  });
}

// Handle Sign Up Submission
function handleSignup(e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !phone || !password) {
    alert("❌ Please fill out all required fields!");
    return;
  }

  const result = window.db.registerUser(name, email, password, phone);
  
  if (result.success) {
    alert("✅ Account created successfully! Please login.");
    signupForm.reset();
    // Switch to login form
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  } else {
    alert("❌ Error: " + result.message);
  }
}

// Handle Login Submission
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("❌ Please fill out all required fields!");
    return;
  }

  const result = window.db.loginUser(email, password);

  if (result.success) {
    alert("✅ Login successful! Welcome, " + result.user.name);
    
    // Redirect based on role
    if (result.user.role === "admin") {
      window.location.href = "./Admin/admin.html";
    } else {
      window.location.href = "booking.html";
    }
  } else {
    alert("❌ Error: " + result.message);
  }
}