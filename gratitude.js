/* =========================================================
   TIDES OF HOPE
   PUBLIC GRATITUDE WALL
========================================================= */

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const siteNav =
    document.getElementById("siteNav");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
        siteNav.classList.toggle("active");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            siteNav.classList.remove("active");
        });
    });
}

/* =========================
   LOAD GRATITUDE WALL
========================= */

document.addEventListener("DOMContentLoaded", function () {
    loadPublicGratitudeWall();
});

async function loadPublicGratitudeWall() {
    const wrap =
        document.getElementById("publicGratitudeGrid");

    if (!wrap) return;

    wrap.innerHTML =
        '<article class="empty-state-card">Loading gratitude posts...</article>';

    try {
        const response =
            await fetch(WEB_APP_URL + "?action=getGratitudePosts");

        const data =
            await response.json();

        const items =
            data.items ||
            data.data ||
            [];

        if (!data.success || !items.length) {
            wrap.innerHTML =
                '<article class="empty-state-card">No gratitude posts available yet.</article>';
            return;
        }

        wrap.innerHTML =
            items.map(renderGratitudeCard).join("");

    } catch (error) {
        console.error(error);

        wrap.innerHTML =
            '<article class="empty-state-card">Unable to load gratitude posts right now.</article>';
    }
}

/* =========================
   RENDER CARD
========================= */

function renderGratitudeCard(item) {
    const title =
        escapeHtml(item.Title || item.title || "Gratitude");

    const message =
        escapeHtml(item.Message || item.message || "");

    const fromName =
        escapeHtml(
            item.FromName ||
            item.fromName ||
            item.UploaderName ||
            "Tides of Hope"
        );

    const mediaType =
        String(item.MediaType || item.mediaType || "").toLowerCase();

    const mediaUrl =
        item.MediaURL ||
        item.FileURL ||
        item.ImageURL ||
        item.PhotoURL ||
        "";

    const safeMediaUrl =
        escapeAttribute(mediaUrl);

    const dateValue =
        item.Timestamp ||
        item.CreatedAt ||
        item.Date ||
        "";

    const dateText =
        formatDate(dateValue);

    let mediaHtml = "";

    if (mediaUrl && mediaType === "video") {
        mediaHtml =
            '<video class="gratitude-media" controls preload="metadata">' +
            '<source src="' + safeMediaUrl + '">' +
            'Your browser does not support video.' +
            '</video>';
    } else if (mediaUrl) {
        mediaHtml =
            '<img src="' +
            safeMediaUrl +
            '" alt="' +
            title +
            '" class="gratitude-media" onerror="this.style.display=\'none\';">';
    }

    return (
        '<article class="gratitude-card">' +
        mediaHtml +
        '<div class="gratitude-content">' +
        '<div class="gratitude-heart">❤️</div>' +
        '<h3>' + title + '</h3>' +
        '<p>' + message + '</p>' +
        '<div class="gratitude-meta">' +
        '<span>— ' + fromName + '</span>' +
        (
            dateText
                ? '<span>📅 ' + dateText + '</span>'
                : ''
        ) +
        '</div>' +
        '</div>' +
        '</article>'
    );
}

/* =========================
   HELPERS
========================= */

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

function formatDate(value) {
    if (!value) return "";

    const date =
        new Date(value);

    if (isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString();
}