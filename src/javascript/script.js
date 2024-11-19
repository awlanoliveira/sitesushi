document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu mobile
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    mobileBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon.classList.contains('fa-x')) {
            icon.classList.remove('fa-x');
        } else {
            icon.classList.add('fa-x');
        }
    });

    // Highlight navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY - header.offsetHeight;
        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '5px 1px 5px rgba(0, 0, 0, 0.1)';
        }

        sections.forEach((section, i) => {
            const sectionTop = section.offsetTop - 96;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
            }
        });

        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[activeSectionIndex]) {
            navItems[activeSectionIndex].classList.add('active');
        }
    });

    // ScrollReveal animations
    const revealElements = (selector, options) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.transform = 'translate(0, 0)';
                        element.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            Object.assign(element.style, {
                transform: `translate(${options.origin === 'left' ? '-20%' : '20%'}, 0)`,
                opacity: '0',
                transition: `transform ${options.duration}ms ease, opacity ${options.duration}ms ease`
            });

            observer.observe(element);
        });
    };

    revealElements('#cta', { origin: 'left', duration: 2000 });
    revealElements('.dish', { origin: 'left', duration: 2000 });
    revealElements('#testimonial_chef', { origin: 'left', duration: 1000 });
    revealElements('.feedback', { origin: 'right', duration: 1000 });
});
