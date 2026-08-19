/* ==========================================================================
   JERICHO L. SUERTO - PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Typing Animation in Hero Section --- */
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Software Developer",
        "Web Developer",
        "Database Administrator",
        "Technical Support Specialist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    /* --- 2. Tech Grid Particle Canvas --- */
    const canvas = document.getElementById('tech-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.floor(width / 35);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }

    /* --- 3. Header Scroll Glass Effect & Nav Highlight --- */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        // Active link tracking
        let currentSec = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSec = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSec}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- 4. Mobile Menu Navigation --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
        });
    });

    /* --- 5. Project Modals Data & Logic --- */
    const projectData = {
        project1: {
            title: "Interactive Databank for Indigenous Heritage Preservation",
            type: "Capstone Project | Davao del Sur State College",
            description: "A web-based information system designed to preserve, organize, and manage indigenous cultural heritage records.",
            features: [
                "Developed a web-based information system for organizing and managing indigenous cultural heritage records.",
                "Implemented a searchable database for efficient retrieval of cultural information, historical records, and digital archives.",
                "Designed a user-friendly interface to improve accessibility for administrators, researchers, and authorized users.",
                "Organized and managed information using a structured relational database (MySQL).",
                "Participated in system analysis, database design, development, testing, and documentation."
            ],
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            role: "Capstone Project Lead & Developer"
        },
        project2: {
            title: "Records Management System",
            type: "Internship Project | DENR-CENRO Digos",
            description: "A web-based Records Management System designed to improve document organization, storage, and retrieval for government agency staff.",
            features: [
                "Developed a web-based Records Management System for the CENRO Records Office.",
                "Implemented a database for organized document storage and efficient retrieval.",
                "Improved accessibility and organization of official government records.",
                "Assisted in system development, testing, database design, and implementation.",
                "Applied database management and information management concepts in a real-world agency setting."
            ],
            technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
            role: "System Developer & Data Encoder Trainee"
        }
    };

    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalContentArea = document.getElementById('modal-content-area');
    const openModalBtns = document.querySelectorAll('.open-project-modal');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectData[projectKey];

            if (data && modalContentArea) {
                modalContentArea.innerHTML = `
                    <span class="modal-project-type">${data.type}</span>
                    <h2 class="modal-project-title">${data.title}</h2>
                    <p class="project-description" style="margin-bottom: 1.5rem;">${data.description}</p>
                    
                    <h3 class="modal-sec-heading"><i class="fa-solid fa-star"></i> Key Features & My Contributions</h3>
                    <ul class="modal-feature-list">
                        ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
                    </ul>

                    <h3 class="modal-sec-heading"><i class="fa-solid fa-layer-group"></i> Technologies & Tools Used</h3>
                    <div class="project-tech-stack" style="margin-top: 0.5rem;">
                        ${data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>

                    <h3 class="modal-sec-heading"><i class="fa-solid fa-user-tag"></i> Primary Project Role</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">${data.role}</p>
                `;
                projectModal?.classList.add('active');
            }
        });
    });

    modalCloseBtn?.addEventListener('click', () => {
        projectModal?.classList.remove('active');
    });

    projectModal?.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });

    /* --- 6. Resume Modal & Print Viewer --- */
    const resumeModal = document.getElementById('resume-modal');
    const resumeTriggers = document.querySelectorAll('.resume-trigger-btn');
    const resumeCloseBtn = document.getElementById('resume-modal-close');
    const printResumeBtn = document.getElementById('print-resume-btn');

    resumeTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            resumeModal?.classList.add('active');
        });
    });

    resumeCloseBtn?.addEventListener('click', () => {
        resumeModal?.classList.remove('active');
    });

    resumeModal?.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            resumeModal.classList.remove('active');
        }
    });

    printResumeBtn?.addEventListener('click', () => {
        window.print();
    });

    /* --- 7. Social Links Placeholder Feedback --- */
    const socialBtns = document.querySelectorAll('.social-placeholder-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            showToast(`<i class="fa-solid fa-circle-info"></i> Jericho's ${platform} profile URL placeholder. (To be updated upon URL release)`);
        });
    });

    /* --- 8. Contact Form Handling (Client Demonstration) --- */
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('sender-name');
        const emailInput = document.getElementById('sender-email');
        const messageInput = document.getElementById('sender-message');

        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showToast('<i class="fa-solid fa-triangle-exclamation"></i> Please fill in all required fields.', 'error');
            return;
        }

        showToast(`<i class="fa-solid fa-paper-plane"></i> Thank you, ${nameInput.value.trim()}! Your message has been prepared.`);
        contactForm.reset();
    });

    /* --- Toast Notification Helper --- */
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        if (type === 'error') {
            toast.style.borderColor = '#ff5f56';
        }
        toast.innerHTML = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
