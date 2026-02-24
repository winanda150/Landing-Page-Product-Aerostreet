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
