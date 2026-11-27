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

//project preview lightbox
const previewButtons = document.querySelectorAll(".preview-btn");
const previewLightbox = document.getElementById("preview-lightbox");
const previewImage = document.getElementById("preview-image");
const closePreview = document.getElementById("close-preview");

//open preview
previewButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const imagePath = button.getAttribute("data-image");

        previewImage.src = imagePath;
        previewLightbox.classList.add("active");
    });
});

//close preview
closePreview.addEventListener("click", function() {
    previewLightbox.classList.remove("active");
});

//close whenn you click outside the image
previewLightbox.addEventListener("click", function(event) {
    if (event.target === previewLightbox) {
        previewLightbox.classList.remove("active");
    }
});

//close with esc key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        previewLightbox.classList.remove("active");
    }
});

//active nav link
const sections = document.querySelectorAll(
    "#hero, #services, #work, #testimonials, #contact, #faq"
);

const activeNavLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {

            //remove active class from links
            activeNavLinks.forEach(function(link) {
                link.classList.remove("active");
            });

            //find the link connected to the current section
            const activeLink = document.querySelector(
                `.nav-links a[href="#${entry.target.id}"]`
            );

            //highlight link
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, {
    rootMargin: "-30% 0px -60% 0px"
});

//observe all sections
sections.forEach(function(section) {
    sectionObserver.observe(section);
});

//back to top btn
const backToTop = document.getElementById("back-to-top");

//show btn when scrolling down
window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

//scroll to top 
backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

//preloader
const preloader = document.getElementById("preloader");

window.addEventListener("load", function() {
    setTimeout(function () {
        preloader.classList.add("hide");
    }, 800); 
});


// FAQ 
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function(item) {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function() {

        // Close other FAQ items
        faqItems.forEach(function(otherItem) {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            }
        });

        // Toggle the selected FAQ item
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }

    });

});
