/**
 * Main JavaScript for StreamShare Website
 * Handles form submissions, modals, smooth scrolling, and floating CTA
 */

(function() {
    'use strict';

    // DOM Elements
    const modal = document.getElementById('thank-you-modal');
    const heroForm = document.getElementById('hero-form');
    const ctaForm = document.getElementById('cta-form');
    const closeBtns = document.querySelectorAll('.close-modal, #close-modal-btn');
    const floatingCta = document.getElementById('floating-cta');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Constants
    const STORAGE_KEY = 'streamshare-emails';
    
    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', init);
    
    /**
     * Initialize all event listeners and functionality
     */
    function init() {
        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }
        
        // Form submissions
        if (heroForm) {
            heroForm.addEventListener('submit', handleFormSubmit);
        }
        
        if (ctaForm) {
            ctaForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Modal close buttons
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // Smooth scroll for anchor links
        setupSmoothScroll();
        
        // Floating CTA visibility
        if (floatingCta) {
            window.addEventListener('scroll', toggleFloatingCta);
        }
    }
    
    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
    }
    
    /**
     * Handle form submission and save email
     * @param {Event} event - The form submission event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        if (email) {
            saveEmail(email);
            showModal();
            this.reset();
        }
    }
    
    /**
     * Save email to localStorage
     * @param {string} email - The email to save
     * @returns {Array} - Array of all saved emails
     */
    function saveEmail(email) {
        // Get existing emails or create empty array
        let savedEmails = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        
        // Check if email already exists to avoid duplicates
        if (!savedEmails.includes(email)) {
            // Add new email
            savedEmails.push(email);
            
            // Save back to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedEmails));
            
            console.log('Email collected:', email);
        }
        
        return savedEmails;
    }
    
    /**
     * Show the thank you modal
     */
    function showModal() {
        if (modal) {
            modal.style.display = 'block';
        }
    }
    
    /**
     * Close the thank you modal
     */
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    /**
     * Toggle floating CTA visibility based on scroll position
     */
    function toggleFloatingCta() {
        if (!floatingCta) return;
        
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const footerPosition = footer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (footerPosition < screenPosition) {
            floatingCta.style.display = 'none';
        } else {
            floatingCta.style.display = 'block';
        }
    }
})();
