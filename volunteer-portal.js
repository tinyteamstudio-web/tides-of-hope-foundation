/* =========================================================
   TIDES OF HOPE
   VOLUNTEER PORTAL
========================================================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================================================
   LOGIN CHECK
========================================================= */

const isLoggedIn =
  sessionStorage.getItem("tohLoggedIn") === "true" ||
  sessionStorage.getItem("tohAdminLoggedIn") === "true";

if (!isLoggedIn) {
  window.location.href = "admin-login.html";
}

/* =========================================================
   USER INFO
========================================================= */

const userEmail =
  sessionStorage.getItem("tohUserEmail") ||
  sessionStorage.getItem("tohAdminEmail") ||
  "";

const userRole =
  sessionStorage.getItem("tohUserRole") ||
  sessionStorage.getItem("tohAdminRole") ||
  "Volunteer";

const welcomeText =
  document.getElementById(
    "volunteerWelcomeText"
  );

if (welcomeText) {
  welcomeText.textContent =
    "Logged in as " +
    userEmail +
    " (" +
    userRole +
    ")";
}

/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
  document.getElementById(
    "volunteerLogoutBtn"
  );

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    function (e) {

      e.preventDefault();

      sessionStorage.clear();

      window.location.href =
        "admin-login.html";

    }
  );

}

/* =========================================================
   LOAD VOLUNTEERS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadVolunteers();

  }
);

async function loadVolunteers() {

  const grid =
    document.getElementById(
      "volunteerDirectoryGrid"
    );

  try {

    if (!WEBAPP_URL.includes("http")) {

      grid.innerHTML = `
        <div class="empty-state">
          Volunteer API not connected yet.
        </div>
      `;

      return;
    }

    const response =
      await fetch(
        WEBAPP_URL +
        "?action=getVolunteers"
      );

    const result =
      await response.json();

    const volunteers =
      result.data || [];

    renderVolunteers(
      volunteers
    );

  } catch (error) {

    console.error(error);

    grid.innerHTML = `
      <div class="empty-state">
        Unable to load volunteers.
      </div>
    `;

  }

}

/* =========================================================
   RENDER VOLUNTEERS
========================================================= */

function renderVolunteers(
  volunteers
) {

  const grid =
    document.getElementById(
      "volunteerDirectoryGrid"
    );

  const totalEl =
    document.getElementById(
      "totalVolunteers"
    );

  if (totalEl) {
    totalEl.textContent =
      volunteers.length;
  }

  if (
    !volunteers ||
    volunteers.length === 0
  ) {

    grid.innerHTML = `
      <div class="empty-state">
        No volunteer records found.
      </div>
    `;

    return;
  }

  grid.innerHTML = "";

  volunteers.forEach(
    function (volunteer) {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "volunteer-profile-card";

      const photo =
        volunteer.ProfilePhoto || "";

      const initials =
        getInitials(
          volunteer.FullName || "V"
        );

      card.innerHTML = `

        <div class="volunteer-profile-header">

          ${
            photo
              ? `
            <img
              src="${photo}"
              class="volunteer-avatar"
              alt="${volunteer.FullName}"
            >
          `
              : `
            <div class="volunteer-avatar-placeholder">
              ${initials}
            </div>
          `
          }

          <div>
            <h3>
              ${
                volunteer.FullName ||
                "Volunteer"
              }
            </h3>

            <p class="volunteer-role">
              ${
                volunteer.VolunteerType ||
                "Volunteer"
              }
            </p>
          </div>

        </div>

        <p>
          ${
            volunteer.Notes ||
            "Serving the community through Tides of Hope."
          }
        </p>

        <div class="volunteer-meta-list">

          <div class="volunteer-meta-item">
            Status:
            ${
              volunteer.Status ||
              "Active"
            }
          </div>

          <div class="volunteer-meta-item">
            Contact:
            ${
              volunteer.MobileNumber ||
              "-"
            }
          </div>

        </div>

        <div class="volunteer-badge-row">

          <span class="volunteer-badge">
            Volunteer
          </span>

          <span class="volunteer-badge">
            Community Service
          </span>

        </div>

      `;

      grid.appendChild(
        card
      );

    }
  );

}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name) {

  if (!name) {
    return "V";
  }

  return name
    .split(" ")
    .map(
      word =>
        word.charAt(0)
    )
    .join("")
    .substring(0, 2)
    .toUpperCase();

}