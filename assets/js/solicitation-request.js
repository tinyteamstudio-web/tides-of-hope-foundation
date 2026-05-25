/*************************************************
 * TOH SOLICITATION REQUEST FORM
 *************************************************/

const API_URL =
  "https://script.google.com/macros/s/AKfycbyKlI9CcRZsXWGTJd_34e09U7SwZi81oVZTtSoL-t-g_K9-qlOwiQLOsGyu8FktkKCN/exec";

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const form =
      document.getElementById(
        "solicitationForm"
      );

    if (!form) return;

    form.addEventListener(
      "submit",
      submitSolicitationRequest_
    );
  }
);

/*************************************************
 * SUBMIT REQUEST
 *************************************************/

async function submitSolicitationRequest_(e) {

  e.preventDefault();

  try {

    const payload = {

      action:
        "submitSolicitationRequest",

      letterDate:
        document.getElementById(
          "letterDate"
        ).value,

      recipientName:
        document.getElementById(
          "recipientName"
        ).value,

      recipientPosition:
        document.getElementById(
          "recipientPosition"
        ).value,

      companyName:
        document.getElementById(
          "companyName"
        ).value,

      salutation:
        document.getElementById(
          "salutation"
        ).value,

      contactPerson:
        document.getElementById(
          "contactPerson"
        ).value,

      contactNumber:
        document.getElementById(
          "contactNumber"
        ).value,

      requestedItems:
        document.getElementById(
          "requestedItems"
        ).value,

      messageBody:
        document.getElementById(
          "messageBody"
        ).value
    };

    const response =
      await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(payload)
      });

    const result =
      await response.json();

    if (!result.success) {

      alert(
        result.message ||
        "Submission failed."
      );

      return;
    }

    document.getElementById(
      "successMessage"
    ).style.display = "block";

    document.getElementById(
      "solicitationForm"
    ).reset();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } catch (err) {

    console.error(err);

    alert(
      "Server connection failed."
    );
  }
}
