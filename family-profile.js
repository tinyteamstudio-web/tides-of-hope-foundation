/* =========================================================
   TIDES OF HOPE
   FAMILY PROFILE
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
    initializeProfileForm();
    initializePhotoPreview();
    initializeLogout();
});

/* =========================================================
   LOAD PROFILE
========================================================= */

async function loadFamilyProfile() {
    const message =
        document.getElementById("profileMessage");

    try {
        const result =
            await sendRequest({
                action: "getFamilyProfile",
                familyId: familyId,
                username: familyUsername,
                email: familyEmail
            });

        if (!result.success) {
            throw new Error(result.message || "Unable to load profile.");
        }

        renderProfile(result.profile || {});

    } catch (error) {
        console.error(error);

        if (message) {
            message.textContent =
                "Unable to load profile.";
        }

        renderProfile({
            VolunteerID: familyId,
            FullName: familyName,
            Username: familyUsername,
            Email: familyEmail
        });
    }
}

/* =========================================================
   RENDER PROFILE
========================================================= */

function renderProfile(profile) {
    setValue("fullName", profile.FullName || familyName);
    setValue("username", profile.Username || familyUsername);
    setValue("email", profile.Email || familyEmail);
    setValue("contactNumber", profile.ContactNumber || "");
    setValue("address", profile.Address || "");
    setValue("skills", profile.Skills || "");
    setValue("interests", profile.Interests || "");
    setValue("availability", profile.Availability || "");
    setValue("bio", profile.Bio || "");

    const preview =
        document.getElementById("profilePreview");

    if (preview) {
        if (profile.ProfilePhoto) {
            preview.innerHTML =
                '<img src="' +
                escapeAttribute(profile.ProfilePhoto) +
                '" alt="Profile Photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
        } else {
            preview.textContent =
                getInitials(profile.FullName || familyName);
        }
    }
}

/* =========================================================
   FORM SUBMIT
========================================================= */

function initializeProfileForm() {
    const form =
        document.getElementById("familyProfileForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const message =
            document.getElementById("profileMessage");

        if (message) {
            message.textContent = "Saving profile...";
        }

        try {
            const photoInput =
                document.getElementById("profilePhoto");

            let photoData = "";
            let photoFileName = "";
            let photoMimeType = "";

            if (photoInput && photoInput.files.length > 0) {
                const file = photoInput.files[0];

                photoData =
                    await fileToBase64(file);

                photoFileName =
                    file.name;

                photoMimeType =
                    file.type;
            }

            const payload = {
                action: "updateFamilyProfile",

                familyId: familyId,
                username: familyUsername,
                email: familyEmail,

                contactNumber: getValue("contactNumber"),
                address: getValue("address"),
                skills: getValue("skills"),
                interests: getValue("interests"),
                availability: getValue("availability"),
                bio: getValue("bio"),

                photoData: photoData,
                photoFileName: photoFileName,
                photoMimeType: photoMimeType
            };

            const result =
                await sendRequest(payload);

            if (!result.success) {
                throw new Error(result.message || "Profile update failed.");
            }

            if (message) {
                message.textContent =
                    "Profile saved successfully.";
            }

            if (result.profile) {
                renderProfile(result.profile);
            }

        } catch (error) {
            console.error(error);

            if (message) {
                message.textContent =
                    error.message || "Unable to save profile.";
            }
        }
    });
}

/* =========================================================
   PHOTO PREVIEW
========================================================= */

function initializePhotoPreview() {
    const input =
        document.getElementById("profilePhoto");

    const preview =
        document.getElementById("profilePreview");

    if (!input || !preview) return;

    input.addEventListener("change", function () {
        const file =
            input.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function () {
            preview.innerHTML =
                '<img src="' +
                reader.result +
                '" alt="Profile Preview" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
        };

        reader.readAsDataURL(file);
    });
}

/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {
    const logoutBtn =
        document.getElementById("familyLogoutBtn");

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

function setValue(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.value = value || "";
    }
}

function getValue(id) {
    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";
}

function getInitials(name) {
    return String(name || "Family Member")
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        const reader =
            new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
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