/* =========================================
   TIDES OF HOPE - MEMBER / OFFICE LOGIN
========================================= */

const LOGIN_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

const adminLoginForm = document.getElementById("adminLoginForm");
const adminEmail = document.getElementById("adminEmail");
const adminPassword = document.getElementById("adminPassword");
const adminLoginMessage = document.getElementById("adminLoginMessage");
const passwordToggle = document.getElementById("passwordToggle");
const bubbleChatButton = document.getElementById("bubbleChatButton");

/* PASSWORD EYE TOGGLE */
if (passwordToggle && adminPassword) {
  passwordToggle.addEventListener("click", () => {
    const isHidden = adminPassword.type === "password";
    adminPassword.type = isHidden ? "text" : "password";
    passwordToggle.textContent = isHidden ? "🙈" : "👁";
    passwordToggle.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password"
    );
  });
}

function showLoginMessage(message, type) {
  if (!adminLoginMessage) return;

  adminLoginMessage.textContent = message;
  adminLoginMessage.classList.remove("error", "success");

  if (type) {
    adminLoginMessage.classList.add(type);
  }
}

/* LOGIN SUBMIT */
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = adminEmail.value.trim().toLowerCase();
    const passwordValue = adminPassword.value.trim();

    showLoginMessage("", "");

    if (!emailValue) {
      showLoginMessage("Please enter your registered email address.", "error");
      return;
    }

    if (!passwordValue) {
      showLoginMessage("Please enter your password.", "error");
      return;
    }

    showLoginMessage("Checking login details...", "");

    const payload = {
      action: "loginMember",
      email: emailValue,
      password: passwordValue
    };

    try {
      const response = await fetch(LOGIN_WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("LOGIN RESULT:", result);

      if (!result.success) {
        showLoginMessage(result.message || "Invalid login details.", "error");
        return;
      }

      const member = result.member || {};

      sessionStorage.setItem("tohLoggedIn", "true");
      sessionStorage.setItem("tohUserEmail", member.Email || emailValue);
      sessionStorage.setItem("tohUserName", member.FullName || "");
      sessionStorage.setItem("tohUserRole", member.Role || "Member");
      sessionStorage.setItem("tohUserDesignation", member.Designation || "");
      sessionStorage.setItem(
        "tohMustChangePassword",
        member.MustChangePassword ? "true" : "false"
      );

      /* backward compatibility */
      sessionStorage.setItem("tohAdminLoggedIn", "true");
      sessionStorage.setItem("tohAdminEmail", member.Email || emailValue);
      sessionStorage.setItem("tohAdminRole", member.Role || "Member");

      showLoginMessage("Login successful. Redirecting...", "success");

      setTimeout(() => {
        if (member.MustChangePassword) {
          window.location.href = "change-password.html";
        } else {
          window.location.href = "office-portal.html";
        }
      }, 800);

    } catch (error) {

  console.error("LOGIN ERROR:", error);

  showLoginMessage(
    error.message || "Login failed.",
    "error"
  );
}
  });
}

/* BUBBLE CHAT */
if (bubbleChatButton) {
  bubbleChatButton.addEventListener("click", () => {
    window.open("https://www.facebook.com/share/1J3FyRocdZ/", "_blank");
  });
}