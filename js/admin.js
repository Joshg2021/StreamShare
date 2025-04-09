/**
 * Admin panel functionality for StreamShare Website
 * Handles email collection management and admin panel controls
 */

(function() {
    'use strict';
    
    // DOM Elements
    const adminPanel = document.getElementById('admin-panel');
    const emailList = document.getElementById('email-list');
    const exportEmailsBtn = document.getElementById('export-emails');
    const clearEmailsBtn = document.getElementById('clear-emails');
    const closeAdminBtn = document.getElementById('close-admin');
    
    // Constants
    const STORAGE_KEY = 'streamshare-emails';
    const KEY_SEQUENCE_TIMEOUT = 2000; // 2 seconds
    const REQUIRED_KEY_COUNT = 3;
    
    // State variables for admin panel activation
    let keyPressCount = 0;
    let lastKeyPressTime = 0;
    
    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', init);
    
    /**
     * Initialize all admin functionality
     */
    function init() {
        // Secret key sequence listener
        document.addEventListener('keydown', handleSecretKeySequence);
        
        // Admin panel button handlers
        if (exportEmailsBtn) {
            exportEmailsBtn.addEventListener('click', exportEmails);
        }
        
        if (clearEmailsBtn) {
            clearEmailsBtn.addEventListener('click', clearEmails);
        }
        
        if (closeAdminBtn) {
            closeAdminBtn.addEventListener('click', closeAdminPanel);
        }
    }
    
    /**
     * Handle the secret key sequence to show admin panel (AAA)
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleSecretKeySequence(event) {
        if (event.key.toLowerCase() === 'a') {
            const currentTime = new Date().getTime();
            
            if (currentTime - lastKeyPressTime < KEY_SEQUENCE_TIMEOUT) {
                keyPressCount++;
            } else {
                keyPressCount = 1;
            }
            
            lastKeyPressTime = currentTime;
            
            if (keyPressCount === REQUIRED_KEY_COUNT) {
                keyPressCount = 0;
                toggleAdminPanel();
            }
        }
    }
    
    /**
     * Toggle admin panel visibility and update content
     */
    function toggleAdminPanel() {
        if (!adminPanel) return;
        
        const isVisible = adminPanel.style.display === 'block';
        
        if (!isVisible) {
            displayEmails();
        }
        
        adminPanel.style.display = isVisible ? 'none' : 'block';
    }
    
    /**
     * Close the admin panel
     */
    function closeAdminPanel() {
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
    }
    
    /**
     * Display collected emails in the admin panel
     */
    function displayEmails() {
        if (!emailList) return;
        
        // Get saved emails
        const savedEmails = getSavedEmails();
        
        // Clear current list
        emailList.innerHTML = '';
        
        // Add each email to the list
        if (savedEmails.length === 0) {
            addEmailToList('No emails collected yet');
        } else {
            savedEmails.forEach(email => {
                addEmailToList(email);
            });
        }
    }
    
    /**
     * Add an email to the display list
     * @param {string} email - The email to display
     */
    function addEmailToList(email) {
        const emailItem = document.createElement('div');
        emailItem.className = 'email-item';
        emailItem.textContent = email;
        emailList.appendChild(emailItem);
    }
    
    /**
     * Get saved emails from local storage
     * @returns {Array} - Array of saved emails
     */
    function getSavedEmails() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }
    
    /**
     * Export emails as a CSV file
     */
    function exportEmails() {
        const savedEmails = getSavedEmails();
        
        if (savedEmails.length === 0) {
            alert('No emails to export!');
            return;
        }
        
        try {
            // Create CSV content
            const csvContent = 'data:text/csv;charset=utf-8,' + savedEmails.join('\n');
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'streamshare-emails.csv');
            document.body.appendChild(link);
            
            // Trigger download
            link.click();
            
            // Clean up
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting emails:', error);
            alert('There was an error exporting the emails. Please try again.');
        }
    }
    
    /**
     * Clear all saved emails after confirmation
     */
    function clearEmails() {
        if (confirm('Are you sure you want to delete all collected emails? This cannot be undone.')) {
            localStorage.removeItem(STORAGE_KEY);
            displayEmails();
            alert('All emails have been deleted.');
        }
    }
})();
