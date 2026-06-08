/* =========================================================
   TIDES OF HOPE
   VOLUNTEER DASHBOARD
========================================================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================================================
   LOGIN CHECK
========================================================= */

const volunteerLoggedIn =
  sessionStorage.getItem("tohVolunteerLoggedIn") === "true";

if (!volunteerLoggedIn) {
  window.location.href = "volunteer-login.html";
}

/* =========================================================
   SESSION VALUES
========================================================= */

const volunteerId =
  sessionStorage.getItem("tohVolunteerID") || "";

const volunteerUsername =
  sessionStorage.getItem("tohVolunteerUsername") || "";

const volunteerName =
  sessionStorage.getItem("tohVolunteerName") || "Volunteer";

/* =========================================================
   LOAD PAGE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadVolunteerProfile();
    initializeLogout();

  }
);

/* =========================================================
   LOAD PROFILE
========================================================= */

async function loadVolunteerProfile() {

  try {

    const result =
      await sendRequest({

        action: "getVolunteerProfile",
        volunteerId: volunteerId,
        username: volunteerUsername

      });

    if (
      result.success &&
      result.volunteer
    ) {

      renderVolunteer(
        result.volunteer
      );

    } else {

      renderVolunteer({
        FullName: volunteerName,
        Username: volunteerUsername,
        BadgeLevel: "New Volunteer",
        TotalHours: 0
      });

    }

  } catch (error) {

    console.error(error);

  }

}

/* =========================================================
   RENDER
========================================================= */

function renderVolunteer(
  volunteer
) {

  const fullName =
    volunteer.FullName ||
    volunteerName ||
    "Volunteer";

  const username =
    volunteer.Username ||
    volunteerUsername ||
    "volunteer";

  const badge =
    volunteer.BadgeLevel ||
    "New Volunteer";

  const hours =
    volunteer.TotalHours ||
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
    document.getElementById(
      "dashboardAvatar"
    );

  if (avatar) {

    avatar.textContent =
      getInitials(
        fullName
      );

  }

}

/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {

  const logoutBtn =
    document.getElementById(
      "volunteerLogoutBtn"
    );

  if (!logoutBtn) return;

  logoutBtn.addEventListener(
    "click",
    function (e) {

      e.preventDefault();

      sessionStorage.removeItem(
        "tohVolunteerLoggedIn"
      );

      sessionStorage.removeItem(
        "tohVolunteerID"
      );

      sessionStorage.removeItem(
        "tohVolunteerUsername"
      );

      sessionStorage.removeItem(
        "tohVolunteerName"
      );

      window.location.href =
        "volunteer-login.html";

    }
  );

}

/* =========================================================
   API REQUEST
========================================================= */

async function sendRequest(
  payload
) {

  const response =
    await fetch(
      WEBAPP_URL,
      {
        method: "POST",
        body: JSON.stringify(
          payload
        )
      }
    );

  return await response.json();

}

/* =========================================================
   HELPERS
========================================================= */

function setText(
  id,
  value
) {

  const element =
    document.getElementById(
      id
    );

  if (element) {

    element.textContent =
      value;

  }

}

function getInitials(
  name
) {

  return String(name)
    .split(" ")
    .map(
      word =>
      word.charAt(0)
    )
    .join("")
    .substring(0, 2)
    .toUpperCase();

}