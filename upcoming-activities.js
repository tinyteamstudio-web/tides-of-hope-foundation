const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

let allActivities = [];

document.addEventListener("DOMContentLoaded", function () {
    initializeMenu();
    initializeFilters();
    loadActivities();
});

function initializeMenu() {
    const menuToggle =
        document.getElementById("menuToggle");

    const siteNav =
        document.getElementById("siteNav");

    if (!menuToggle || !siteNav) return;

    menuToggle.addEventListener("click", function () {
        siteNav.classList.toggle("active");
    });
}

function initializeFilters() {
    const buttons =
        document.querySelectorAll(".activity-filter");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            renderActivities(button.dataset.filter || "all");
        });
    });
}

async function loadActivities() {
    const grid =
        document.getElementById("activitiesGrid");

    if (!grid) return;

    grid.innerHTML =
        '<article class="empty-state-card">Loading upcoming activities...</article>';

    try {
        const response =
            await fetch(WEB_APP_URL + "?action=getUpcomingPrograms");

        const result =
            await response.json();

        if (!result.success || !result.data || !result.data.length) {
            grid.innerHTML =
                '<article class="empty-state-card">No upcoming activities available yet.</article>';
            return;
        }

        allActivities =
            result.data;

        renderActivities("all");

    } catch (error) {
        console.error(error);

        grid.innerHTML =
            '<article class="empty-state-card">Unable to load upcoming activities.</article>';
    }
}

function renderActivities(filter) {
    const grid =
        document.getElementById("activitiesGrid");

    if (!grid) return;

    let items =
        allActivities.slice();

    if (filter && filter !== "all") {
        items =
            items.filter(function (item) {
                const category =
                    String(
                        item.Category ||
                        item.ProgramType ||
                        item.Type ||
                        ""
                    ).toLowerCase();

                return category.includes(filter);
            });
    }

    if (!items.length) {
        grid.innerHTML =
            '<article class="empty-state-card">No activities found for this filter.</article>';
        return;
    }

    grid.innerHTML =
        items.map(renderActivityCard).join("");
}

function renderActivityCard(item) {
    const programId =
        item.ProgramID || "";

    const title =
        escapeHtml(
            item.ProgramTitle ||
            item.Title ||
            "Upcoming Activity"
        );

    const category =
        escapeHtml(
            item.ProgramType ||
            item.Category ||
            "Activity"
        );

    const description =
        escapeHtml(
            item.ProgramDescription ||
            item.Description ||
            ""
        );

    const location =
        escapeHtml(
            item.ProgramLocation ||
            item.Location ||
            ""
        );

    const imageUrl =
        escapeAttribute(item.ProgramImage || "");

    const dateValue =
        item.ProgramDate || "";

    const timeValue =
        item.ProgramTime || "";

    let dateText =
        "Date to be announced";

    if (dateValue) {
        const rawDate =
            String(dateValue).trim();

        if (
            rawDate.includes("T") ||
            !isNaN(Date.parse(rawDate))
        ) {
            dateText =
                new Date(rawDate).toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );
        } else {
            dateText =
                escapeHtml(rawDate);
        }
    }

    const timeText =
        escapeHtml(timeValue || "Time: TBD");

    const mapQuery =
        encodeURIComponent(location || title);

    const mapUrl =
        location
            ? "https://www.google.com/maps/search/?api=1&query=" + mapQuery
            : "";

    const imageHtml =
        imageUrl
            ? '<img src="' + imageUrl + '" alt="' + title + '" class="activity-image">'
            : '<div class="activity-image activity-image-placeholder">🌊</div>';

    const mapButton =
        location
            ? '<a href="' + mapUrl + '" target="_blank" rel="noopener noreferrer" class="activity-link">View Map</a>'
            : "";

    return (
        '<article class="activity-card">' +
        imageHtml +

        '<div class="activity-date-box">' +
        '<span>' + dateText + '</span>' +
        '</div>' +

        '<div class="activity-card-body">' +
        '<span class="activity-category">' + category + '</span>' +
        '<h3>' + title + '</h3>' +
        '<p>' + description + '</p>' +

        '<div class="activity-meta">' +
        '<span>🕒 ' + timeText + '</span>' +
        '<span>📍 ' + (location || "Location to be announced") + '</span>' +
        '</div>' +

        '<div class="activity-actions">' +
        mapButton +
        '<a href="activity-details.html?id=' +
        encodeURIComponent(programId) +
        '" class="activity-link primary">Join / Learn More</a>' +
        '</div>' +
        '</div>' +
        '</article>'
    );
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
