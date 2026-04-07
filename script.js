/* =========================================
   TIDES OF HOPE - HOMEPAGE SCRIPT
   Clean structure for:
   1. Mobile menu
   2. Programs section switcher
   3. Mini gallery placeholder loader
   4. Gratitude placeholder loader
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
        "A compassionate initiative that helps support lifesaving needs through volunteer blood donation drives and community participation."
    },
    {
      title: "Coastal Cleanup",
      category: "Community Program",
      image: "assets/images/programs/program-coastal-cleanup.JPG",
      description:
        "An environmental outreach effort focused on cleaner shorelines, healthier communities, and shared responsibility for nature."
    },
    {
      title: "Digital Literacy",
      category: "Community Program",
      image: "assets/images/programs/program-digital-literacy.JPG",
      description:
        "A learning initiative that helps individuals and communities build confidence in using digital tools for education and opportunity."
    },
    {
      title: "Eco-Bricks",
      category: "Community Program",
      image: "assets/images/programs/program-eco-bricks.JPG",
      description:
        "A practical sustainability activity that promotes waste awareness, reuse, and eco-conscious community participation."
    },
    {
      title: "Hope Pantry",
      category: "Community Program",
      image: "assets/images/programs/program-hope-pantry.JPG",
      description:
        "A support-centered program that helps provide essential goods and encouragement to families facing difficult times."
    },
    {
      title: "Medical Mission",
      category: "Community Program",
      image: "assets/images/programs/program-medical-mission.JPG",
      description:
        "A care-focused outreach effort that brings health support, consultations, and basic medical assistance closer to communities."
    },
    {
      title: "Mental Health Awareness",
      category: "Community Program",
      image: "assets/images/programs/program-mental-health-awareness.JPG",
      description:
        "An awareness initiative that promotes emotional well-being, understanding, and supportive conversations around mental health."
    },
    {
      title: "Reef and Mangrove Utilization",
      category: "Community Program",
      image: "assets/images/programs/program-reef-and-mangrove-utilization.JPG",
      description:
        "A community-centered environmental program that encourages sustainable appreciation and protection of coastal resources."
    },
    {
      title: "Tree Planting",
      category: "Community Program",
      image: "assets/images/programs/program-tree-planting.JPG",
      description:
        "A community action effort that supports environmental care, greener spaces, and long-term ecological responsibility."
    },
    {
      title: "Clean Water",
      category: "NextGen Program",
      image: "assets/images/programs/future-clean-water.JPG",
      description:
        "A future-focused community initiative that highlights clean water access, health awareness, and sustainable local solutions."
    },
    {
      title: "Youth Leadership",
      category: "Community Program",
      image: "assets/images/programs/program-youth-leadership.JPG",
      description:
        "A development initiative that encourages confidence, responsibility, teamwork, and leadership among young people."
    }
  ],

  nextgen: [
    {
      title: "AI Skills",
      category: "NextGen Program",
      image: "assets/images/programs/future-ai-skills.jpg",
      description:
        "A future-ready learning initiative designed to introduce communities to artificial intelligence awareness and practical skills."
    },
    {
      title: "Basic Coding",
      category: "NextGen Program",
      image: "assets/images/programs/future-basic-coding.png",
      description:
        "An introductory digital skills program that helps learners understand coding fundamentals in a simple and accessible way."
    },
    {
      title: "Business Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/future-business-literacy.png",
      description:
        "A growth-oriented program that introduces practical knowledge in entrepreneurship, planning, and responsible business thinking."
    },
    {
      title: "Financial Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/future-financial-literacy.JPG",
      description:
        "A practical education program that teaches budgeting, saving, and smarter decision-making for personal and family growth."
    },
    {
      title: "Kids Digital Literacy",
      category: "NextGen Program",
      image: "assets/images/programs/future-kids-digita-literacy.png",
      description:
        "A child-friendly digital learning initiative that helps young learners build safe and useful technology skills early on."
    },
    {
      title: "Online Jobs for Solo Parents",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-jobs-solo-parent.JPG",
      description:
        "A support-driven opportunity program focused on helping solo parents explore flexible and sustainable online work paths."
    },
    {
      title: "Online Jobs",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-jobs.JPG",
      description:
        "A livelihood-centered digital opportunity program that helps individuals prepare for remote and online-based work."
    },
    {
      title: "Online Selling",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-selling.JPG",
      description:
        "A practical entrepreneurship initiative that introduces participants to digital selling, product presentation, and online platforms."
    },
    {
      title: "Online Vlogging",
      category: "NextGen Program",
      image: "assets/images/programs/future-online-vlogging.JPG",
      description:
        "A creative digital expression program that encourages storytelling, content creation, and communication through online media."
    },
    {
      title: "Web Building",
      category: "NextGen Program",
      image: "assets/images/programs/future-web-building.jpg",
      description:
        "A digital skills initiative that introduces website-building fundamentals and online platform development opportunities."
    },
    {
      title: "Women Empowerment",
      category: "NextGen Program",
      image: "assets/images/programs/future-women-empowerment.png",
      description:
        "An empowering development program that supports women through confidence-building, opportunity awareness, and growth pathways."
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

let currentProgramGroup = "community";

/* =========================
   RENDER FEATURED PROGRAM
========================= */
function renderFeaturedProgram(program) {
  if (!program) return;

  featuredProgramImage.src = program.image;
  featuredProgramImage.alt = program.title;
  featuredProgramCategory.textContent = program.category;
  featuredProgramTitle.textContent = program.title;
  featuredProgramDescription.textContent = program.description;
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

  if (groupName === "community") {
    communityTab.classList.add("active");
    nextgenTab.classList.remove("active");
  } else {
    nextgenTab.classList.add("active");
    communityTab.classList.remove("active");
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
   Replace later with fetch()
========================= */
const miniGalleryGrid = document.getElementById("miniGalleryGrid");

const miniGalleryData = [
  {
    title: "Hope Pantry Outreach",
    image: "assets/images/programs/program-hope-pantry.JPG"
  },
  {
    title: "Medical Mission",
    image: "assets/images/programs/program-medical-mission.JPG"
  },
  {
    title: "Tree Planting",
    image: "assets/images/programs/program-tree-planting.JPG"
  },
  {
    title: "Coastal Cleanup",
    image: "assets/images/programs/program-coastal-cleanup.JPG"
  },
  {
    title: "Youth Leadership",
    image: "assets/images/programs/program-youth-leadership.JPG"
  },
  {
    title: "Digital Literacy",
    image: "assets/images/programs/program-digital-literacy.JPG"
  }
];

function renderMiniGallery(items) {
  if (!miniGalleryGrid) return;

  miniGalleryGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "gallery-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="gallery-image" />
      <div class="gallery-overlay">
        <span>${item.title}</span>
      </div>
    `;

    miniGalleryGrid.appendChild(card);
  });
}

if (miniGalleryGrid) {
  renderMiniGallery(miniGalleryData);
}

/* =========================
   GRATITUDE PLACEHOLDER
   Replace later with fetch()
========================= */
const gratitudeGrid = document.getElementById("gratitudeGrid");

const gratitudeData = [
  {
    name: "Community Supporter",
    message: "Thank you for standing with our mission and helping extend hope to those who need it most.",
    image: "assets/images/programs/program-blood-donation.JPG"
  },
  {
    name: "Partner Organization",
    message: "Your partnership helps strengthen outreach efforts and create meaningful impact in communities.",
    image: "assets/images/programs/program-medical-mission.JPG"
  },
  {
    name: "Volunteer Team",
    message: "Your generosity, time, and dedication continue to move this mission forward with heart and purpose.",
    image: "assets/images/programs/program-youth-leadership.JPG"
  }
];

function renderGratitude(items) {
  if (!gratitudeGrid) return;

  gratitudeGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "gratitude-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="gratitude-image" />
      <h3>${item.name}</h3>
      <p>${item.message}</p>
    `;

    gratitudeGrid.appendChild(card);
  });
}

if (gratitudeGrid) {
  renderGratitude(gratitudeData);
}

/* =========================
   BUBBLE CHAT
========================= */
const bubbleChatButton = document.getElementById("bubbleChatButton");

if (bubbleChatButton) {
  bubbleChatButton.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
}
