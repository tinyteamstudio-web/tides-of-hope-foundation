/* =========================================================
   TIDES OF HOPE
   MY FAMILY GALLERY MANAGER
========================================================= */

const WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

document.addEventListener("DOMContentLoaded", function () {
    loadMyGalleryUploads();
});

async function loadMyGalleryUploads() {
    const container = document.getElementById("myGalleryUploads");
    if (!container) return;

    try {
        const uploaderName =
            sessionStorage.getItem("tohFamilyName") ||
            sessionStorage.getItem("tohVolunteerName") ||
            "Family Member";

        const result = await sendRequest({
            action: "getMyGalleryItems",
            uploaderName: uploaderName
        });

        renderMyGalleryUploads(result.data || []);
    } catch (error) {
        console.error(error);

        container.innerHTML = `
      <div class="gallery-empty">
        Unable to load your gallery uploads.
      </div>
    `;
    }
}

function renderMyGalleryUploads(items) {
    const container = document.getElementById("myGalleryUploads");
    if (!container) return;

    if (!items.length) {
        container.innerHTML = `
      <div class="gallery-empty">
        You have no gallery uploads yet.
      </div>
    `;
        return;
    }

    container.innerHTML = items
        .map(function (item) {
            return createMyGalleryCard(item);
        })
        .join("");
}

function createMyGalleryCard(item) {
    const mediaId = item.MediaID || "";
    const title = item.EventTitle || "Family Moment";
    const caption = item.Caption || "";
    const status = item.ApprovalStatus || "APPROVED";
    const media = createMedia(item);

    return `
    <article class="family-gallery-card">
      <div class="family-gallery-media">
        ${media}
      </div>

      <div class="family-gallery-body">
        <h3>${escapeHtml(title)}</h3>

        <p>${escapeHtml(caption)}</p>

        <p>
          Status:
          <strong>${escapeHtml(status)}</strong>
        </p>

        <div class="gallery-buttons">
          <button
            type="button"
            class="btn btn-secondary"
            onclick="editGalleryItem('${mediaId}')"
          >
            Edit Caption
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            onclick="archiveGalleryItem('${mediaId}')"
          >
            Archive
          </button>
        </div>
      </div>
    </article>
  `;
}

function createMedia(item) {
    const url = item.MediaURL || "";
    const type = String(item.MediaType || "image").toLowerCase();

    if (!url) {
        return `
      <div style="
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#64748b;
      ">
        No Media
      </div>
    `;
    }

    if (type.includes("video")) {
        return `
      <video controls>
        <source src="${url}">
      </video>
    `;
    }

    return `
    <img src="${url}" alt="Gallery Upload">
  `;
}

async function editGalleryItem(mediaId) {
    const caption = prompt("Update caption:");

    if (!caption) return;

    const result = await sendRequest({
        action: "updateGalleryItem",
        mediaId: mediaId,
        caption: caption
    });

    alert(result.message || "Gallery item updated.");

    loadMyGalleryUploads();
}

async function archiveGalleryItem(mediaId) {
    const ok = confirm("Archive this gallery item?");

    if (!ok) return;

    const result = await sendRequest({
        action: "archiveGalleryItem",
        mediaId: mediaId
    });

    alert(result.message || "Gallery item archived.");

    loadMyGalleryUploads();
}

async function sendRequest(payload) {
    const response = await fetch(WEBAPP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    return await response.json();
}

function escapeHtml(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}