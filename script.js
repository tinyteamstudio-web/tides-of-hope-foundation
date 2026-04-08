/* =========================================
   TIDES OF HOPE - HOMEPAGE / SUBPAGE SCRIPT
   Clean structure for:
   1. Mobile menu
   2. Programs section switcher
   3. Mini Gallery placeholder-ready state
   4. Gratitude placeholder-ready state
   5. Bubble chat button
========================================= */

/* =========================
   MOBILE MENU
========================= */
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("active");
  });

  const navLinks = siteNav.querySelectorAll("a");

  navLinks.forEach((link) => {
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
      title: "Blood Donation",
      category: "Community Program",
      image: "assets/images/programs/program-blood-donation.JPG",
      description:
        "A compassionate initiative that helps support lifesaving needs through volunteer blood donation drives and community participation.",
      why:
        "Blood donation programs help save lives, support emergency care, and strengthen a culture of compassion and shared responsibility in the community.",
      how:
        "The program works through organized blood donation drives, volunteer coordination, awareness campaigns, and partnerships with health institutions.",
      partner:
        "Best partners include hospitals, blood banks, medical professionals, civic groups, youth volunteers, and local advocates."
    },
    {
      title: "Coastal Cleanup",
      category: "Community Program",
      image: "assets/images/programs/program-coastal-cleanup.JPG",
      description:
        "An environmental outreach effort focused on cleaner shorelines, healthier communities, and shared responsibility for nature.",
      why:
        "This program protects coastlines, promotes environmental awareness, and helps communities care for natural spaces that support life and livelihood.",
      how:
        "Cleanup drives are organized with volunteers, schools, and local communities to remove waste, encourage proper disposal, and promote stewardship.",
      partner:
        "Best partners include environmental groups, schools, coastal communities, LGUs, volunteers, and civic organizations."
    },
    {
      title: "Eco-Bricks",
      category: "Community Program",
      image: "assets/images/programs/program-eco-bricks.JPG",
      description:
        "A practical sustainability activity that promotes waste awareness, reuse, and eco-conscious community participation.",
      why:
        "Eco-bricks help reduce plastic waste while encouraging creative, practical, and community-based environmental solutions.",
      how:
        "Participants collect, clean, and repurpose plastic waste into eco-bricks through guided sessions and local sustainability activities.",
      partner:
        "Best partners include schools, environmental advocates, youth groups, barangays, and sustainability-minded community organizations."
    },
    {
      title: "Hope Pantry",
      category: "Community Program",
      image: "assets/images/programs/program-hope-pantry.JPG",
      description:
        "A support-centered program that helps provide essential goods and encouragement to families facing difficult times.",
      why:
        "Hope Pantry exists to support vulnerable families with basic necessities while reminding communities that care and kindness matter.",
      how:
        "Goods are collected through donations, organized by volunteers, and distributed through outreach efforts to individuals and families in need.",
      partner:
        "Best partners include donors, volunteers, community leaders, civic groups, faith-based groups, and local support networks."
    },
    {
      title: "Medical Mission",
      category: "Community Program",
      image: "assets/images/programs/program-medical-mission.JPG",
      description:
        "A care-focused outreach effort that brings health support, consultations, and basic medical assistance closer to communities.",
      why:
        "Medical missions help improve access to basic health services, encourage preventive care, and support communities with limited medical access.",
      how:
        "The program works through scheduled outreach visits, volunteer healthcare teams, consultations, and health support coordination.",
      partner:
        "Best partners include doctors, nurses, clinics, pharmacies, health volunteers, and medical advocacy groups."
    },
    {
      title: "Mental Health Awareness",
      category: "Community Program",
      image: "assets/images/programs/program-mental-health-awareness.JPG",
      description:
        "An awareness initiative that promotes emotional well-being, understanding, and supportive conversations around mental health.",
      why:
        "Mental health awareness helps reduce stigma, encourage understanding, and create safer spaces for people to seek support and healing.",
      how:
        "This program works through educational sessions, awareness campaigns, conversations, and community support activities.",
      partner:
        "Best partners include counselors, educators, youth mentors, health advocates, schools, and wellness-focused organizations."
    },
    {
      title: "Reef and Mangrove Utilization",
      category: "Community Program",
      image: "assets/images/programs/program-reef-and-mangrove-utilization.JPG",
      description:
        "A community-centered environmental program that encourages sustainable appreciation and protection of coastal resources.",
      why:
        "Healthy reefs and mangroves protect shorelines, support biodiversity, and help coastal communities sustain life and livelihood.",
      how:
        "The program promotes awareness, guided activities, and conservation efforts that encourage protection and responsible use of coastal ecosystems.",
      partner:
        "Best partners include environmental groups, fisherfolk communities, schools, conservation advocates, and local government units."
    },
    {
      title: "Tree Planting",
      category: "Community Program",
      image: "assets/images/programs/program-tree-planting.JPG",
      description:
        "A community action effort that supports environmental care, greener spaces, and long-term ecological responsibility.",
      why:
        "Tree planting helps restore greener spaces, support cleaner air, and encourage communities to take part in environmental stewardship.",
      how:
        "The program organizes planting drives, volunteer participation, and follow-up care to help trees grow and create long-term impact.",
      partner:
        "Best partners include schools, youth groups, environmental advocates, donors, barangays, and civic volunteers."
    },
    {
      title: "Clean Water",
      category: "Community Program",
      image: "assets/images/programs/future-clean-water.JPG",
      description:
        "A future-focused community initiative that highlights clean water access, health awareness, and sustainable local solutions.",
      why:
        "Access to clean water is essential for health, dignity, and stronger communities, especially for vulnerable families and underserved areas.",
      how:
        "The program works through awareness efforts, local partnerships, and support activities focused on access, hygiene, and sustainable water practices.",
      partner:
        "Best partners include water advocates, health groups, community leaders, NGOs, donors, and local technical support teams."
    },
    {
      title: "Youth Leadership",
      category: "Community Program",
      image: "assets/images/programs/program-youth-leadership.JPG",
      description:
        "A development initiative that encourages confidence, responsibility, teamwork, and leadership among young people.",
      why:
        "Youth leadership programs help young people grow in confidence, responsibility, and purpose while preparing them to serve their communities.",
      how:
        "The program works through mentoring, activities, skills-building sessions, and opportunities for youth participation and leadership.",
      partner:
        "Best partners include schools, mentors, youth advocates, volunteer leaders, civic groups, and community organizations."
    },
    {
      title: "Women Empowerment",
      category: "Community Program",
      image: "assets/images/programs/future-women-empowerment.png",
      description:
        "An empowering development program that supports women through confidence-building, opportunity awareness, and growth pathways.",
      why:
        "Women empowerment strengthens families and communities by opening more space for confidence, dignity, opportunity, and growth.",
      how:
        "The program works through encouragement, skills awareness, opportunity orientation, and support-centered learning activities.",
      partner:
        "Best partners include women’s groups, mentors, trainers, livelihood advocates, and community support organizations."
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

/* =========================
   RENDER FEATURED PROGRAM
========================= */
function renderFeaturedProgram(program) {
  if (!program) return;

  if (featuredProgramImage) {
    featuredProgramImage.src = program.image;
    featuredProgramImage.alt = program.title;
  }

  if (featuredProgramCategory) {
    featuredProgramCategory.textContent = program.category;
  }

  if (featuredProgramTitle) {
    featuredProgramTitle.textContent = program.title;
  }

  if (featuredProgramDescription) {
    featuredProgramDescription.textContent = program.description;
  }

  if (programWhyText) {
    programWhyText.textContent = program.why || "";
  }

  if (programHowText) {
    programHowText.textContent = program.how || "";
  }

  if (programPartnerText) {
    programPartnerText.textContent = program.partner || "";
  }
}

/* =========================
   RENDER PROGRAM LIST
========================= */
function renderProgramList(groupName) {
  if (!programList || !programData[groupName]) return;

  programList.innerHTML = "";

  programData[groupName].forEach((program, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "program-list-item";
    button.textContent = program.title;

    if (index === 0) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      renderFeaturedProgram(program);

      const allProgramButtons = programList.querySelectorAll(".program-list-item");
      allProgramButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });

    programList.appendChild(button);
  });

  renderFeaturedProgram(programData[groupName][0]);
}

/* =========================
   SWITCH PROGRAM GROUP
========================= */
function setActiveProgramGroup(groupName) {
  currentProgramGroup = groupName;

  if (communityTab && nextgenTab) {
    if (groupName === "community") {
      communityTab.classList.add("active");
      nextgenTab.classList.remove("active");
    } else {
      nextgenTab.classList.add("active");
      communityTab.classList.remove("active");
    }
  }

  renderProgramList(groupName);
}

if (communityTab && nextgenTab) {
  communityTab.addEventListener("click", () => {
    setActiveProgramGroup("community");
  });

  nextgenTab.addEventListener("click", () => {
    setActiveProgramGroup("nextgen");
  });
}

/* =========================
   INITIALIZE PROGRAMS
========================= */
if (programList) {
  renderProgramList(currentProgramGroup);
}
/* =========================
   MINI GALLERY PLACEHOLDER
   Homepage now stays clean until admin uploads are connected
========================= */
const miniGalleryGrid = document.getElementById("miniGalleryGrid");

if (miniGalleryGrid) {
  miniGalleryGrid.innerHTML = `
    <article class="content-placeholder-card">
      <div class="content-placeholder-icon">📸</div>
      <h3>Gallery uploads will appear here</h3>
      <p>
        Photos and videos uploaded by authorized administrators through the office portal
        will be displayed in this section.
      </p>
    </article>
  `;
}

/* =========================
   GRATITUDE PLACEHOLDER
   Homepage now stays clean until admin uploads are connected
========================= */
const gratitudeGrid = document.getElementById("gratitudeGrid");

if (gratitudeGrid) {
  gratitudeGrid.innerHTML = `
    <article class="content-placeholder-card gratitude-placeholder-card">
      <div class="content-placeholder-icon">💙</div>
      <h3>Gratitude posts will appear here</h3>
      <p>
        Appreciation messages, supporter recognitions, and gratitude posts with
        photos or videos will be displayed here after admin upload.
      </p>
    </article>
  `;
}

/* =========================
   MINI GALLERY - HOMEPAGE
========================= */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwn-Uwujakfbo2uR8G-9j30yW5z0UJK7oRkx1G5LyRVKWqpNCq9D13OlSSlRNIbG4dB/exec";

async function loadHomepageGallery() {
  const galleryGrid = document.getElementById("homepageGalleryGrid");
  if (!galleryGrid) return;

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

    data.items.forEach(item => {
      const mediaType = (item.MediaType || "").toLowerCase();
      const fileUrl = item.FileURL || "";
      const title = item.Title || "Gallery Item";

      const mediaHtml =
        mediaType === "video"
          ? `<video class="gallery-image" controls preload="metadata">
               <source src="${fileUrl}" type="video/mp4">
               Your browser does not support video.
             </video>`
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
    console.error("Gallery load error:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadHomepageGallery);
/* =========================
   GALLERY PAGE PLACEHOLDER
========================= */
const galleryPageGrid = document.getElementById("galleryPageGrid");

if (galleryPageGrid) {
  galleryPageGrid.innerHTML = `
    <article class="empty-state-card">
      No gallery uploads available yet.
    </article>
  `;
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
