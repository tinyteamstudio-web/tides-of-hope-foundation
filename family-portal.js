/* =========================================================
   TIDES OF HOPE
   FAMILY COMMUNITY PORTAL
========================================================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================================================
   LOGIN CHECK
========================================================= */

const isLoggedIn =
  sessionStorage.getItem("tohFamilyLoggedIn") === "true" ||
  sessionStorage.getItem("tohVolunteerLoggedIn") === "true" ||
  sessionStorage.getItem("tohLoggedIn") === "true" ||
  sessionStorage.getItem("tohAdminLoggedIn") === "true";

if (!isLoggedIn) {
  window.location.href = "family-login.html";
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
  "Family Member";

const familyName =
  sessionStorage.getItem("tohFamilyName") ||
  sessionStorage.getItem("tohVolunteerName") ||
  userEmail ||
  "Family Member";

const welcomeText =
  document.getElementById("volunteerWelcomeText");

if (welcomeText) {
  welcomeText.textContent =
    "Logged in as " + familyName + " (" + userRole + ")";
}

/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
  document.getElementById("volunteerLogoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();

    sessionStorage.removeItem("tohFamilyLoggedIn");
    sessionStorage.removeItem("tohFamilyName");
    sessionStorage.removeItem("tohFamilyUsername");

    sessionStorage.removeItem("tohVolunteerLoggedIn");
    sessionStorage.removeItem("tohVolunteerID");
    sessionStorage.removeItem("tohVolunteerUsername");
    sessionStorage.removeItem("tohVolunteerName");

    window.location.href =
      "family-login.html";
  });
}

/* =========================================================
   LOAD FAMILY COMMUNITY RECORDS
========================================================= */

document.addEventListener("DOMContentLoaded", function() {
  loadFamilyCommunityRecords();
});

async function loadFamilyCommunityRecords() {
  const grid =
    document.getElementById("volunteerDirectoryGrid");

  if (!grid) return;

  try {
    if (!WEBAPP_URL.includes("http")) {
      grid.innerHTML = `
        <div class="empty-state">
          Family Community API is not connected yet.
        </div>
      `;
      return;
    }

    const response =
      await fetch(WEBAPP_URL + "?action=getVolunteers");

    const result =
      await response.json();

    const familyMembers =
      result.data || [];

    renderFamilyMembers(familyMembers);

  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <div class="empty-state">
        Unable to load family community records.
      </div>
    `;
  }
}

/* =========================================================
   RENDER FAMILY MEMBERS
========================================================= */

function renderFamilyMembers(familyMembers) {
  const grid =
    document.getElementById("volunteerDirectoryGrid");

  const totalEl =
    document.getElementById("totalVolunteers");

  if (totalEl) {
    totalEl.textContent =
      familyMembers.length;
  }

  if (!familyMembers || familyMembers.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        No family community records found.
      </div>
    `;
    return;
  }

  grid.innerHTML = "";

  familyMembers.forEach(function(member) {
    const card =
      document.createElement("article");

    card.className =
      "volunteer-profile-card";

    const photo =
      member.ProfilePhoto || "";

    const initials =
      getInitials(member.FullName || "F");

    card.innerHTML = `

      <div class="volunteer-profile-header">

        ${
          photo
            ? `
          <img
            src="${photo}"
            class="volunteer-avatar"
            alt="${member.FullName || "Family Member"}"
            onerror="this.style.display='none';"
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
              member.FullName ||
              "Family Member"
            }
          </h3>

          <p class="volunteer-role">
            ${
              member.VolunteerType ||
              member.BadgeLevel ||
              "Family Member"
            }
          </p>
        </div>

      </div>

      <p>
        ${
          member.Notes ||
          member.Bio ||
          "Part of the Tides of Hope Family Community."
        }
      </p>

      <div class="volunteer-meta-list">

        <div class="volunteer-meta-item">
          Status:
          ${
            member.Status ||
            "Active"
          }
        </div>

        <div class="volunteer-meta-item">
          Contact:
          ${
            member.MobileNumber ||
            member.ContactNumber ||
            "-"
          }
        </div>

      </div>

      <div class="volunteer-badge-row">

        <span class="volunteer-badge">
          Family Member
        </span>

        <span class="volunteer-badge">
          Community of Hope
        </span>

      </div>

    `;

    grid.appendChild(card);
  });
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name) {
  if (!name) {
    return "F";
  }

  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
}