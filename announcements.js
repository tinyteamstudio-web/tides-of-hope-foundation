const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAnnouncements();

    }
);

async function loadAnnouncements() {

    const wrap =
        document.getElementById(
            "announcementsGrid"
        );

    if (!wrap) return;

    wrap.innerHTML = `
    <article class="empty-state-card">
      Loading announcements...
    </article>
  `;

    try {

        const response =
            await fetch(
                WEB_APP_URL +
                "?action=getAnnouncements"
            );

        const data =
            await response.json();

        if (
            !data.success ||
            !data.items ||
            !data.items.length
        ) {

            wrap.innerHTML = `
        <article class="empty-state-card">
          No announcements available.
        </article>
      `;

            return;
        }

        wrap.innerHTML = "";

        data.items.forEach(
            function (item) {

                const title =
                    item.Title ||
                    "Announcement";

                const message =
                    item.Message ||
                    "";

                const date =
                    item.Timestamp
                        ? new Date(
                            item.Timestamp
                        ).toLocaleDateString()
                        : "";

                wrap.innerHTML += `

          <article class="announcement-card">

            <div class="announcement-badge">
              📢 Official Announcement
            </div>

            <h3>
              ${title}
            </h3>

            <p>
              ${message}
            </p>

            <div class="announcement-date">
              📅 ${date}
            </div>

          </article>

        `;

            }
        );

    } catch (error) {

        wrap.innerHTML = `
      <article class="empty-state-card">
        Failed to load announcements.
      </article>
    `;
    }
}