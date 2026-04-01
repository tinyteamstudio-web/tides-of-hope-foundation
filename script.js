// 🌊 Tides of Hope Foundation Script
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------
     FADE-IN SCROLL ANIMATION
  ------------------------------ */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observerOptions = { threshold: 0.2 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  fadeEls.forEach((el) => appearOnScroll.observe(el));

  /* ------------------------------
     MOBILE MENU TOGGLE
  ------------------------------ */
  const toggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      toggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
    });
  }

  /* ------------------------------
     OPTIONAL PARALLAX WAVE EFFECT
  ------------------------------ */
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const waves = document.querySelectorAll(".wave, .wave2");
    waves.forEach((wave) => {
      wave.style.transform = `translateX(-${scrollY / 10}px)`;
    });
  });

    /* ------------------------------
     EXPLORE OUR PROGRAMS
     COMMUNITY + FUTURE
  ------------------------------ */

  // COMMUNITY ELEMENTS
  const communitySelect = document.getElementById("community-program-select");
  const communityPreviewImage = document.getElementById("community-preview-image");
  const communityPreviewTitle = document.getElementById("community-preview-title");
  const communityPreviewDescription = document.getElementById("community-preview-description");
  const communityPreviewFocus = document.getElementById("community-preview-focus");
  const communityPreviewButton = document.getElementById("community-preview-button");

  const communityInsightTitle = document.getElementById("community-insight-title");
  const communityInsightWhy = document.getElementById("community-insight-why");
  const communityInsightHow = document.getElementById("community-insight-how");
  const communityInsightPartners = document.getElementById("community-insight-partners");

  // FUTURE ELEMENTS
  const futureSelect = document.getElementById("future-program-select");
  const futurePreviewImage = document.getElementById("future-preview-image");
  const futurePreviewTitle = document.getElementById("future-preview-title");
  const futurePreviewDescription = document.getElementById("future-preview-description");
  const futurePreviewFocus = document.getElementById("future-preview-focus");
  const futurePreviewButton = document.getElementById("future-preview-button");

  const futureInsightTitle = document.getElementById("future-insight-title");
  const futureInsightWhy = document.getElementById("future-insight-why");
  const futureInsightHow = document.getElementById("future-insight-how");
  const futureInsightPartners = document.getElementById("future-insight-partners");

  // COMMUNITY PROGRAM DATA
  const communityProgramData = {
    "tree-planting": {
      image: "assets/images/programs/program-tree-planting.JPG",
      title: "Tree Planting",
      description:
        "Encouraging communities to restore greener spaces and protect the environment through active participation in tree planting and local care initiatives.",
      focus:
        "Greener communities, environmental care, and sustainability action",
      buttonLink: "contact.html?topic=tree-planting",
      insightTitle: "Planting trees invests in the future",
      why:
        "Tree planting helps restore greener spaces, improve air quality, and support healthier communities for future generations.",
      how:
        "This can work through organized planting drives, local care teams, follow-up maintenance, and community-based environmental education.",
      partners:
        "Schools, barangays, environmental groups, youth volunteers, local businesses, and civic organizations."
    },

    "coastal-cleanup": {
      image: "assets/images/programs/program-coastal-cleanup.JPG",
      title: "Coastal Cleanup",
      description:
        "Mobilizing volunteers and communities to protect shorelines, reduce waste, and preserve coastal ecosystems through meaningful environmental action.",
      focus:
        "Shoreline care, waste reduction, and environmental awareness",
      buttonLink: "contact.html?topic=coastal-cleanup",
      insightTitle: "Protecting coasts protects communities",
      why:
        "Coastal areas are essential to community life, marine ecosystems, and local livelihoods. Keeping them clean protects both people and nature.",
      how:
        "This can work through cleanup drives, volunteer teams, waste collection coordination, and awareness activities led by local groups.",
      partners:
        "Barangays, schools, youth organizations, environmental groups, local businesses, and coastal communities."
    },

    "hope-pantry": {
      image: "assets/images/programs/program-hope-pantry.JPG",
      title: "Hope Pantry",
      description:
        "Providing essential food and support to families and individuals through compassionate community sharing and practical outreach efforts.",
      focus:
        "Food support, basic needs, and compassionate outreach",
      buttonLink: "donate.html",
      insightTitle: "Compassion can be organized into action",
      why:
        "Hope Pantry helps meet urgent food and basic needs while reminding communities that support and dignity matter.",
      how:
        "This can work through food collection drives, pantry stations, donor support, volunteer coordination, and scheduled community distribution.",
      partners:
        "Community groups, donors, volunteers, local businesses, faith groups, and civic organizations."
    },

    "medical-missions": {
      image: "assets/images/programs/program-medical-mission.JPG",
      title: "Medical Missions",
      description:
        "Bringing basic health support and care closer to communities through outreach missions that promote wellness, dignity, and hope.",
      focus:
        "Health access, wellness outreach, and compassionate care",
      buttonLink: "contact.html?topic=medical-missions",
      insightTitle: "Healthcare access should reach communities",
      why:
        "Many communities still face barriers to basic health support, making medical outreach an important act of care and dignity.",
      how:
        "This can work through organized health missions, volunteer professionals, medicine support, wellness education, and partner coordination.",
      partners:
        "Doctors, nurses, health workers, NGOs, LGUs, sponsors, and volunteer medical teams."
    },

    "youth-leadership-volunteerism": {
      image: "assets/images/programs/program-youth-leadership.JPG",
      title: "Youth Leadership & Volunteerism",
      description:
        "Developing young leaders through service, teamwork, and meaningful participation in community-based initiatives and hope-driven action.",
      focus:
        "Leadership, volunteerism, teamwork, and service",
      buttonLink: "membership.html",
      insightTitle: "Young leaders help communities move forward",
      why:
        "Youth leadership builds confidence, responsibility, and a stronger culture of service within the community.",
      how:
        "This can work through volunteer activities, leadership sessions, mentorship, team projects, and active youth participation in local programs.",
      partners:
        "Schools, youth groups, mentors, teachers, community leaders, and volunteer organizations."
    },

    "eco-bricks-for-hope": {
      image: "assets/images/programs/program-eco-bricks.JPG",
      title: "Eco-Bricks for Hope",
      description:
        "Turning waste into practical, creative resources while teaching sustainability, environmental responsibility, and community participation.",
      focus:
        "Eco-bricks, recycling, sustainability, and practical reuse",
      buttonLink: "contact.html?topic=eco-bricks",
      insightTitle: "Waste can become a useful community resource",
      why:
        "Eco-bricks encourage better waste habits while turning plastic waste into practical and creative community resources.",
      how:
        "This can work through collection drives, eco-brick workshops, recycling awareness, and community projects that promote reuse.",
      partners:
        "Schools, environmental advocates, youth groups, barangays, community volunteers, and local supporters."
    },

    "clean-water-for-life": {
      image: "assets/images/programs/future-clean-water.JPG",
      title: "Clean Water for Life",
      description:
        "Promoting access to safer and cleaner water through awareness, practical support, and community-based initiatives for healthier living.",
      focus:
        "Water access, sanitation awareness, and community health",
      buttonLink: "contact.html?topic=clean-water",
      insightTitle: "Clean water supports health and dignity",
      why:
        "Access to clean water is essential for health, hygiene, and safe daily living in every community.",
      how:
        "This can work through sanitation education, local clean water support, awareness campaigns, and partnership-led community solutions.",
      partners:
        "Health workers, NGOs, water advocates, barangays, donors, and community volunteers."
    },

    "women-solo-parent-empowerment": {
      image: "assets/images/programs/future-women-empowerment.png",
      title: "Women & Solo Parent Empowerment",
      description:
        "Creating opportunities for women and solo parents through skills development, livelihood support, digital opportunities, and confidence-building programs.",
      focus:
        "Empowerment, online work pathways, digital skills, and livelihood support",
      buttonLink: "contact.html?topic=women-solo-parent-program",
      insightTitle: "Empowerment creates stable pathways",
      why:
        "Women and solo parents need access to support, flexible opportunities, and skills that help them build stable and dignified lives.",
      how:
        "This can work through digital skills training, online job guidance, livelihood sessions, and supportive community-based programs.",
      partners:
        "Women’s groups, LGUs, livelihood advocates, training mentors, NGOs, and private sponsors."
    },

    "blood-donation": {
      image: "assets/images/programs/program-blood-donation.JPG",
      title: "Blood Donation",
      description:
        "Encouraging life-saving giving through organized blood donation efforts that support emergency needs and strengthen community solidarity.",
      focus:
        "Life-saving support, community care, and health response",
      buttonLink: "contact.html?topic=blood-donation",
      insightTitle: "One donation can help save lives",
      why:
        "Blood donation supports urgent medical needs and strengthens community response during emergencies and critical care situations.",
      how:
        "This can work through scheduled blood drives, awareness campaigns, medical coordination, and donor participation support.",
      partners:
        "Hospitals, blood banks, health workers, volunteers, civic groups, and local sponsors."
    },

    "mental-health-awareness": {
      image: "assets/images/programs/program-mental-health-awareness.JPG",
      title: "Mental Health Awareness",
      description:
        "Promoting emotional well-being, understanding, and compassionate support through awareness efforts that help reduce stigma and encourage healing.",
      focus:
        "Mental wellness, awareness, support, and understanding",
      buttonLink: "contact.html?topic=mental-health-awareness",
      insightTitle: "Mental wellness deserves attention and care",
      why:
        "Mental health awareness helps reduce stigma and encourages communities to value emotional well-being and support.",
      how:
        "This can work through awareness talks, support spaces, community conversations, wellness education, and partner-led outreach.",
      partners:
        "Counselors, mental health advocates, schools, youth groups, NGOs, and supportive community leaders."
    },

    "reef-and-mangrove-utilization": {
      image: "assets/images/programs/program-reef-and-mangrove-utilization.JPG",
      title: "Reef and Mangrove Utilization",
      description:
        "Supporting environmental stewardship through awareness and initiatives that value, protect, and responsibly engage with coastal ecosystems.",
      focus:
        "Marine care, mangrove protection, and ecological sustainability",
      buttonLink: "contact.html?topic=reef-mangrove",
      insightTitle: "Healthy coastal ecosystems protect life",
      why:
        "Reefs and mangroves support biodiversity, coastal protection, and the long-term well-being of communities near the sea.",
      how:
        "This can work through awareness efforts, coastal education, mangrove care, community protection activities, and environmental partnerships.",
      partners:
        "Environmental groups, coastal communities, schools, barangays, marine advocates, and local volunteers."
    }
  };

  // FUTURE PROGRAM DATA
  const futureProgramData = {
    "future-ready-kids-youth": {
      image: "assets/images/programs/future-ai-skills.jpg",
      title: "Future-Ready Kids & Youth",
      description:
        "Helping children and youth prepare for the future through creative, digital, and practical learning experiences that build confidence, curiosity, and life-ready skills.",
      focus:
        "AI basics, web building, basic coding, digital creation, and business literacy",
      buttonLink: "membership.html",
      insightTitle: "Future-ready learning starts early",
      why:
        "This program helps prepare children and youth for a fast-changing world by building confidence, curiosity, and practical future-ready skills.",
      how:
        "It can be delivered through guided learning sessions, community workshops, digital skill exposure, and creative hands-on activities.",
      partners:
        "Schools, teachers, youth leaders, parents, education advocates, and technology mentors."
    },

    "digital-literacy-for-all": {
      image: "assets/images/programs/program-digital-literacy.JPG",
      title: "Digital Literacy for All",
      description:
        "Opening access to digital knowledge for all ages by teaching practical tools, safe online practices, and the confidence to use technology meaningfully in daily life.",
      focus:
        "Digital basics, online safety, practical tech use, and confidence building",
      buttonLink: "membership.html",
      insightTitle: "Digital access should empower everyone",
      why:
        "Digital literacy helps people navigate modern life with more confidence, safety, and opportunity.",
      how:
        "This can work through beginner-friendly sessions on digital tools, online safety, communication, and practical everyday technology use.",
      partners:
        "Schools, teachers, youth leaders, community trainers, digital volunteers, and education advocates."
    },

    "ai-basics": {
      image: "assets/images/programs/future-ai-skills.jpg",
      title: "AI Basics",
      description:
        "Introducing learners to the fundamentals of artificial intelligence in a simple, practical, and age-appropriate way to spark future-ready thinking.",
      focus:
        "AI awareness, digital understanding, and future-readiness",
      buttonLink: "membership.html",
      insightTitle: "AI awareness should begin with understanding",
      why:
        "Early awareness of AI helps learners understand the tools shaping the future and prepares them to use technology responsibly.",
      how:
        "This can work through simple guided lessons, examples, hands-on activities, and beginner-friendly discussions about AI in daily life.",
      partners:
        "Schools, teachers, tech mentors, youth leaders, parents, and digital education advocates."
    },

    "web-building": {
      image: "assets/images/programs/future-web-building.jpg",
      title: "Web Building",
      description:
        "Helping learners explore how websites are created and how digital spaces can be used for learning, creativity, and opportunity.",
      focus:
        "Website basics, digital creativity, and practical skills",
      buttonLink: "membership.html",
      insightTitle: "Web skills create new digital opportunities",
      why:
        "Learning web building introduces practical digital skills that can support creativity, communication, and future opportunities.",
      how:
        "This can work through step-by-step workshops, guided website exercises, beginner coding exposure, and simple project building.",
      partners:
        "Schools, web mentors, youth groups, teachers, digital volunteers, and education advocates."
    },

    "basic-coding": {
      image: "assets/images/programs/future-basic-coding.png",
      title: "Basic Coding",
      description:
        "Teaching simple coding concepts in a beginner-friendly way so youth and learners can build confidence in digital problem-solving and creation.",
      focus:
        "Coding basics, logic building, and beginner digital skills",
      buttonLink: "membership.html",
      insightTitle: "Coding builds logic and confidence",
      why:
        "Basic coding helps learners build problem-solving skills, logical thinking, and confidence in creating with technology.",
      how:
        "This can work through beginner-friendly sessions, practical exercises, guided coding lessons, and simple project challenges.",
      partners:
        "Schools, coding mentors, teachers, youth leaders, parents, and digital learning advocates."
    },

    "business-literacy": {
      image: "assets/images/programs/future-business-literacy.png",
      title: "Business Literacy",
      description:
        "Introducing practical business ideas and entrepreneurial thinking to help individuals understand value creation, initiative, and opportunity.",
      focus:
        "Entrepreneurship, business basics, and opportunity mindset",
      buttonLink: "membership.html",
      insightTitle: "Business understanding opens practical pathways",
      why:
        "Business literacy helps people better understand opportunity, initiative, value creation, and practical decision-making.",
      how:
        "This can work through workshops on entrepreneurship, business basics, simple planning, budgeting, and real-life examples.",
      partners:
        "Business mentors, livelihood advocates, schools, community trainers, entrepreneurs, and sponsors."
    },

    "financial-literacy": {
      image: "assets/images/programs/future-financial-literacy.JPG",
      title: "Financial Literacy",
      description:
        "Helping learners and families understand saving, budgeting, responsible money habits, and practical financial awareness for daily life.",
      focus:
        "Budgeting, saving, smart money habits, and financial awareness",
      buttonLink: "membership.html",
      insightTitle: "Financial awareness strengthens daily life",
      why:
        "Financial literacy supports better money habits, stronger planning, and more informed decisions for individuals and families.",
      how:
        "This can work through practical lessons on budgeting, saving, financial discipline, and simple household money planning.",
      partners:
        "Schools, livelihood mentors, financial educators, community trainers, parents, and support organizations."
    },

    "kids-digital-literacy": {
      image: "assets/images/programs/future-kids-digital-literacy.png",
      title: "Kids Digital Literacy",
      description:
        "Giving children a guided and safe introduction to digital tools, creative learning, and responsible use of technology.",
      focus:
        "Child-friendly digital learning, safety, and creativity",
      buttonLink: "membership.html",
      insightTitle: "Children need safe digital learning spaces",
      why:
        "Kids digital literacy helps children use technology more safely, creatively, and confidently from an early age.",
      how:
        "This can work through child-friendly digital sessions, supervised activities, online safety lessons, and creative learning exercises.",
      partners:
        "Parents, teachers, schools, child advocates, youth mentors, and digital learning volunteers."
    },

    "online-jobs": {
      image: "assets/images/programs/future-online-jobs.JPG",
      title: "Online Jobs",
      description:
        "Exploring digital work opportunities that can help individuals and communities access new income pathways through practical online skills.",
      focus:
        "Remote work awareness, digital jobs, and online opportunity",
      buttonLink: "membership.html",
      insightTitle: "Digital work can create flexible opportunities",
      why:
        "Online jobs can help expand income opportunities for people who need practical and flexible work pathways.",
      how:
        "This can work through job orientation, digital skill preparation, profile building, and practical guidance on online work opportunities.",
      partners:
        "Digital workers, trainers, livelihood advocates, mentors, NGOs, and community support groups."
    },

    "online-jobs-solo-parent": {
      image: "assets/images/programs/future-online-jobs-solo-parent.JPG",
      title: "Online Jobs for Solo Parents",
      description:
        "Creating more flexible livelihood pathways for solo parents through digital work opportunities, practical skills, and confidence-building support.",
      focus:
        "Flexible income, solo parent support, and digital livelihood",
      buttonLink: "membership.html",
      insightTitle: "Flexible work matters for solo parents",
      why:
        "Solo parents often need work options that fit family responsibilities while still creating stable income opportunities.",
      how:
        "This can work through digital work guidance, flexible job preparation, online skills training, and support-focused mentoring.",
      partners:
        "Solo parent groups, livelihood advocates, digital workers, community mentors, NGOs, and sponsors."
    },

    "online-selling": {
      image: "assets/images/programs/future-online-selling.JPG",
      title: "Online Selling",
      description:
        "Helping individuals learn how to present, market, and sell products or services online using simple and accessible digital tools.",
      focus:
        "Digital selling, online marketing, and livelihood opportunities",
      buttonLink: "membership.html",
      insightTitle: "Selling online can expand livelihood options",
      why:
        "Online selling helps individuals explore practical ways to earn by using digital platforms and simple marketing strategies.",
      how:
        "This can work through product presentation training, digital selling guidance, online posting practice, and beginner marketing sessions.",
      partners:
        "Small business mentors, livelihood groups, online sellers, trainers, and community support networks."
    },

    "online-vlogging": {
      image: "assets/images/programs/future-online-vlogging.JPG",
      title: "Online Vlogging",
      description:
        "Encouraging creative digital expression through beginner-friendly content creation and storytelling for learning, awareness, and opportunity.",
      focus:
        "Content creation, storytelling, digital confidence, and creativity",
      buttonLink: "membership.html",
      insightTitle: "Creative voices can inspire and inform",
      why:
        "Online vlogging helps people explore storytelling, digital confidence, and creative expression that can inform, inspire, and open new opportunities.",
      how:
        "This can work through beginner content workshops, storytelling practice, basic video guidance, and confidence-building digital activities.",
      partners:
        "Content creators, mentors, youth leaders, schools, media advocates, and digital volunteers."
    }
  };

  function updateCommunityProgramPreview(programKey) {
    const selectedProgram = communityProgramData[programKey];
    if (!selectedProgram) return;

    if (communityPreviewImage) {
      communityPreviewImage.src = selectedProgram.image;
      communityPreviewImage.alt = selectedProgram.title;
    }
    if (communityPreviewTitle) {
      communityPreviewTitle.textContent = selectedProgram.title;
    }
    if (communityPreviewDescription) {
      communityPreviewDescription.textContent = selectedProgram.description;
    }
    if (communityPreviewFocus) {
      communityPreviewFocus.textContent = selectedProgram.focus;
    }
    if (communityPreviewButton) {
      communityPreviewButton.href = selectedProgram.buttonLink;
    }
    if (communityInsightTitle) {
      communityInsightTitle.textContent = selectedProgram.insightTitle || "Community Insight";
    }
    if (communityInsightWhy) {
      communityInsightWhy.textContent = selectedProgram.why || "";
    }
    if (communityInsightHow) {
      communityInsightHow.textContent = selectedProgram.how || "";
    }
    if (communityInsightPartners) {
      communityInsightPartners.textContent = selectedProgram.partners || "";
    }
  }

  function updateFutureProgramPreview(programKey) {
    const selectedProgram = futureProgramData[programKey];
    if (!selectedProgram) return;

    if (futurePreviewImage) {
      futurePreviewImage.src = selectedProgram.image;
      futurePreviewImage.alt = selectedProgram.title;
    }
    if (futurePreviewTitle) {
      futurePreviewTitle.textContent = selectedProgram.title;
    }
    if (futurePreviewDescription) {
      futurePreviewDescription.textContent = selectedProgram.description;
    }
    if (futurePreviewFocus) {
      futurePreviewFocus.textContent = selectedProgram.focus;
    }
    if (futurePreviewButton) {
      futurePreviewButton.href = selectedProgram.buttonLink;
    }
    if (futureInsightTitle) {
      futureInsightTitle.textContent = selectedProgram.insightTitle || "Future Insight";
    }
    if (futureInsightWhy) {
      futureInsightWhy.textContent = selectedProgram.why || "";
    }
    if (futureInsightHow) {
      futureInsightHow.textContent = selectedProgram.how || "";
    }
    if (futureInsightPartners) {
      futureInsightPartners.textContent = selectedProgram.partners || "";
    }
  }

  if (
    communitySelect &&
    communityPreviewImage &&
    communityPreviewTitle &&
    communityPreviewDescription &&
    communityPreviewFocus &&
    communityPreviewButton
  ) {
    updateCommunityProgramPreview(communitySelect.value);

    communitySelect.addEventListener("change", (event) => {
      updateCommunityProgramPreview(event.target.value);
    });
  }

  if (
    futureSelect &&
    futurePreviewImage &&
    futurePreviewTitle &&
    futurePreviewDescription &&
    futurePreviewFocus &&
    futurePreviewButton
  ) {
    updateFutureProgramPreview(futureSelect.value);

    futureSelect.addEventListener("change", (event) => {
      updateFutureProgramPreview(event.target.value);
    });
  }

                          /* ================= PROGRAM SYSTEM ================= */

const programs = {
  community: {
    youth: {
      title: "Children & Youth Development",
      description: "Mentorship, education support, leadership training, and youth empowerment programs.",
      why: "Youth are the future of every community and investing in them builds stronger societies.",
      how: "Workshops, mentoring, school partnerships, leadership camps.",
      partners: "Schools, teachers, youth leaders, education advocates.",
      image: "assets/images/programs/youth.jpg",
      link: "program-youth.html"
    },

    women: {
      title: "Women Empowerment",
      description: "Skills training, livelihood programs, and leadership development for women.",
      why: "Empowered women strengthen families and communities.",
      how: "Training programs, mentoring, small business support.",
      partners: "Women's groups, NGOs, local businesses.",
      image: "assets/images/programs/women.jpg",
      link: "program-women.html"
    },

    seniors: {
      title: "Senior Citizens Support",
      description: "Care programs, wellness activities, and community engagement for senior citizens.",
      why: "Seniors deserve dignity, care, and community connection.",
      how: "Health programs, social events, support services.",
      partners: "Health organizations, community groups.",
      image: "assets/images/programs/seniors.jpg",
      link: "program-seniors.html"
    }
  },

  future: {
    digital: {
      title: "Digital Literacy & Technology Education",
      description: "Preparing communities for the digital world through technology education.",
      why: "Digital skills are essential for future jobs and opportunities.",
      how: "Computer classes, digital literacy workshops, online learning.",
      partners: "Schools, tech companies, mentors.",
      image: "assets/images/programs/digital.jpg",
      link: "program-digital.html"
    },

    coding: {
      title: "Coding & Innovation for Youth",
      description: "Teaching coding, robotics, and innovation skills to youth.",
      why: "Innovation and technology drive the future economy.",
      how: "Coding camps, robotics workshops, innovation labs.",
      partners: "Tech companies, universities, mentors.",
      image: "assets/images/programs/coding.jpg",
      link: "program-coding.html"
    }
  }
};

const categorySelect = document.getElementById("programCategory");
const programSelect = document.getElementById("programSelect");

function loadPrograms() {
  const category = categorySelect.value;
  const categoryPrograms = programs[category];

  programSelect.innerHTML = "";

  for (let key in categoryPrograms) {
    let option = document.createElement("option");
    option.value = key;
    option.textContent = categoryPrograms[key].title;
    programSelect.appendChild(option);
  }

  updateProgramPreview();
}

function updateProgramPreview() {
  const category = categorySelect.value;
  const programKey = programSelect.value;
  const program = programs[category][programKey];

  document.getElementById("programTitle").textContent = program.title;
  document.getElementById("programDescription").textContent = program.description;
  document.getElementById("programWhy").textContent = program.why;
  document.getElementById("programHow").textContent = program.how;
  document.getElementById("programPartners").textContent = program.partners;
  document.getElementById("programImage").src = program.image;
  document.getElementById("learnMoreBtn").href = program.link;
}

categorySelect.addEventListener("change", loadPrograms);
programSelect.addEventListener("change", updateProgramPreview);

loadPrograms();
