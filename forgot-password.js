/* =========================================
   TIDES OF HOPE - FORGOT PASSWORD
========================================= */

const FORGOT_PASSWORD_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const forgotEmail = document.getElementById("forgotEmail");
const forgotPasswordMessage = document.getElementById("forgotPasswordMessage");
const bubbleChatButton = document.getElementById("bubbleChatButton");

function showForgotMessage(message, type) {
  if (!forgotPasswordMessage) return;

  forgotPasswordMessage.textContent = message;
  forgotPasswordMessage.classList.remove("error", "success");

  if (type) {
    forgotPasswordMessage.classList.add(type);
  }
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailValue = forgotEmail.value.trim().toLowerCase();

    showForgotMessage("", "");

    if (!emailValue) {
      showForgotMessage("Please enter your registered email address.", "error");
      return;
    }

    showForgotMessage("Resetting password...", "");

    const payload = {
      action: "resetMemberPassword",
      email: emailValue
    };

    try {
      const response = await fetch(FORGOT_PASSWORD_WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!result.success) {
        showForgotMessage(result.message || "Unable to reset password.", "error");
        return;
      }

      showForgotMessage(
        "Password reset successful. You may now login using the temporary password.",
        "success"
      );

      setTimeout(() => {
        window.location.href = "admin-login.html";
      }, 1800);

    } catch (error) {
      showForgotMessage(
        "Reset failed. Please check your connection or Web App deployment.",
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