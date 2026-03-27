// 🌊 Tides of Hope Foundation Script
document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------
     FADE-IN SCROLL ANIMATION
  ------------------------------ */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observerOptions = { threshold: 0.2 };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  fadeEls.forEach(el => appearOnScroll.observe(el));

  /* ------------------------------
     MOBILE MENU TOGGLE
  ------------------------------ */
  const toggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // Change icon ☰ ↔ ✖ for better UX
      toggle.textContent = navMenu.classList.contains("active") ? "✖" : "☰";
    });
  }

  /* ------------------------------
     OPTIONAL PARALLAX WAVE EFFECT
  ------------------------------ */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const waves = document.querySelectorAll('.wave, .wave2');
    waves.forEach(wave => {
      wave.style.transform = `translateX(-${scrollY / 10}px)`;
    });
  });

  /* ------------------------------
     EXPLORE OUR PROGRAMS DROPDOWN
  ------------------------------ */
  const programSelect = document.getElementById("program-select");
  const previewImage = document.getElementById("program-preview-image");
  const previewTitle = document.getElementById("program-preview-title");
  const previewDescription = document.getElementById("program-preview-description");
  const previewFocus = document.getElementById("program-preview-focus");
  const previewButton = document.getElementById("program-preview-button");

  const programData = {
    "future-ready-kids-youth": {
      image: "assets/images/programs/future-ai-skills.JPG",
      title: "Future-Ready Kids & Youth",
      description: "Helping children and youth prepare for the future through creative, digital, and practical learning experiences that build confidence, curiosity, and life-ready skills.",
      focus: "AI basics, web building, basic coding, digital creation, and business literacy",
      buttonLink: "membership.html"
    },
    "digital-literacy-for-all": {
      image: "assets/images/programs/program-digital-literacy.JPG",
      title: "Digital Literacy for All",
      description: "Opening access to digital knowledge for all ages by teaching practical tools, safe online practices, and the confidence to use technology meaningfully in daily life.",
      focus: "Digital basics, online safety, practical tech use, and confidence building",
      buttonLink: "membership.html"
    },
    "tree-planting": {
      image: "assets/images/programs/program-tree-planting.JPG",
      title: "Tree Planting",
      description: "Encouraging communities to restore greener spaces and protect the environment through active participation in tree planting and local care initiatives.",
      focus: "Greener communities, environmental care, and sustainability action",
      buttonLink: "membership.html"
    },
    "coastal-cleanup": {
      image: "assets/images/programs/program-coastal-cleanup.JPG",
      title: "Coastal Cleanup",
      description: "Mobilizing volunteers and communities to protect shorelines, reduce waste, and preserve coastal ecosystems through meaningful environmental action.",
      focus: "Shoreline care, waste reduction, and environmental awareness",
      buttonLink: "membership.html"
    },
    "hope-pantry": {
      image: "assets/images/programs/program-hope-pantry.JPG",
      title: "Hope Pantry",
      description: "Providing essential food and support to families and individuals through compassionate community sharing and practical outreach efforts.",
      focus: "Food support, basic needs, and compassionate outreach",
      buttonLink: "membership.html"
    },
    "medical-missions": {
      image: "assets/images/programs/program-medical-mission.JPG",
      title: "Medical Missions",
      description: "Bringing basic health support and care closer to communities through outreach missions that promote wellness, dignity, and hope.",
      focus: "Health access, wellness outreach, and compassionate care",
      buttonLink: "membership.html"
    },
    "youth-leadership-volunteerism": {
      image: "assets/images/programs/program-youth-leadership.JPG",
      title: "Youth Leadership & Volunteerism",
      description: "Developing young leaders through service, teamwork, and meaningful participation in community-based initiatives and hope-driven action.",
      focus: "Leadership, volunteerism, teamwork, and service",
      buttonLink: "membership.html"
    },
    "eco-bricks-for-hope": {
      image: "assets/images/programs/program-eco-bricks.JPG",
      title: "Eco-Bricks for Hope",
      description: "Turning waste into practical, creative resources while teaching sustainability, environmental responsibility, and community participation.",
      focus: "Eco-bricks, recycling, sustainability, and practical reuse",
      buttonLink: "membership.html"
    },
    "clean-water-for-life": {
      image: "assets/images/programs/future-clean-water.JPG",
      title: "Clean Water for Life",
      description: "Promoting access to safer and cleaner water through awareness, practical support, and community-based initiatives for healthier living.",
      focus: "Water access, sanitation awareness, and community health",
      buttonLink: "membership.html"
    },
  "women-solo-parent-empowerment": {
  image: "assets/images/programs/future-women-empowerment.JPG",
  title: "Women & Solo Parent Empowerment",
  description: "Creating opportunities for women and solo parents through skills development, livelihood support, digital opportunities, and confidence-building programs.",
  focus: "Empowerment, online work pathways, digital skills, and livelihood support",
  buttonLink: "contact.html?topic=women-solo-parent-program"
},
    "blood-donation": {
      image: "assets/images/programs/program-blood-donation.JPG",
      title: "Blood Donation",
      description: "Encouraging life-saving giving through organized blood donation efforts that support emergency needs and strengthen community solidarity.",
      focus: "Life-saving support, community care, and health response",
      buttonLink: "membership.html"
    },
    "mental-health-awareness": {
      image: "assets/images/programs/program-mental-health-awareness.JPG",
      title: "Mental Health Awareness",
      description: "Promoting emotional well-being, understanding, and compassionate support through awareness efforts that help reduce stigma and encourage healing.",
      focus: "Mental wellness, awareness, support, and understanding",
      buttonLink: "membership.html"
    },
    "reef-and-mangrove-utilization": {
      image: "assets/images/programs/program-reef-and-mangrove-utilization.JPG",
      title: "Reef and Mangrove Utilization",
      description: "Supporting environmental stewardship through awareness and initiatives that value, protect, and responsibly engage with coastal ecosystems.",
      focus: "Marine care, mangrove protection, and ecological sustainability",
      buttonLink: "membership.html"
    },
   "ai-basics": {
  image: "assets/images/programs/future-ai-skills.JPG",
  title: "AI Basics",
  description: "Introducing learners to the fundamentals of artificial intelligence in a simple, practical, and age-appropriate way to spark future-ready thinking.",
  focus: "AI awareness, digital understanding, and future-readiness",
  buttonLink: "membership.html"
},
"web-building": {
  image: "assets/images/programs/future-web-building.JPG",
  title: "Web Building",
  description: "Helping learners explore how websites are created and how digital spaces can be used for learning, creativity, and opportunity.",
  focus: "Website basics, digital creativity, and practical skills",
  buttonLink: "membership.html"
},
    "basic-coding": {
      image: "assets/images/programs/future-basic-coding.JPG",
      title: "Basic Coding",
      description: "Teaching simple coding concepts in a beginner-friendly way so youth and learners can build confidence in digital problem-solving and creation.",
      focus: "Coding basics, logic building, and beginner digital skills",
      buttonLink: "membership.html"
    },
   "business-literacy": {
  image: "assets/images/programs/future-business-literacy.JPG",
  title: "Business Literacy",
  description: "Introducing practical business ideas and entrepreneurial thinking to help individuals understand value creation, initiative, and opportunity.",
  focus: "Entrepreneurship, business basics, and opportunity mindset",
  buttonLink: "membership.html"
},
    "financial-literacy": {
      image: "assets/images/programs/future-financial-literacy.JPG",
      title: "Financial Literacy",
      description: "Helping learners and families understand saving, budgeting, responsible money habits, and practical financial awareness for daily life.",
      focus: "Budgeting, saving, smart money habits, and financial awareness",
      buttonLink: "membership.html"
    },
    "kids-digital-literacy": {
      image: "assets/images/programs/future-kids-digital-literacy.JPG",
      title: "Kids Digital Literacy",
      description: "Giving children a guided and safe introduction to digital tools, creative learning, and responsible use of technology.",
      focus: "Child-friendly digital learning, safety, and creativity",
      buttonLink: "membership.html"
    },
    "online-jobs": {
      image: "assets/images/programs/future-online-jobs.JPG",
      title: "Online Jobs",
      description: "Exploring digital work opportunities that can help individuals and communities access new income pathways through practical online skills.",
      focus: "Remote work awareness, digital jobs, and online opportunity",
      buttonLink: "membership.html"
    },
    "online-jobs-solo-parent": {
      image: "assets/images/programs/future-online-jobs-solo-parent.JPG",
      title: "Online Jobs for Solo Parents",
      description: "Creating more flexible livelihood pathways for solo parents through digital work opportunities, practical skills, and confidence-building support.",
      focus: "Flexible income, solo parent support, and digital livelihood",
      buttonLink: "membership.html"
    },
    "online-selling": {
      image: "assets/images/programs/future-online-selling.JPG",
      title: "Online Selling",
      description: "Helping individuals learn how to present, market, and sell products or services online using simple and accessible digital tools.",
      focus: "Digital selling, online marketing, and livelihood opportunities",
      buttonLink: "membership.html"
    },
    "online-vlogging": {
      image: "assets/images/programs/future-online-vlogging.JPG",
      title: "Online Vlogging",
      description: "Encouraging creative digital expression through beginner-friendly content creation and storytelling for learning, awareness, and opportunity.",
      focus: "Content creation, storytelling, digital confidence, and creativity",
      buttonLink: "membership.html"
    }
  };

  function updateProgramPreview(programKey) {
    const selectedProgram = programData[programKey];
    if (!selectedProgram) return;

    previewImage.src = selectedProgram.image;
    previewImage.alt = selectedProgram.title;
    previewTitle.textContent = selectedProgram.title;
    previewDescription.textContent = selectedProgram.description;
    previewFocus.textContent = selectedProgram.focus;
    previewButton.href = selectedProgram.buttonLink;
  }

  if (programSelect && previewImage && previewTitle && previewDescription && previewFocus && previewButton) {
    updateProgramPreview(programSelect.value);

    programSelect.addEventListener("change", (event) => {
      updateProgramPreview(event.target.value);
    });
  }
});
