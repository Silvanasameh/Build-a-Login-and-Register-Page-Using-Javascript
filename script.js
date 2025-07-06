// Registration
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find((u) => u.email === email);

      if (userExists) {
        alert("Email already registered. Please login.");
      } else {
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! You can now login.");
        window.location.href = "login.html";
      }
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const validUser = users.find((u) => u.email === email && u.password === password);

      if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "profile.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }

  // Profile
  if (document.getElementById("profileName")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
      document.getElementById("profileName").textContent = user.name;
      document.getElementById("profileEmail").textContent = user.email;
    } else {
      window.location.href = "login.html";
    }
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
