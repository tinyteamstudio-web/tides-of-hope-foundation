const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

document.addEventListener("DOMContentLoaded", function () {
    loadActivityDetails();
});

async function loadActivityDetails() {
    const params =
        new URLSearchParams(window.location.search);

    const programId =
        params.get("id") || "";

    const wrap =
        document.getElementById("activityDetailsWrap");

    if (!wrap) return;

    if (!programId) {
        wrap.innerHTML =
            '<article class="empty-state-card">No activity selected.</article>';
        return;
    }

    try {
        const response =
            await fetch(WEB_APP_URL + "?action=getUpcomingPrograms");

        const result =
            await response.json();

        const items =
            result.data || [];

        const activity =
            items.find(function (item) {
                return String(item.ProgramID || "") === String(programId);
            });

        if (!result.success || !activity) {
            wrap.innerHTML =
                '<article class="empty-state-card">Activity not found.</article>';
            return;
        }

        renderActivityDetails(activity);

    } catch (error) {
        console.error(error);

        wrap.innerHTML =
            '<article class="empty-state-card">Unable to load activity details.</article>';
    }
}

function renderActivityDetails(item) {
    const title =
        escapeHtml(item.ProgramTitle || "Activity Details");

    const description =
        escapeHtml(item.ProgramDescription || "");

    const location =
        escapeHtml(item.ProgramLocation || "Location to be announced");

    const type =
        escapeHtml(item.ProgramType || "Activity");

    const imageUrl =
        item.ProgramImage || "";

    const dateText =
        formatDate(item.ProgramDate || "");

    const timeText =
        escapeHtml(item.ProgramTime || "Time: TBD");

    const mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(location);

    document.getElementById("activityTitle").textContent =
        title;

    document.getElementById("activityIntro").textContent =
        dateText + " • " + location;

    const imageHtml =
        imageUrl
            ? '<img src="' + imageUrl + '" alt="' + title + '" class="activity-details-image">'
            : '<div class="activity-details-image activity-image-placeholder">🌊</div>';

    document.getElementById("activityDetailsWrap").innerHTML =
        imageHtml +
        '<div class="activity-details-content">' +
        '<span class="activity-category">' + type + '</span>' +
        '<h2>' + title + '</h2>' +
        '<p>' + description + '</p>' +

        '<div class="activity-detail-list">' +
        '<div><strong>📅 Date:</strong> ' + dateText + '</div>' +
        '<div><strong>🕒 Time:</strong> ' + timeText + '</div>' +
        '<div><strong>📍 Location:</strong> ' + location + '</div>' +
        '</div>' +

        '<div class="activity-actions">' +
        '<a href="' + mapUrl + '" target="_blank" rel="noopener noreferrer" class="activity-link">View Map</a>' +
        '<a href="membership.html" class="activity-link primary">Get Involved</a>' +
        '<a href="upcoming-activities.html" class="activity-link">Back to Activities</a>' +
        '</div>' +
        '</div>';
}

function formatDate(value) {
    if (!value) return "Date to be announced";

    const rawDate =
        String(value).trim();

    if (
        rawDate.includes("T") ||
        !isNaN(Date.parse(rawDate))
    ) {
        return new Date(rawDate).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
    }

    return rawDate;
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}