/*************************************************
 * TOH INSTANT SOLICITATION GENERATOR
 *************************************************/

document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    "letterDate",
    "requestedBy",
    "requesterContact",
    "recipientName",
    "recipientPosition",
    "companyName",
    "salutation",
    "otherSalutation",
    "recipientContact",
    "requestedSupport",
    "purposeNotes"
  ];

  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("input", generateSolicitation);
    el.addEventListener("change", generateSolicitation);
  });

  generateSolicitation();
});

function generateSolicitation() {

  const letterDate =
    getValue_("letterDate");

  const recipientName =
    getValue_("recipientName");

  const recipientPosition =
    getValue_("recipientPosition");

  const companyName =
    getValue_("companyName");

  const recipientAddress =
    getValue_("recipientAddress");

  const salutationValue =
    getValue_("salutation");

  const otherSalutation =
    getValue_("otherSalutation");

  const finalSalutation =
    salutationValue === "Other"
      ? otherSalutation
      : salutationValue;

  const recipientContact =
    getValue_("recipientContact");

  setText_(
    "previewDate",
    formatDate_(letterDate)
  );

  setText_(
    "previewSalutation",
    finalSalutation
  );

  setText_(
    "previewRecipient",
    recipientName
  );

  setText_(
    "previewRecipientInline",
    recipientName
  );

  setText_(
    "previewPosition",
    recipientPosition
  );

  setText_(
    "previewCompany",
    companyName
  );

  setText_(
    "previewAddress",
    recipientAddress
  );

  setText_(
    "previewContactPerson",
    recipientName
  );

  setText_(
    "previewContactNumber",
    recipientContact
  );

  setText_(
    "previewControlNumber",
    generateControlNumber_()
  );
}

function downloadSolicitationImage() {
  const letter = document.getElementById("solicitationPreview");

  html2canvas(letter, {
    scale: 3,
    backgroundColor: "#ffffff"
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "TOH-Solicitation.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

/*************************************************
 * HELPERS
 *************************************************/

function getValue_(id) {
  const el = document.getElementById(id);
  return el ? String(el.value || "").trim() : "";
}

function setText_(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function formatDate_(value) {
  if (!value) return "";

  const date = new Date(value + "T00:00:00");

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function generateControlNumber_() {
  const saved =
    sessionStorage.getItem("tohSolicitationControlNo");

  if (saved) return saved;

  const now = new Date();

  const number =
    "TOH-" +
    now.getFullYear() +
    "-" +
    String(Math.floor(1000 + Math.random() * 9000));

  sessionStorage.setItem(
    "tohSolicitationControlNo",
    number
  );

  return number;
}

/*************************************************
 * HELPERS
 *************************************************/

function getValue_(id) {
  const el = document.getElementById(id);
  return el ? String(el.value || "").trim() : "";
}

function setText_(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function formatDate_(value) {
  if (!value) return "";

  const date = new Date(value + "T00:00:00");

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function generateControlNumber_() {
  const saved =
    sessionStorage.getItem("tohSolicitationControlNo");

  if (saved) return saved;

  const now = new Date();

  const number =
    "TOH-" +
    now.getFullYear() +
    "-" +
    String(Math.floor(1000 + Math.random() * 9000));

  sessionStorage.setItem(
    "tohSolicitationControlNo",
    number
  );

  return number;
}