// ================= SCROLL ANIMATION =================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section").forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});


// ================= TOAST NOTIFICATION =================

function showToast(message, type) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.className = `show ${type}`;

    setTimeout(() => {

        toast.className = "";

    }, 3000);

}


// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ================= BACK TO TOP =================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (backToTop) {

        if (window.scrollY > 400) {

            backToTop.style.display = "flex";

        } else {

            backToTop.style.display = "none";

        }

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// ================= PRELOADER =================

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        preloader.style.opacity = "0";

        setTimeout(() => {

            preloader.remove();

        }, 500);

    }

});


// ================= EMAILJS CONTACT FORM =================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const sendBtn = document.getElementById("send-btn");

        sendBtn.disabled = true;

        sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        emailjs.sendForm(

            "service_fk4y79j",

            "template_cbdblep",

            this

        ).then(() => {

            showToast("✅ Message sent successfully!", "success");

            contactForm.reset();

            sendBtn.disabled = false;

            sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

        }).catch((error) => {

            console.error("EmailJS Error:", error);

            showToast("❌ Failed to send message.", "error");

            sendBtn.disabled = false;

            sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

        });

    });

}