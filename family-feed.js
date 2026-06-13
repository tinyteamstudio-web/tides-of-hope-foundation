/* =========================================================
   TIDES OF HOPE
   FAMILY COMMUNITY FEED
========================================================= */

const WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

/* =========================================================
   SESSION
========================================================= */

const familyName =
    sessionStorage.getItem("tohFamilyName") ||
    sessionStorage.getItem("tohVolunteerName") ||
    "Family Member";

const familyUsername =
    sessionStorage.getItem("tohFamilyUsername") ||
    sessionStorage.getItem("tohVolunteerUsername") ||
    "";

const familyEmail =
    sessionStorage.getItem("tohFamilyEmail") ||
    sessionStorage.getItem("tohVolunteerEmail") ||
    "";

/* =========================================================
   LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePostSubmit();

        loadFamilyFeed();

        loadMyPosts();

    }
);

/* =========================================================
   SUBMIT
========================================================= */

function initializePostSubmit() {

    const btn =
        document.getElementById(
            "submitPostBtn"
        );

    if (!btn) return;

    btn.addEventListener(
        "click",
        submitFamilyPost
    );

}

async function submitFamilyPost() {

    const message =
        document.getElementById(
            "postMessage"
        );

    const postText =
        document.getElementById(
            "postText"
        );

    const photoInput =
        document.getElementById(
            "postPhoto"
        );

    if (!postText.value.trim()) {

        message.textContent =
            "Please write something first.";

        return;

    }

    message.textContent =
        "Submitting post...";

    try {

        let photoData = "";
        let photoFileName = "";
        let photoMimeType = "";

        const file =
            photoInput.files[0];

        if (file) {

            photoData =
                await fileToBase64(file);

            photoFileName =
                file.name;

            photoMimeType =
                file.type;

        }

        const result =
            await sendRequest({

                action: "submitFamilyPost",

                fullName: familyName,
                email: familyEmail,
                username: familyUsername,

                postText: postText.value.trim(),

                photoData: photoData,
                photoFileName: photoFileName,
                photoMimeType: photoMimeType

            });

        message.textContent =
            result.message;

        postText.value = "";
        photoInput.value = "";

        loadFamilyFeed();
        loadMyPosts();

    }
    catch (error) {

        console.error(error);

        message.textContent =
            "Unable to submit post.";

    }

}

/* =========================================================
   APPROVED FEED
========================================================= */

async function loadFamilyFeed() {

    const container =
        document.getElementById(
            "feedPosts"
        );

    if (!container) return;

    try {

        const response =
            await fetch(
                WEBAPP_URL +
                "?action=getFamilyPosts"
            );

        const result =
            await response.json();

        renderFeed(
            result.data || []
        );

    }
    catch (error) {

        console.error(error);

    }

}

/* =========================================================
   MY POSTS
========================================================= */

async function loadMyPosts() {

    const container =
        document.getElementById(
            "myPosts"
        );

    if (!container) return;

    try {

        const result =
            await sendRequest({

                action: "getMyFamilyPosts",

                email: familyEmail,

                username: familyUsername

            });

        renderMyPosts(
            result.data || []
        );

    }
    catch (error) {

        console.error(error);

    }

}

/* =========================================================
   RENDER FEED
========================================================= */

function renderFeed(posts) {

    const container =
        document.getElementById(
            "feedPosts"
        );

    if (!container) return;

    container.innerHTML =
        posts.map(post => createPostCard(post, false))
            .join("");

}

/* =========================================================
   RENDER MY POSTS
========================================================= */

function renderMyPosts(posts) {

    const container =
        document.getElementById(
            "myPosts"
        );

    if (!container) return;

    container.innerHTML =
        posts.map(post => createPostCard(post, true))
            .join("");

}

/* =========================================================
   POST CARD
========================================================= */

function createPostCard(post, isMine) {

    const initials =
        getInitials(post.FullName);

    const image =
        post.Photo
            ? `<img src="${post.Photo}" class="feed-image">`
            : "";

    const actions =
        isMine
            ? `
<div class="post-actions">

<button
onclick="editPost('${post.PostID}')">
Edit
</button>

<button
onclick="archivePost('${post.PostID}')">
Archive
</button>

</div>
`
            : "";

    return `

<article class="feed-card">

<div class="feed-author">

<div class="feed-avatar-placeholder">
${initials}
</div>

<div>

<h3>
${post.FullName}
</h3>

<p>
${formatDate(post.Timestamp)}
</p>

</div>

</div>

<p>
${escapeHtml(post.PostText)}
</p>

${image}

${actions}

</article>

`;

}

/* =========================================================
   EDIT
========================================================= */

async function editPost(postId) {

    const newText =
        prompt(
            "Update your post:"
        );

    if (!newText) return;

    await sendRequest({

        action: "updateFamilyPost",

        postId: postId,

        email: familyEmail,

        postText: newText

    });

    loadFamilyFeed();
    loadMyPosts();

}

/* =========================================================
   ARCHIVE
========================================================= */

async function archivePost(postId) {

    if (
        !confirm(
            "Archive this post?"
        )
    ) {
        return;
    }

    await sendRequest({

        action: "archiveFamilyPost",

        postId: postId

    });

    loadFamilyFeed();
    loadMyPosts();

}

/* =========================================================
   API
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

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload =
            () => resolve(reader.result);

        reader.onerror =
            reject;

        reader.readAsDataURL(file);

    });

}

function getInitials(name) {

    return String(name)
        .split(" ")
        .map(w => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}

function formatDate(date) {

    try {
        return new Date(date)
            .toLocaleString();
    }
    catch {
        return "";
    }

}

function escapeHtml(text) {

    return String(text || "")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}