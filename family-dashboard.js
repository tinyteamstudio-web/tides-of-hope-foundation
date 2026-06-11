/* =========================================================
   TIDES OF HOPE
   FAMILY DASHBOARD
========================================================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================================================
   LOGIN CHECK
========================================================= */

const familyLoggedIn =
  sessionStorage.getItem("tohFamilyLoggedIn") === "true" ||
  sessionStorage.getItem("tohVolunteerLoggedIn") === "true";

if (!familyLoggedIn) {
  window.location.href = "family-login.html";
}

/* =========================================================
   SESSION VALUES
========================================================= */

const familyId =
  sessionStorage.getItem("tohVolunteerID") || "";

const familyUsername =
  sessionStorage.getItem("tohFamilyUsername") ||
  sessionStorage.getItem("tohVolunteerUsername") ||
  "";

const familyName =
  sessionStorage.getItem("tohFamilyName") ||
  sessionStorage.getItem("tohVolunteerName") ||
  "Family Member";

/* =========================================================
   LOAD PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function() {
  loadFamilyProfile();
  initializeLogout();
});

/* =========================================================
   LOAD PROFILE
========================================================= */

async function loadFamilyProfile() {
  try {
    const result =
      await sendRequest({
        action: "getVolunteerProfile",
        volunteerId: familyId,
        username: familyUsername
      });

    if (result.success && result.volunteer) {
      renderFamilyMember(result.volunteer);
    } else {
      renderFamilyMember({
        FullName: familyName,
        Username: familyUsername,
        BadgeLevel: "Family Member",
        TotalHours: 0
      });
    }

  } catch (error) {
    console.error(error);

    renderFamilyMember({
      FullName: familyName,
      Username: familyUsername,
      BadgeLevel: "Family Member",
      TotalHours: 0
    });
  }
}

/* =========================================================
   RENDER FAMILY MEMBER
========================================================= */

function renderFamilyMember(member) {
  const fullName =
    member.FullName ||
    familyName ||
    "Family Member";

  const username =
    member.Username ||
    familyUsername ||
    "family";

  const badge =
    member.BadgeLevel ||
    "Family Member";

  const hours =
    member.TotalHours ||
    0;

  setText(
    "dashboardWelcomeName",
    "Welcome, " + fullName
  );

  setText(
    "dashboardFullName",
    fullName
  );

  setText(
    "dashboardUsername",
    "@" + username
  );

  setText(
    "dashboardBadge",
    badge
  );

  setText(
    "dashboardHours",
    hours
  );

  const avatar =
    document.getElementById("dashboardAvatar");

  if (avatar) {
    avatar.textContent =
      getInitials(fullName);
  }
}

/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {
  const logoutBtn =
    document.getElementById("volunteerLogoutBtn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();

    sessionStorage.removeItem("tohVolunteerLoggedIn");
    sessionStorage.removeItem("tohVolunteerID");
    sessionStorage.removeItem("tohVolunteerUsername");
    sessionStorage.removeItem("tohVolunteerName");

    sessionStorage.removeItem("tohFamilyLoggedIn");
    sessionStorage.removeItem("tohFamilyUsername");
    sessionStorage.removeItem("tohFamilyName");

    window.location.href =
      "family-login.html";
  });
}

/* =========================================================
   API REQUEST
========================================================= */

async function sendRequest(payload) {
  const response =
    await fetch(
      WEBAPP_URL,
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

  return await response.json();
}

/* =========================================================
   HELPERS
========================================================= */

function setText(id, value) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent =
      value;
  }
}

function getInitials(name) {
  return String(name)
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
}