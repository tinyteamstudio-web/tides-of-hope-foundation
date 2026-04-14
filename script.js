/* =========================================
   TIDES OF HOPE - HOMEPAGE / SUBPAGE SCRIPT
========================================= */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwn-Uwujakfbo2uR8G-9j30yW5z0UJK7oRkx1G5LyRVKWqpNCq9D13OlSSlRNIbG4dB/exec";

/* =========================
   MOBILE MENU
========================= */
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("active");
    });
  });
}

/* =========================
   PROGRAMS DATA
========================= */
const programData = {
  community: [
    {
      title: "Medical Mission",
      category: "Community Program",
      image: "assets/images/programs/medical-mission.png",
      description:
        "A care-focused outreach effort that brings health support, consultations, and basic medical assistance closer to communities.",
      why:
        "Medical missions improve access to healthcare, promote preventive care, and support underserved communities with essential services.",
      how:
        "Organized through volunteer healthcare teams, outreach schedules, and partnerships with medical institutions.",
      partner:
        "Doctors, nurses, clinics, pharmacies, health volunteers, and medical advocacy groups."
    },
    {
      title: "Blood Donation",
      category: "Community Program",
      image: "assets/images/programs/blood-donation.png",
      description:
        "A compassionate initiative that helps support lifesaving needs through volunteer blood donation drives.",
      why:
        "Blood donation saves lives, supports emergency care, and strengthens community compassion.",
      how:
        "Organized blood drives with volunteers, awareness campaigns, and partnerships with hospitals and blood banks.",
      partner:
        "Hospitals, blood banks, medical professionals, civic groups, and volunteers."
    },
    {
      title: "Feeding Program",
      category: "Community Program",
      image: "assets/images/programs/feeding-program.png",
      description:
        "A community initiative that provides nutritious meals to children and families in need.",
      why:
        "Proper nutrition supports health, growth, and well-being, especially for vulnerable communities.",
      how:
        "Volunteers prepare and distribute meals through organized feeding events and outreach activities.",
      partner:
        "Donors, volunteers, schools, barangays, and community organizations."
    },
    {
      title: "Hope Pantry",
      category: "Community Program",
      image: "assets/images/programs/hope-pantry.png",
      description:
        "A support-centered program that provides essential goods to families facing difficult times.",
      why:
        "Helps families meet basic needs while promoting kindness and shared community responsibility.",
      how:
        "Goods are collected, organized, and distributed through volunteer-driven outreach efforts.",
      partner:
        "Donors, volunteers, civic groups, and local communities."
    },
    {
      title: "Clean Water",
      category: "Community Program",
      image: "assets/images/programs/clean-water.png",
      description:
        "A program focused on providing access to safe and clean water for communities.",
      why:
        "Clean water is essential for health, dignity, and sustainable community development.",
      how:
        "Through awareness campaigns, partnerships, and support for water access initiatives.",
      partner:
        "Health groups, NGOs, community leaders, and water advocates."
    },
    {
      title: "Coastal Cleanup",
      category: "Community Program",
      image: "assets/images/programs/coastal-cleanup.png",
      description:
        "An environmental effort focused on cleaning shorelines and protecting marine ecosystems.",
      why:
        "Helps preserve coastal areas, protect marine life, and promote environmental awareness.",
      how:
        "Volunteer-driven cleanup drives and environmental awareness campaigns.",
      partner:
        "Environmental groups, schools, LGUs, and community volunteers."
    },
    {
      title: "Tree Planting",
      category: "Community Program",
      image: "assets/images/programs/tree-planting.png",
      description:
        "A community action effort that promotes greener environments and sustainability.",
      why:
        "Supports environmental restoration, cleaner air, and long-term ecological balance.",
      how:
        "Organized planting activities with volunteers and community groups.",
      partner:
        "Schools, environmental advocates, youth groups, and volunteers."
    },
    {
      title: "Reef & Mangrove Utilization",
      category: "Community Program",
      image: "assets/images/programs/reef-mangrove.png",
      description:
        "A program that promotes sustainable care and protection of coastal ecosystems.",
      why:
        "Healthy reefs and mangroves protect shorelines and support marine biodiversity.",
      how:
        "Through conservation activities, awareness programs, and community participation.",
      partner:
        "Environmental groups, fisherfolk communities, and local organizations."
    },
    {
      title: "Women Empowerment",
      category: "Community Program",
      image: "assets/images/programs/women-empowerment.png",
      description:
        "A development program that supports women through confidence-building and opportunities.",
      why:
        "Empowered women strengthen families, communities, and future generations.",
      how:
        "Through mentoring, training, and support-centered activities.",
      partner:
        "Women’s groups, mentors, trainers, and advocacy organizations."
    },
    {
      title: "Youth Leadership",
      category: "Community Program",
      image: "assets/images/programs/youth-leadership.png",
      description:
        "A program that develops leadership, responsibility, and teamwork among young people.",
      why:
        "Prepares youth to become future leaders and active contributors to their communities.",
      how:
        "Through mentoring, leadership activities, and community engagement programs.",
      partner:
        "Schools, mentors, youth organizations, and volunteers."
    },
    {
      title: "Back to School Program",
      category: "Community Program",
      image: "assets/images/programs/back-to-school.png",
      description:
        "An initiative that supports students with school supplies and educational assistance.",
      why:
        "Education opens opportunities and helps break the cycle of poverty.",
      how:
        "Distribution of school supplies and community support programs.",
      partner:
        "Schools, donors, volunteers, and community groups."
    },
    {
      title: "Disaster Relief & Recovery",
      category: "Community Program",
      image: "assets/images/programs/disaster-relief-recovery.png",
      description:
        "A program that supports communities affected by disasters through relief and recovery efforts.",
      why:
        "Provides immediate assistance and helps rebuild lives after emergencies.",
      how:
        "Through relief distribution, rebuilding efforts, and community support.",
      partner:
        "Volunteers, donors, NGOs, and local government units."
    }
  ],

  nextgen: [
    {
      title: "AI Skills",
      category: "NextGen Program",
      image: "assets/images/programs/future-ai-skills.jpg",
      description:
        "A future-ready learning initiative designed to introduce communities to artificial intelligence awareness and practical skills.",
      why:
        "AI skills help communities prepare for emerging technology, future work opportunities, and smarter digital participation.",
      how:
        "This program introduces learners to AI concepts, practical tools, and responsible technology use through guided sessions.",
      partner:
        "Best partners include tech mentors, educators, digital advocates, schools, and organizations focused on innovation."
    },
    {
      title: "Basic Coding",
      category: "NextGen Program",
      image: "assets/images/programs/future-basic-coding.png",
      description:
        "An introductory digital skills program that helps learners understand coding fundamentals in a simple and accessible way.",
      why:
        "Basic coding builds problem-solving skills, digital confidence, and pathways to future education and technology opportunities.",
      how:
        "Learners are introduced to simple coding concepts, beginner exercises, and hands-on digital creation activities.",
      partner:
        "Best partners include coding mentors, schools, youth trainers, tech volunteers, and digital learning advocates."
    },
    {
      title: "Business Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/future-business-literacy.png",
      description:
        "A growth-oriented program that introduces practical knowledge in entrepreneurship, planning, and responsible business thinking.",
      why:
        "Business literacy helps individuals think sustainably, plan better, and understand the foundations of opportunity and entrepreneurship.",
      how:
        "The program uses simple lessons, practical examples, and guided activities focused on planning, budgeting, and responsible business thinking.",
      partner:
        "Best partners include entrepreneurs, trainers, livelihood groups, schools, community mentors, and business advocates."
    },
    {
      title: "Financial Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/future-financial-literacy.JPG",
      description:
        "A practical education program that teaches budgeting, saving, and smarter decision-making for personal and family growth.",
      why:
        "Financial literacy supports smarter choices, stronger households, and better long-term planning for individuals and families.",
      how:
        "Participants learn budgeting, saving, responsible spending, and simple financial planning through practical and understandable lessons.",
      partner:
        "Best partners include educators, finance advocates, schools, community facilitators, and livelihood support groups."
    },
    {
      title: "Kids Digital Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/future-kids-digita-literacy.png",
      description:
        "A child-friendly digital learning initiative that helps young learners build safe and useful technology skills early on.",
      why:
        "Helping children learn safe and useful digital skills early prepares them for education, communication, and the future responsibly.",
      how:
        "This program uses child-friendly teaching, simple digital tools, and guided activities that build confidence and safe digital habits.",
      partner:
        "Best partners include schools, parents, child mentors, educators, and digital learning advocates."
    },
    {
      title: "Online Jobs for Solo Parents",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-jobs-solo-parent.JPG",
      description:
        "A support-driven opportunity program focused on helping solo parents explore flexible and sustainable online work paths.",
      why:
        "This program helps solo parents find more flexible livelihood opportunities that fit their responsibilities and family needs.",
      how:
        "Participants are guided through digital work options, skills readiness, online tools, and practical steps for remote opportunities.",
      partner:
        "Best partners include online work mentors, women’s groups, solo parent advocates, trainers, and livelihood support organizations."
    },
    {
      title: "Online Jobs",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-jobs.JPG",
      description:
        "A livelihood-centered digital opportunity program that helps individuals prepare for remote and online-based work.",
      why:
        "Online jobs can open flexible income opportunities and expand access to livelihood for many individuals and families.",
      how:
        "The program works through orientation, digital readiness training, and practical guidance on online work pathways.",
      partner:
        "Best partners include remote work mentors, trainers, digital coaches, schools, and employment support groups."
    },
    {
      title: "Online Selling",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-selling.JPG",
      description:
        "A practical entrepreneurship initiative that introduces participants to digital selling, product presentation, and online platforms.",
      why:
        "Online selling helps communities explore practical income opportunities through modern, accessible, and scalable digital platforms.",
      how:
        "Participants learn the basics of product presentation, selling platforms, simple branding, and digital buyer communication.",
      partner:
        "Best partners include entrepreneurs, digital sellers, trainers, women’s groups, and livelihood-focused organizations."
    },
    {
      title: "Online Vlogging",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-vlogging.JPG",
      description:
        "A creative digital expression program that encourages storytelling, content creation, and communication through online media.",
      why:
        "Vlogging can help individuals build confidence, communication skills, creativity, and digital expression in modern platforms.",
      how:
        "The program teaches storytelling, basic content planning, online communication, and responsible media creation.",
      partner:
        "Best partners include creators, media mentors, schools, youth trainers, and communication-focused organizations."
    },
    {
      title: "Web Building",
      category: "NextGen Program",
      image: "assets/images/programs/future-web-building.jpg",
      description:
        "A digital skills initiative that introduces website-building fundamentals and online platform development opportunities.",
      why:
        "Web building skills create opportunities in digital work, creativity, entrepreneurship, and technology-focused growth.",
      how:
        "Participants explore simple website structures, design thinking, and practical web-building concepts in beginner-friendly ways.",
      partner:
        "Best partners include web mentors, schools, digital trainers, tech volunteers, and learning communities."
    },
    {
      title: "Digital Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/program-digital-literacy.JPG",
      description:
        "A learning initiative that helps individuals and communities build confidence in using digital tools for education and opportunity.",
      why:
        "Digital literacy helps people access information, education, communication tools, and modern opportunities with greater confidence and safety.",
      how:
        "The program provides guided learning sessions, practical exposure to digital tools, and beginner-friendly support for technology use.",
      partner:
        "Best partners include schools, trainers, tech volunteers, youth mentors, and organizations supporting digital inclusion."
    }
  ]
};

/* =========================
   PROGRAMS ELEMENTS
========================= */
const communityTab = document.getElementById("communityTab");
const nextgenTab = document.getElementById("nextgenTab");
const programList = document.getElementById("programList");

const featuredProgramImage = document.getElementById("featuredProgramImage");
const featuredProgramCategory = document.getElementById("featuredProgramCategory");
const featuredProgramTitle = document.getElementById("featuredProgramTitle");
const featuredProgramDescription = document.getElementById("featuredProgramDescription");
const programWhyText = document.getElementById("programWhyText");
const programHowText = document.getElementById("programHowText");
const programPartnerText = document.getElementById("programPartnerText");

let currentProgramGroup = "community";

function renderFeaturedProgram(program) {
  if (!program) return;

  if (featuredProgramImage) {
    featuredProgramImage.src = program.image;
    featuredProgramImage.alt = program.title;
  }

  if (featuredProgramCategory) featuredProgramCategory.textContent = program.category;
  if (featuredProgramTitle) featuredProgramTitle.textContent = program.title;
  if (featuredProgramDescription) featuredProgramDescription.textContent = program.description;
  if (programWhyText) programWhyText.textContent = program.why || "";
  if (programHowText) programHowText.textContent = program.how || "";
  if (programPartnerText) programPartnerText.textContent = program.partner || "";
}

function renderProgramList(groupName) {
  if (!programList || !programData[groupName]) return;

  programList.innerHTML = "";

  programData[groupName].forEach((program, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "program-list-item";
    button.textContent = program.title;

    if (index === 0) button.classList.add("active");

    button.addEventListener("click", () => {
      renderFeaturedProgram(program);
      programList.querySelectorAll(".program-list-item").forEach((item) => {
        item.classList.remove("active");
      });
      button.classList.add("active");
    });

    programList.appendChild(button);
  });

  renderFeaturedProgram(programData[groupName][0]);
}

function setActiveProgramGroup(groupName) {
  currentProgramGroup = groupName;

  if (communityTab && nextgenTab) {
    communityTab.classList.toggle("active", groupName === "community");
    nextgenTab.classList.toggle("active", groupName === "nextgen");
  }

  renderProgramList(groupName);
}

if (communityTab && nextgenTab) {
  communityTab.addEventListener("click", () => setActiveProgramGroup("community"));
  nextgenTab.addEventListener("click", () => setActiveProgramGroup("nextgen"));
}

if (programList) {
  renderProgramList(currentProgramGroup);
}

/* =========================
   PRESIDENT'S CORNER
========================= */
async function loadPresidentMessage() {
  const wrap = document.getElementById("presidentCornerContent");
  if (!wrap) return;

  // TARGET ONLY MESSAGE AREA
  const messageWrap = wrap.querySelector(".president-message");

  // SHOW LOADING (without removing image)
  if (messageWrap) {
    messageWrap.innerHTML = `<p>Loading latest message...</p>`;
  }

  try {
    const response = await fetch(`${WEB_APP_URL}?action=getPresidentMessage`);
    const data = await response.json();

    if (!data.success || !data.item) {
      if (messageWrap) {
        messageWrap.innerHTML = `<p>No president message available yet.</p>`;
      }
      return;
    }

    const item = data.item;
    const title = item.Title || "President’s Message";
    const message = item.Message || "";
    const author = item.Author || "Office of the President";

    if (messageWrap) {
      messageWrap.innerHTML = `
        <article class="content-card">
          <h3>${title}</h3>
          <p>${message}</p>
          <p><strong>${author}</strong></p>
        </article>
      `;
    }

  } catch (error) {
    if (messageWrap) {
      messageWrap.innerHTML = `<p>Unable to load president message right now.</p>`;
    }
  }
}
/* =========================
   FEATURED IMPACT
========================= */
async function loadFeaturedImpact() {
  const wrap = document.getElementById("featuredImpactContent");
  if (!wrap) return;

  wrap.innerHTML = `<p>Loading featured impact...</p>`;

  try {
    const response = await fetch(`${WEB_APP_URL}?action=getFeaturedImpact`);
    const data = await response.json();

    if (!data.success || !data.item) {
      wrap.innerHTML = `<p>Stories of hope and transformation will appear here.</p>`;
      return;
    }

    const item = data.item;
    const title = item.Title || "Featured Impact";
    const caption = item.Caption || "";
    const mediaType = String(item.MediaType || "").toLowerCase();
    const fileUrl = item.FileURL || "";

    const mediaHtml = mediaType === "video"
      ? `
        <video class="gallery-image" controls preload="metadata">
          <source src="${fileUrl}">
          Your browser does not support video.
        </video>
      `
      : `<img src="${fileUrl}" alt="${title}" class="gallery-image">`;

    wrap.innerHTML = `
      <article class="gallery-card">
        ${mediaHtml}
        <div class="gallery-overlay">${title}</div>
      </article>
      <div class="impact-copy">
        <p>${caption}</p>
      </div>
    `;
  } catch (error) {
    wrap.innerHTML = `<p>Unable to load featured impact right now.</p>`;
  }
}

/* =========================
   ANNOUNCEMENTS
========================= */
async function loadHomepageAnnouncements() {
  const wrap = document.getElementById("homepageAnnouncementsGrid");
  if (!wrap) return;

  wrap.innerHTML = `
    <article class="empty-state-card">
      Loading announcements...
    </article>
  `;

  try {
    const response = await fetch(`${WEB_APP_URL}?action=getAnnouncements`);
    const data = await response.json();

    if (!data.success || !data.items || !data.items.length) {
      wrap.innerHTML = `
        <article class="empty-state-card">
          No announcements available yet.
        </article>
      `;
      return;
    }

    wrap.innerHTML = "";

    data.items.forEach((item) => {
      const title = item.Title || "Announcement";
      const category = item.Category || "General";
      const summary = item.Summary || "";
      const dateText = item.Timestamp ? new Date(item.Timestamp).toLocaleDateString() : "";

      wrap.innerHTML += `
        <article class="announcement-card">
          <span class="announcement-category">${category}</span>
          <h3>${title}</h3>
          <p>${summary}</p>
          <span class="announcement-date">${dateText}</span>
        </article>
      `;
    });

  } catch (error) {
    wrap.innerHTML = `
      <article class="empty-state-card">
        Failed to load announcements.
      </article>
    `;
  }
}

/* =========================
   HOMEPAGE GALLERY
========================= */
async function loadHomepageGallery() {
  const galleryGrid = document.getElementById("homepageGalleryGrid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = `
    <article class="gallery-card placeholder-card">
      <div class="gallery-overlay">Loading gallery...</div>
    </article>
  `;

  try {
    const response = await fetch(`${WEB_APP_URL}?action=getHomepageGallery`);
    const data = await response.json();

    galleryGrid.innerHTML = "";

    if (!data.success || !data.items || !data.items.length) {
      galleryGrid.innerHTML = `
        <article class="gallery-card placeholder-card">
          <div class="gallery-overlay">No gallery uploads available yet.</div>
        </article>
      `;
      return;
    }

    data.items.forEach((item) => {
      const mediaType = String(item.MediaType || "").toLowerCase();
      const fileUrl = item.FileURL || "";
      const title = item.Title || "Gallery Item";

      const mediaHtml = mediaType === "video"
        ? `
          <video class="gallery-image" controls preload="metadata">
            <source src="${fileUrl}">
            Your browser does not support video.
          </video>
        `
        : `<img src="${fileUrl}" alt="${title}" class="gallery-image">`;

      galleryGrid.innerHTML += `
        <article class="gallery-card">
          ${mediaHtml}
          <div class="gallery-overlay">${title}</div>
        </article>
      `;
    });

  } catch (error) {
    galleryGrid.innerHTML = `
      <article class="gallery-card placeholder-card">
        <div class="gallery-overlay">Failed to load gallery.</div>
      </article>
    `;
  }
}

/* =========================
   GRATITUDE WALL
========================= */
async function loadGratitudePosts() {
  const wrap = document.getElementById("gratitudeGrid");
  if (!wrap) return;

  wrap.innerHTML = `
    <article class="empty-state-card">
      Loading gratitude posts...
    </article>
  `;

  try {
    const response = await fetch(`${WEB_APP_URL}?action=getGratitudePosts`);
    const data = await response.json();

    if (!data.success || !data.items || !data.items.length) {
      wrap.innerHTML = `
        <article class="empty-state-card">
          No gratitude posts available yet.
        </article>
      `;
      return;
    }

    wrap.innerHTML = "";

    data.items.forEach((item) => {
      const title = item.Title || "Gratitude";
      const message = item.Message || "";
      const fromName = item.FromName || "Tides of Hope";

      wrap.innerHTML += `
        <article class="gratitude-card">
          <h3>${title}</h3>
          <p>${message}</p>
          <span class="gratitude-from">— ${fromName}</span>
        </article>
      `;
    });

  } catch (error) {
    wrap.innerHTML = `
      <article class="empty-state-card">
        Failed to load gratitude posts.
      </article>
    `;
  }
}

/* =========================
   BUBBLE CHAT
========================= */
const bubbleChatButton = document.getElementById("bubbleChatButton");
if (bubbleChatButton) {
  bubbleChatButton.addEventListener("click", () => {
    window.open("https://www.facebook.com/profile.php?id=61573627290922", "_blank");
  });
}

/* =========================
   PAGE LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadPresidentMessage();
  loadFeaturedImpact();
  loadHomepageAnnouncements();
  loadHomepageGallery();
  loadGratitudePosts();
});
