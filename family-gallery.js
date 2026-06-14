/* =========================================================
   TIDES OF HOPE
   FAMILY GALLERY
========================================================= */

const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";


const familyLoggedIn =
  sessionStorage.getItem("tohFamilyLoggedIn") === "true" ||
  sessionStorage.getItem("tohVolunteerLoggedIn") === "true";

if (!familyLoggedIn) {
  window.location.href = "family-login.html";
}

/* =========================================================
   LOAD PAGE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadFamilyGallery();
    loadMyGalleryUploads();
  }
);

/* =========================================================
   LOAD PUBLIC GALLERY
========================================================= */

async function loadFamilyGallery() {
  const grid = document.getElementById("familyGalleryGrid");

  if (!grid) return;

  try {
    const response = await fetch(
      WEBAPP_URL + "?action=getApprovedGalleryItems"
    );

    const result = await response.json();

    renderGallery(result.data || []);
  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <div class="gallery-empty">
        Unable to load gallery.
      </div>
    `;
  }
}

/* =========================================================
   LOAD MY UPLOADS
========================================================= */

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
        Unable to load your uploads.
      </div>
    `;
  }
}

/* =========================================================
   RENDER PUBLIC GALLERY
========================================================= */

function renderGallery(items) {
  const grid = document.getElementById("familyGalleryGrid");

  if (!grid) return;

  if (!items || items.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty">
        🌊 Moments shared by the Tides of Hope Family will appear here.
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map(function (item) {
      return createGalleryCard(item, false);
    })
    .join("");
}

/* =========================================================
   RENDER MY UPLOADS
========================================================= */

function renderMyGalleryUploads(items) {
  const container = document.getElementById("myGalleryUploads");

  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div style="grid-column: 1 / -1; margin: 8px 0 4px;">
      <span class="section-tag">My Uploads</span>
      <h2 style="color:#082f49;">Manage My Gallery Uploads</h2>
      <p style="color:#52677a;">
        Edit captions or archive your own uploaded family moments.
      </p>
    </div>
  ` + items
      .map(function (item) {
        return createGalleryCard(item, true);
      })
      .join("");
}

/* =========================================================
   CARD TEMPLATE
========================================================= */

function createGalleryCard(item, isMine) {
  const media = createMedia(item);

  const title =
    item.Title ||
    item.EventTitle ||
    "Family Moment";

  const description =
    item.Description ||
    item.Caption ||
    "";

  const uploadedBy =
    item.UploadedBy ||
    item.UploaderName ||
    "Tides of Hope Family";

  const status =
    item.ApprovalStatus ||
    "APPROVED";

  const mediaId =
    item.MediaID ||
    "";

  const actions = isMine
    ? `
      <div class="gallery-card-actions">
        <button
          type="button"
          class="btn btn-secondary"
          onclick="editGalleryItem('${mediaId}')"
        >
          Edit Caption
        </button>

        <button
          type="button"
          class="btn btn-secondary danger-link"
          onclick="archiveGalleryItem('${mediaId}')"
        >
          Archive
        </button>
      </div>
    `
    : "";

  const statusLine = isMine
    ? `
      <div class="family-gallery-meta">
        Status: <strong>${escapeHtml(status)}</strong>
      </div>
    `
    : `
      <div class="family-gallery-meta">
        Uploaded by ${escapeHtml(uploadedBy)}
      </div>
    `;

  return `
    <article class="family-gallery-card">
      <div class="family-gallery-media">
        ${media}
      </div>

      <div class="family-gallery-body">
        <h3>${escapeHtml(title)}</h3>

        <p>${escapeHtml(description)}</p>

        ${statusLine}

        ${actions}
      </div>
    </article>
  `;
}

/* =========================================================
   MEDIA
========================================================= */

function createMedia(item) {
  const url =
    item.FileURL ||
    item.MediaURL ||
    item.Photo ||
    "";

  const type =
    String(
      item.MediaType ||
      item.Type ||
      "image"
    ).toLowerCase();

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
    <img
      src="${url}"
      alt="Family Gallery Item"
    >
  `;
}

/* =========================================================
   EDIT
========================================================= */

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
  loadFamilyGallery();
}

/* =========================================================
   ARCHIVE
========================================================= */

async function archiveGalleryItem(mediaId) {
  const ok = confirm("Archive this gallery item?");

  if (!ok) return;

  const result = await sendRequest({
    action: "archiveGalleryItem",
    mediaId: mediaId
  });

  alert(result.message || "Gallery item archived.");

  loadMyGalleryUploads();
  loadFamilyGallery();
}

/* =========================================================
   API
========================================================= */

async function sendRequest(payload) {
  const response = await fetch(WEBAPP_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return await response.json();
}

/* =========================================================
   HELPERS
========================================================= */

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}