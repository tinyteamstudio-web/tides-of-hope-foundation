/*************************************************
 * TOH - MY SOLICITATIONS PAGE
 *************************************************/

const MY_SOLICITATIONS_API_URL =
    "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn) {
        searchBtn.addEventListener("click", loadMySolicitations_);
    }
});

async function loadMySolicitations_() {
    const contactNumber = document
        .getElementById("contactNumberSearch")
        .value
        .trim();

    const results = document.getElementById("results");
    const emptyMessage = document.getElementById("emptyMessage");

    results.innerHTML = "";
    emptyMessage.style.display = "none";

    if (!contactNumber) {
        alert("Please enter your contact number.");
        return;
    }

    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                mode: "cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify(payload)
            });

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "Unable to load requests.");
            return;
        }

        if (!data.requests || data.requests.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        data.requests.forEach((item) => {
            const card = document.createElement("div");
            card.className = "request-card";

            card.innerHTML = `
        <h3>${item.recipientName || "Solicitation Request"}</h3>

        <div class="meta">
          <strong>Control No:</strong> ${item.requestId || "Pending"}<br>
          <strong>Company:</strong> ${item.companyName || ""}<br>
          <strong>Date:</strong> ${item.letterDate || ""}<br>
        </div>

        <div class="status">${item.status || "PENDING"}</div>

        <div class="actions">
          ${item.generatedPDFLink
                    ? `<a href="${item.generatedPDFLink}" target="_blank">Download PDF</a>`
                    : ""
                }

          ${item.generatedImageLink
                    ? `<a href="${item.generatedImageLink}" target="_blank" class="secondary">Open Image</a>`
                    : ""
                }

          ${item.generatedDocLink
                    ? `<a href="${item.generatedDocLink}" target="_blank" class="secondary">Open Slide</a>`
                    : ""
                }
        </div>
      `;

            results.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        alert("Connection failed. Please try again.");
    }
}