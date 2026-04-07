const adminLoginForm = document.getElementById("adminLoginForm");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const adminLoginMessage = document.getElementById("adminLoginMessage");

const ADMIN_CREDENTIALS = {
  email: "admin@tidesofhopeinc.org",
  password: "TOHAdmin123"
};

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailValue = adminEmail.value.trim();
    const passwordValue = adminPassword.value.trim();

    adminLoginMessage.textContent = "";
    adminLoginMessage.classList.remove("error", "success");

    if (
      emailValue === ADMIN_CREDENTIALS.email &&
      passwordValue === ADMIN_CREDENTIALS.password
    ) {
      sessionStorage.setItem("tohAdminLoggedIn", "true");
      sessionStorage.setItem("tohAdminEmail", emailValue);

      adminLoginMessage.textContent = "Login successful. Redirecting to office portal...";
      adminLoginMessage.classList.add("success");

      setTimeout(() => {
        window.location.href = "office-portal.html";
      }, 900);
    } else {
      adminLoginMessage.textContent = "Invalid admin email or password.";
      adminLoginMessage.classList.add("error");
    }
  });
}
