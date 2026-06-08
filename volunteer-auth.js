/* =========================================================
   TIDES OF HOPE
   VOLUNTEER AUTH SYSTEM
========================================================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================================================
   VOLUNTEER REGISTRATION
========================================================= */

const volunteerRegisterForm =
  document.getElementById("volunteerRegisterForm");

if (volunteerRegisterForm) {
  volunteerRegisterForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const message = document.getElementById("registerMessage");

    message.textContent = "Submitting registration...";

    const payload = {
      action: "registerVolunteer",
      fullName: document.getElementById("fullName").value.trim(),
      username: document.getElementById("username").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim(),
      contactNumber: document.getElementById("contactNumber").value.trim(),
      address: document.getElementById("address").value.trim(),
      skills: document.getElementById("skills").value.trim(),
      availability: document.getElementById("availability").value.trim(),
      reason: document.getElementById("reason").value.trim()
    };

    try {
      const result = await sendVolunteerRequest(payload);

      message.textContent = result.message || "Registration finished.";

      if (result.success) {
        volunteerRegisterForm.reset();

        setTimeout(function() {
          window.location.href = "volunteer-login.html";
        }, 1200);
      }

    } catch (error) {
      console.error(error);
      message.textContent = "Unable to submit registration.";
    }
  });
}

/* =========================================================
   VOLUNTEER LOGIN
========================================================= */

const volunteerLoginForm =
  document.getElementById("volunteerLoginForm");

if (volunteerLoginForm) {
  volunteerLoginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const message = document.getElementById("loginMessage");

    message.textContent = "Checking account...";

    const payload = {
      action: "loginVolunteer",
      username: document.getElementById("username").value.trim(),
      password: document.getElementById("password").value.trim()
    };

    try {
      const result = await sendVolunteerRequest(payload);

      message.textContent = result.message || "Login finished.";

      if (result.success && result.volunteer) {
        sessionStorage.setItem("tohVolunteerLoggedIn", "true");
        sessionStorage.setItem("tohVolunteerID", result.volunteer.VolunteerID || "");
        sessionStorage.setItem("tohVolunteerUsername", result.volunteer.Username || "");
        sessionStorage.setItem("tohVolunteerName", result.volunteer.FullName || "");

        window.location.href = "volunteer-dashboard.html";
      }

    } catch (error) {
      console.error(error);
      message.textContent = "Unable to login.";
    }
  });
}

/* =========================================================
   API HELPER
========================================================= */

async function sendVolunteerRequest(payload) {
  if (!WEBAPP_URL.includes("http")) {
    return {
      success: false,
      message: "Apps Script Web App URL is not connected yet."
    };
  }

  const response = await fetch(WEBAPP_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return await response.json();
}