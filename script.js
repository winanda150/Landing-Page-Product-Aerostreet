const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileDropdown = document.getElementById("mobileDropdown");

mobileMenuBtn.addEventListener("click", function () {
    mobileMenuBtn.classList.toggle("active");
    
    if (mobileDropdown.classList.contains("active")) {
        mobileDropdown.classList.add("closing");
        
        setTimeout(function() {
            mobileDropdown.classList.remove("active");
            mobileDropdown.classList.remove("closing");
        }, 300);
    } else {
        mobileDropdown.classList.add("active");
    }
});

const mobileMenuLinks = document.querySelectorAll(".Mobile-Menu li a");
mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
        mobileDropdown.classList.add("closing");
        mobileMenuBtn.classList.remove("active");
        
        setTimeout(function() {
            mobileDropdown.classList.remove("active");
            mobileDropdown.classList.remove("closing");
        }, 300);
    });
});

// Library initialization Swipper js
const swiper = new Swiper('.Products-Swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,

    // Autoplay configuration
    autoplay: {
        delay: 3000, // 3 detik
        disableOnInteraction: true, // Hentikan autoplay setelah interaksi pengguna
        pauseOnMouseEnter: true, // Jeda autoplay saat kursor berada di atas slider
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        // jika lebar layar >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // jika lebar layar >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // jika lebar layar >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

// Order Button Animation Logic
document.querySelectorAll('.truck-button').forEach(button => {
    button.addEventListener('click', e => {

        e.preventDefault();
        
        let box = button.querySelector('.box'),
            truck = button.querySelector('.truck');
        
        if(!button.classList.contains('done')) {
            
            if(!button.classList.contains('animation')) {

                button.classList.add('animation');

                gsap.to(button, {
                    '--box-s': 1,
                    '--box-o': 1,
                    duration: .3,
                    delay: .5
                });

                gsap.to(box, {
                    x: 0,
                    duration: .4,
                    delay: .7
                });

                gsap.to(button, {
                    '--hx': -5,
                    '--bx': 50,
                    duration: .18,
                    delay: .92
                });

                gsap.to(box, {
                    y: 0,
                    duration: .1,
                    delay: 1.15
                });

                gsap.set(button, {
                    '--truck-y': 0,
                    '--truck-y-n': -26
                });

                gsap.to(button, {
                    '--truck-y': 1,
                    '--truck-y-n': -25,
                    duration: .2,
                    delay: 1.25,
                    onComplete() {
                        gsap.timeline({
                            onComplete() {
                                button.classList.add('done');
                                // 1. Get the button's current height
                                const buttonHeight = button.offsetHeight;
                                // 2. Lock the height to prevent it from collapsing
                                button.style.height = `${buttonHeight}px`; // Lock height
                                button.style.position = 'relative'; // Set as positioning context
                                if (button.revertTimeout) {
                                    clearTimeout(button.revertTimeout);
                                }
                                let defaultSpan = button.querySelector('.default');
                                if (defaultSpan) {
                                    defaultSpan.outerHTML = `<span class="success" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; white-space: nowrap;">
                                        Cart Placed
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10" style="width: 12px; height: 10px; margin-left: 8px; transform: translateY(-2px); fill: none; stroke: #198754; stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0;">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </svg>
                                    </span>`;
                                }
                                button.revertTimeout = setTimeout(() => {
                                    if (button.classList.contains('done')) {
                                        let successSpan = button.querySelector('.success');
                                        if (successSpan) {
                                            successSpan.outerHTML = `<span class="default" style="display: inline-flex; align-items: center; gap: 8px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-shopping-cart w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true">
                                                    <circle cx="8" cy="21" r="1"></circle>
                                                    <circle cx="19" cy="21" r="1"></circle>
                                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                                </svg>
                                                <span>Add to Cart</span>
                                            </span>`;
                                        }
                                        button.classList.remove('animation', 'done');
                                        // 3. Remove the locked height when reverting
                                        button.style.height = ''; // Unlock height
                                        button.style.position = ''; // Remove positioning context
                                        button.style.removeProperty('cursor');
                                        gsap.set(truck, { x: 4 });
                                        gsap.set(button, { '--progress': 0, '--hx': 0, '--bx': 0, '--box-s': .5, '--box-o': 0, '--truck-y': 0, '--truck-y-n': -26 });
                                        gsap.set(box, { x: -24, y: -6 });
                                    }
                                }, 2000);
                            }
                        }).to(truck, { x: 0, duration: .4 })
                        .to(truck, { x: button.offsetWidth * 0.4, duration: 1 })
                        .to(truck, { x: button.offsetWidth * 0.25, duration: .6 })
                        .to(truck, { x: button.offsetWidth * 0.73, duration: .4 });
                        gsap.to(button, { '--progress': 1, duration: 2.4, ease: "power2.in" });
                    }
                });
            }
        }
    });
});