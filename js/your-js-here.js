// JavaScript Document

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById('toggle-mobile');
    const nav = document.getElementById('header-nav');
    function updateToggleButtonVisibility() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = "block"; 
            nav.style.display = "none"; 
        } else {
            navToggle.style.display = "none";
            nav.style.display = "flex";
        }
    }

    updateToggleButtonVisibility();
    window.addEventListener('resize', updateToggleButtonVisibility);
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        if (isExpanded) {
            nav.style.display = "none";
            navToggle.textContent = "Show Navigation";
        } else {
            nav.style.display = "flex";
            navToggle.textContent = "Hide Navigation";
        }
    });


    // MODAL Functionality
    const modal = document.getElementById("modal");
    const modalTrigger = document.querySelector(".modal-trigger");
    const closeModal = document.querySelector(".close-modal");
    const overlay = document.querySelector(".overlay");

    
    modalTrigger.addEventListener("click", () => {
        modal.style.display = "block"; 
        overlay.style.display = "block"; 
        modal.focus(); 
        trapFocus(modal); 
    });

    
    closeModal.addEventListener("click", closeModalFunction);

    
    overlay.addEventListener("click", closeModalFunction);

    // Trap functionality
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        
        firstElement.focus();

        element.addEventListener('keydown', function(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { 
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // Close modal 
    function closeModalFunction() {
        modal.style.display = "none"; 
        overlay.style.display = "none"; 
        modal.removeEventListener('keydown', trapFocus); 
    }
});