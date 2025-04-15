$(document).ready(function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for navbar links
    $('a[href^="#"]').on('click', function (e) {
        const targetId = $(this).attr('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = $(targetId);
            if (targetElement.length) {
                $('html, body').animate({
                    scrollTop: targetElement.offset().top - 70
                }, 600);
            }
        }
    });

    // Load Modals and Bind Event Handlers
    $('#modals-container').load('components/modals.html', function () {
        // LOGIN modal logic
        const loginForm = $('#loginForm');
        const loginSubmit = $('#loginSubmit');
        const loginSuccess = $('#loginSuccess');
        const loginModal = $('#loginModal');

        loginSubmit.on('click', function () {
            const studentNo = $('#studentNo').val().trim();
            const password = $('#password').val().trim();

            if (studentNo && password) {
                loginSuccess.removeClass('d-none').addClass('show');
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(loginModal[0]);
                    modal.hide();
                    loginForm[0].reset();
                    loginSuccess.addClass('d-none');
                }, 2000);
            } else {
                alert('Please fill in both Student Number and Password.');
            }
        });

        loginModal.on('hidden.bs.modal', function () {
            loginForm[0].reset();
            loginSuccess.addClass('d-none');
        });

        // REGISTER modal logic
        $('#registerSubmit').on('click', function () {
            const studentNo = $('#regStudentNo').val();
            const department = $('#department').val();
            const year = $('#year').val();
            const eventName = $('#eventName').val();

            if (!studentNo || !department || !year) {
                alert('Please fill out all required fields');
                return;
            }

            $('#registerSuccess').removeClass('d-none');
            setTimeout(() => {
                $('#registerSuccess').addClass('d-none');
            }, 3000);
        });

        $('#registerModal').on('show.bs.modal', function (event) {
            const button = $(event.relatedTarget);
            const eventName = button.data('event') || 'Event Name';
            $('#eventName').val(eventName);
        });
    });

    // Scroll to clubs
    $(document).on('click', '.join-btn', function () {
        const target = $('#clubs-container');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 600);
        }
    });

    // Tooltip, Popover, Navbar Scroll
    $('[data-bs-toggle="tooltip"]').tooltip();
    $('[data-bs-toggle="popover"]').popover();

    const navbar = $('.navbar');
    $(window).on('scroll', function () {
        navbar.toggleClass('navbar-scrolled', $(this).scrollTop() > 50);
    });

    // Log modal opens
    $(document).on('click', '[data-bs-target^="#clubModal"], [data-bs-target^="#eventModal"]', function () {
        const targetModalId = $(this).attr('data-bs-target');
        console.log(`Opening ${targetModalId}`);
    });

    // Event Slide Alert (demo)
    $(document).on('click', '.event-slide', function () {
        const title = $(this).data('title');
        const desc = $(this).data('desc');
        const date = $(this).data('date');
        const location = $(this).data('location');
        alert(`Event: ${title}\nDate: ${date}\nLocation: ${location}\n\n${desc}`);
    });

    // Animate Progress Bars on scroll
    const participationSection = $('.participation-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.progress-bar').each(function () {
                    const value = $(this).attr('aria-valuenow');
                    $(this).css({ width: '0%' }).animate({ width: value + '%' }, 1000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (participationSection.length) {
        observer.observe(participationSection[0]);
    }

    // Hover effects on activity cards
    $(document).on('mouseenter', '.activities-item', function () {
        $(this).find('.activities-overlay').css('opacity', '1');
    }).on('mouseleave', '.activities-item', function () {
        $(this).find('.activities-overlay').css('opacity', '0.8');
    });

    // Bootstrap carousel autoplay control
    const carouselElement = $('#eventCarousel');
    if (carouselElement.length) {
        const carousel = new bootstrap.Carousel(carouselElement[0], {
            interval: 5000
        });

        const carouselObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    carousel.cycle();
                } else {
                    carousel.pause();
                }
            });
        }, { threshold: 0.1 });

        carouselObserver.observe(carouselElement[0]);
    }
});
