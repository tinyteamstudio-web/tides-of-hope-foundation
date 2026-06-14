/* =========================================================
   TIDES OF HOPE
   FAMILY GRATITUDE WALL
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

const familyName =
    sessionStorage.getItem("tohFamilyName") ||
    sessionStorage.getItem("tohVolunteerName") ||
    "Family Member";

const familyEmail =
    sessionStorage.getItem("tohFamilyEmail") ||
    sessionStorage.getItem("tohVolunteerEmail") ||
    "";

const familyUsername =
    sessionStorage.getItem("tohFamilyUsername") ||
    sessionStorage.getItem("tohVolunteerUsername") ||
    "";

/* =========================================================
   LOAD PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeGratitudeForm();
    initializeLogout();
    loadGratitudeWall();
});

/* =========================================================
   INITIALIZE FORM
========================================================= */

function initializeGratitudeForm() {
    const form =
        document.getElementById("gratitudeForm");

    if (!form) return;

    form.addEventListener("submit", submitGratitudePost);
}

/* =========================================================
   SUBMIT GRATITUDE
========================================================= */

async function submitGratitudePost(event) {
    event.preventDefault();

    const form =
        document.getElementById("gratitudeForm");

    const status =
        document.getElementById("gratitudeMessageStatus");

    const title =
        getValue("gratitudeTitle");

    const message =
        getValue("gratitudeMessage");

    const fileInput =
        document.getElementById("gratitudeFile");

    if (!title) {
        showStatus(status, "Please enter a gratitude title.", "error");
        return;
    }

    if (!message) {
        showStatus(status, "Please write your gratitude message.", "error");
        return;
    }

    showStatus(status, "Publishing gratitude post...", "");

    try {
        let fileData = "";
        let fileName = "";
        let mimeType = "";
        let mediaType = "";

        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file =
                fileInput.files[0];

            fileData =
                await fileToBase64(file);

            fileName =
                file.name;

            mimeType =
                file.type;

            mediaType =
                file.type && file.type.indexOf("video") === 0
                    ? "video"
                    : "image";
        }

        const payload = {
            action: "submitGratitudeUpload",

            title: title,
            message: message,

            name: familyName,
            fromName: familyName,

            uploadedBy: familyEmail || familyUsername || familyName,
            uploaderName: familyName,
            uploaderEmail: familyEmail,
            uploaderUsername: familyUsername,
            uploaderType: "FAMILY",

            mediaType: mediaType,
            fileName: fileName,
            mimeType: mimeType,
            fileData: fileData
        };

        const result =
            await sendPost(payload);

        if (!result.success) {
            throw new Error(
                result.message ||
                "Unable to publish gratitude."
            );
        }

        showStatus(
            status,
            "Gratitude post published successfully.",
            "success"
        );

        if (form) {
            form.reset();
        }

        loadGratitudeWall();

    } catch (error) {
        console.error(error);

        showStatus(
            status,
            error.message ||
            "Unable to publish gratitude.",
            "error"
        );
    }
}

/* =========================================================
   LOAD GRATITUDE WALL
========================================================= */

async function loadGratitudeWall() {
    const wall =
        document.getElementById("gratitudeWall");

    if (!wall) return;

    wall.innerHTML =
        '<article class="dashboard-action-card"><h3>Loading gratitude posts...</h3></article>';

    try {
        const response =
            await fetch(
                WEBAPP_URL +
                "?action=getGratitudePosts"
            );

        const result =
            await response.json();

        const items =
            result.items ||
            result.data ||
            [];

        if (!result.success && !items.length) {
            throw new Error(
                result.message ||
                "Unable to load gratitude posts."
            );
        }

        if (!items.length) {
            wall.innerHTML =
                '<article class="dashboard-action-card"><h3>No gratitude posts yet.</h3><p>Be the first to share a message of appreciation.</p></article>';
            return;
        }

        wall.innerHTML =
            items
                .map(renderGratitudeCard)
                .join("");

    } catch (error) {
        console.error(error);

        wall.innerHTML =
            '<article class="dashboard-action-card"><h3>Unable to load gratitude posts.</h3><p>Please try again later.</p></article>';
    }
}

/* =========================================================
   RENDER GRATITUDE CARD
========================================================= */

function renderGratitudeCard(item) {
    const title =
        escapeHtml(
            item.Title ||
            item.title ||
            "Gratitude Message"
        );

    const message =
        escapeHtml(
            item.Message ||
            item.message ||
            ""
        );

    const fromName =
        escapeHtml(
            item.FromName ||
            item.fromName ||
            item.UploaderName ||
            item.Name ||
            "Tides of Hope Family"
        );

    const mediaType =
        String(
            item.MediaType ||
            item.mediaType ||
            ""
        ).toLowerCase();

    const mediaUrl =
        item.FileURL ||
        item.MediaURL ||
        item.ImageURL ||
        item.Photo ||
        item.photo ||
        "";

    const dateText =
        formatDate(
            item.Timestamp ||
            item.CreatedAt ||
            item.Date ||
            ""
        );

    let mediaHtml = "";

    if (mediaUrl && mediaType === "video") {
        mediaHtml =
            '<video controls style="width:100%;border-radius:16px;margin-bottom:16px;">' +
            '<source src="' +
            escapeAttribute(mediaUrl) +
            '">' +
            'Your browser does not support video.' +
            '</video>';
    } else if (mediaUrl) {
        mediaHtml =
            '<img src="' +
            escapeAttribute(mediaUrl) +
            '" alt="Gratitude image" style="width:100%;border-radius:16px;margin-bottom:16px;" onerror="this.style.display=\'none\';">';
    }

    return (
        '<article class="dashboard-action-card">' +
        mediaHtml +
        '<div class="dashboard-action-icon">❤️</div>' +
        '<h3>' + title + '</h3>' +
        '<p>' + message + '</p>' +
        '<strong>— ' + fromName + '</strong>' +
        (
            dateText
                ? '<span style="margin-top:8px;color:#64748b;font-size:0.9rem;">📅 ' + dateText + '</span>'
                : ''
        ) +
        '</article>'
    );
}

/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {
    const logoutBtn =
        document.getElementById("familyLogoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", function (event) {
        event.preventDefault();

        sessionStorage.clear();

        window.location.href =
            "family-login.html";
    });
}

/* =========================================================
   API
========================================================= */

async function sendPost(payload) {
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

function getValue(id) {
    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";
}

function showStatus(element, message, type) {
    if (!element) return;

    element.textContent =
        message;

    element.style.color =
        type === "error"
            ? "#b42318"
            : type === "success"
                ? "#0f766e"
                : "#0d3b66";
}

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader =
            new FileReader();

        reader.onload =
            function () {
                resolve(reader.result);
            };

        reader.onerror =
            reject;

        reader.readAsDataURL(file);
    });
}

function formatDate(value) {
    if (!value) return "";

    const date =
        new Date(value);

    if (isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString();
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
    return escapeHtml(value);
}