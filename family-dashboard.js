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
  sessionStorage.getItem("tohFamilyID") ||
  sessionStorage.getItem("tohVolunteerID") ||
  "";

const familyUsername =
  sessionStorage.getItem("tohFamilyUsername") ||
  sessionStorage.getItem("tohVolunteerUsername") ||
  "";

const familyName =
  sessionStorage.getItem("tohFamilyName") ||
  sessionStorage.getItem("tohVolunteerName") ||
  "Family Member";

const familyEmail =
  sessionStorage.getItem("tohFamilyEmail") ||
  sessionStorage.getItem("tohVolunteerEmail") ||
  "";

/* =========================================================
   LOAD PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  loadFamilyProfile();
  loadDashboardCounters();
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
   LOAD DASHBOARD COUNTERS
========================================================= */

async function loadDashboardCounters() {
  try {
    const result =
      await sendRequest({
        action: "getFamilyDashboardCounters",
        familyId: familyId,
        email: familyEmail,
        username: familyUsername,
        fullName: familyName
      });

    console.log("Dashboard counters result:", result);
    console.log("Dashboard session:", {
      familyId: familyId,
      email: familyEmail,
      username: familyUsername,
      fullName: familyName
    });

    if (!result.success) {
      throw new Error(result.message || "Unable to load counters.");
    }

    setText(
      "dashboardGalleryUploads",
      result.galleryUploads || 0
    );

    setText(
      "dashboardCommunityPosts",
      result.communityPosts || 0
    );

  } catch (error) {
    console.error(error);

    setText("dashboardGalleryUploads", 0);
    setText("dashboardCommunityPosts", 0);
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

  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();

    sessionStorage.removeItem("tohVolunteerLoggedIn");
    sessionStorage.removeItem("tohVolunteerID");
    sessionStorage.removeItem("tohVolunteerUsername");
    sessionStorage.removeItem("tohVolunteerName");
    sessionStorage.removeItem("tohVolunteerEmail");

    sessionStorage.removeItem("tohFamilyLoggedIn");
    sessionStorage.removeItem("tohFamilyID");
    sessionStorage.removeItem("tohFamilyUsername");
    sessionStorage.removeItem("tohFamilyName");
    sessionStorage.removeItem("tohFamilyEmail");

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