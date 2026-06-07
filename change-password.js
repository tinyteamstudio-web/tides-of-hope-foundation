/* =========================================
   TIDES OF HOPE - CHANGE PASSWORD
========================================= */

const CHANGE_PASSWORD_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

const changePasswordForm = document.getElementById("changePasswordForm");
const changeEmail = document.getElementById("changeEmail");
const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const changePasswordMessage = document.getElementById("changePasswordMessage");
const bubbleChatButton = document.getElementById("bubbleChatButton");

function showChangeMessage(message, type) {
  if (!changePasswordMessage) return;

  changePasswordMessage.textContent = message;
  changePasswordMessage.classList.remove("error", "success");

  if (type) {
    changePasswordMessage.classList.add(type);
  }
}

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const input = document.getElementById(targetId);

    if (!input) return;

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    button.textContent = isHidden ? "🙈" : "👁";
  });
});

if (changeEmail) {
  changeEmail.value =
    sessionStorage.getItem("tohUserEmail") ||
    sessionStorage.getItem("tohAdminEmail") ||
    "";
}

if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = changeEmail.value.trim().toLowerCase();
    const currentPasswordValue = currentPassword.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    showChangeMessage("", "");

    if (!emailValue) {
      showChangeMessage("Please enter your email address.", "error");
      return;
    }

    if (!currentPasswordValue || !newPasswordValue || !confirmPasswordValue) {
      showChangeMessage("Please complete all password fields.", "error");
      return;
    }

    if (newPasswordValue.length < 6) {
      showChangeMessage("New password must be at least 6 characters.", "error");
      return;
    }

    if (newPasswordValue !== confirmPasswordValue) {
      showChangeMessage("New password and confirmation do not match.", "error");
      return;
    }

    if (newPasswordValue === "123456") {
      showChangeMessage("Please choose a password different from the temporary password.", "error");
      return;
    }

    showChangeMessage("Saving new password...", "");

    const payload = {
      action: "changeMemberPassword",
      email: emailValue,
      currentPassword: currentPasswordValue,
      newPassword: newPasswordValue
    };

    try {
      const response = await fetch(CHANGE_PASSWORD_WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("CHANGE PASSWORD RESULT:", result);

      if (!result.success) {
        showChangeMessage(result.message || "Unable to change password.", "error");
        return;
      }

      sessionStorage.setItem("tohMustChangePassword", "false");

      showChangeMessage("Password changed successfully. Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "office-portal.html";
      }, 1000);

      } catch (error) {
      console.error("CHANGE PASSWORD ERROR:", error);

      showChangeMessage(
        error.message || "Password change failed.",
        "error"
      );
    }
  });
}

if (bubbleChatButton) {
  bubbleChatButton.addEventListener("click", () => {
    window.open("https://www.facebook.com/share/1J3FyRocdZ/", "_blank");
  });
}