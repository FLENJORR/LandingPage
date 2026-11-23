const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

//open / close mobile menu
menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});

//close menu after clicking a link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
    });
});

// scroll reveal animation
const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .portfolio-card, .contact-heading, .contact-container, .footer-container"
);

const revealObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });

}, {
    threshold: 0.15
});

revealElements.forEach(function(element) {
    element.classList.add("reveal");

    if (element.classList.contains("service-card") ||
        element.classList.contains("portfolio-card")) {

        const cards = element.parentElement.querySelectorAll(
            ".service-card, .portfolio-card"
        );
        
        const cardIndex = Array.from(cards).indexOf(element);

        element.style.transitionDelay = "0.3s";    
    }

    revealObserver.observe(element);

});

/* custom smooth scrolling */
const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        const startPosition = window.scrollY;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
        const distance = targetPosition - startPosition;

        const duration = 800;
        let startTime = null;

        function animateScroll(currentTime)  {

            if (startTime === null) {
                startTime = currentTime;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            //ease-in-out animation
            const easing = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(
                0,
                startPosition + distance * easing
            );

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }

        }

        requestAnimationFrame(animateScroll);
    });
});