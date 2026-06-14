/* =========================================================
   TIDES OF HOPE
   FAMILY GALLERY MULTI-UPLOAD
========================================================= */

const WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

const MAX_FILES = 30;

const familyLoggedIn =
    sessionStorage.getItem("tohFamilyLoggedIn") === "true" ||
    sessionStorage.getItem("tohVolunteerLoggedIn") === "true";

if (!familyLoggedIn) {
    window.location.href = "family-login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    loadEvents();
    initializeUpload();
    initializeFileCounter();
});

async function loadEvents() {
    const eventSelect = document.getElementById("eventId");
    if (!eventSelect) return;

    try {
        const response = await fetch(WEBAPP_URL + "?action=getActiveEvents");
        const result = await response.json();
        const events = result.data || [];

        eventSelect.innerHTML = `<option value="">Select Event</option>`;

        events.forEach(function (event) {
            const option = document.createElement("option");
            option.value = event.EventID || "";
            option.textContent = event.EventTitle || event.Title || "Untitled Event";
            option.dataset.title = event.EventTitle || event.Title || "Family Moment";
            eventSelect.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        eventSelect.innerHTML = `<option value="">Unable to load events</option>`;
    }
}

function initializeUpload() {
    const uploadBtn = document.getElementById("uploadBtn");
    if (!uploadBtn) return;

    uploadBtn.addEventListener("click", submitGalleryUploads);
}

function initializeFileCounter() {
    const galleryFiles =
        document.getElementById("galleryFiles");

    const counter =
        document.getElementById("selectedFileCount");

    if (!galleryFiles || !counter) return;

    galleryFiles.addEventListener("change", function () {
        const count = galleryFiles.files.length;

        if (count > MAX_FILES) {
            counter.textContent =
                "You selected " + count + " files. Maximum is 30.";

            counter.style.color = "#b42318";
            return;
        }

        counter.textContent =
            count === 0
                ? ""
                : count + " file(s) selected.";

        counter.style.color = "#0b6d88";
    });
}

async function submitGalleryUploads() {
    const message = document.getElementById("uploadMessage");
    const eventSelect = document.getElementById("eventId");
    const mediaType = document.getElementById("mediaType");
    const caption = document.getElementById("caption");
    const galleryFiles = document.getElementById("galleryFiles");
    const counter = document.getElementById("selectedFileCount");

    if (!message || !eventSelect || !caption || !galleryFiles) return;

    const selectedOption =
        eventSelect.options[eventSelect.selectedIndex];

    const files = Array.from(galleryFiles.files || []);

    if (!eventSelect.value) {
        message.textContent = "Please select an event.";
        return;
    }

    if (!caption.value.trim()) {
        message.textContent = "Please add a caption.";
        return;
    }

    if (!files.length) {
        message.textContent = "Please choose at least 1 file.";
        return;
    }

    if (files.length > MAX_FILES) {
        message.textContent = "You can upload a maximum of 30 files at one time.";
        return;
    }

    message.textContent = "Uploading 0 of " + files.length + "...";

    let successCount = 0;
    let failedCount = 0;

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            message.textContent =
                "Uploading " + (i + 1) + " of " + files.length + "...";

            const detectedType =
                file.type && file.type.indexOf("video") === 0
                    ? "video"
                    : "image";

            const fileData = await fileToBase64(file);

            const payload = {
                action: "submitGalleryUpload",

                eventId: eventSelect.value,
                eventTitle: selectedOption.dataset.title || selectedOption.textContent,

                caption: caption.value.trim(),
                mediaType: detectedType || (mediaType ? mediaType.value : "image"),

                fileName: file.name,
                mimeType: file.type,
                fileData: fileData,
                fileSize: file.size,
                fileHash: "",

                uploaderID:
                    sessionStorage.getItem("tohVolunteerID") ||
                    sessionStorage.getItem("tohFamilyID") ||
                    "",

                uploaderName:
                    sessionStorage.getItem("tohFamilyName") ||
                    sessionStorage.getItem("tohVolunteerName") ||
                    "Family Member",

                uploaderRole: "Family Member",
                uploaderType: "FAMILY",

                uploadOrder: i + 1,
                batchTotal: files.length
            };

            const result = await sendRequest(payload);

            if (result.success) {
                successCount++;
            } else {
                failedCount++;
            }
        }

        message.textContent =
            "Upload finished. Successful: " +
            successCount +
            ". Failed: " +
            failedCount +
            ".";

        if (successCount > 0) {
            caption.value = "";
            galleryFiles.value = "";

            if (counter) {
                counter.innerHTML = "<strong>0</strong> files selected";
                counter.style.color = "#0b6d88";
            }

            setTimeout(function () {
                window.location.href = "family-gallery.html";
            }, 1500);
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Upload stopped because an error occurred.";
    }
}

async function sendRequest(payload) {
    const response = await fetch(WEBAPP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    return await response.json();
}

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}