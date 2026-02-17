// Form Validations
document.addEventListener('DOMContentLoaded', function() {
    // Generic form validation
    const validateForm = (formId, requiredFields) => {
        const form = document.getElementById(formId);
        if (!form) return true;
        
        let isValid = true;
        const errors = [];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                isValid = false;
                // Safely get field label
                const label = field.previousElementSibling?.textContent || 
                             field.placeholder || 
                             field.name || 
                             field.id;
                errors.push(`${label} is required`);
                field.classList.add('input-error');
            } else if (field) {
                field.classList.remove('input-error');
            }
        });
        
        if (!isValid) {
            showMessage(errors.join(', '), 'error');
        }
        
        return isValid;
    };

    // Add Book Form Validation
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = ['bookName', 'bookAuthor', 'bookCategory', 'bookQuantity'];
            if (validateForm('addBookForm', requiredFields)) {
                showMessage('Book added successfully!', 'success');
                setTimeout(() => this.reset(), 1500);
            }
        });
    }

    // Add Member Form Validation
    const addMemberForm = document.getElementById('addMemberForm');
    if (addMemberForm) {
        addMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check radio button selection
            const membershipType = document.querySelector('input[name="membershipType"]:checked');
            if (!membershipType) {
                showMessage('Please select a membership duration (6 months, 1 year, or 2 years)', 'error');
                return;
            }
            
            const requiredFields = ['memberFirstName', 'memberLastName', 'memberContact', 'memberAadhar'];
            if (validateForm('addMemberForm', requiredFields)) {
                showMessage('Member added successfully!', 'success');
                setTimeout(() => this.reset(), 1500);
            }
        });
    }

    // Update Member Form Validation
    const updateMemberForm = document.getElementById('updateMemberForm');
    if (updateMemberForm) {
        updateMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const membershipNo = document.getElementById('updateMemberId').value;
            if (!membershipNo) {
                showMessage('Membership Number is required!', 'error');
                return;
            }
            
            // Check if extension radio button is selected
            const extensionType = document.querySelector('input[name="membershipExtension"]:checked');
            if (!extensionType) {
                showMessage('Please select membership extension option!', 'error');
                return;
            }
            
            showMessage('Member information updated successfully!', 'success');
            setTimeout(() => this.reset(), 1500);
        });
    }

    // Add User Form Validation
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check user type radio button
            const userType = document.querySelector('input[name="userType"]:checked');
            if (!userType) {
                showMessage('Please select user type (New User or Existing User)!', 'error');
                return;
            }
            
            const requiredFields = ['userName'];
            if (validateForm('addUserForm', requiredFields)) {
                showMessage('User added/updated successfully!', 'success');
                setTimeout(() => this.reset(), 1500);
            }
        });
    }

    // Add Book/Movie Form Validation
    const addItemForm = document.getElementById('addItemForm');
    if (addItemForm) {
        addItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check item type radio button
            const itemType = document.querySelector('input[name="itemType"]:checked');
            if (!itemType) {
                showMessage('Please select item type (Book or Movie)!', 'error');
                return;
            }
            
            const requiredFields = ['itemName', 'procurementDate', 'itemQuantity'];
            if (validateForm('addItemForm', requiredFields)) {
                showMessage(`${itemType.value} added successfully!`, 'success');
                setTimeout(() => this.reset(), 1500);
            }
        });
    }
});

// Message display function (if not already defined in auth.js)
function showMessage(message, type) {
    // Check if function already exists
    if (typeof window.showMessage === 'function') {
        window.showMessage(message, type);
        return;
    }
    
    // Create a simple alert if showMessage is not defined
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Add animation styles if not already present
    if (!document.querySelector('#messageStyles')) {
        const style = document.createElement('style');
        style.id = 'messageStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alertDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
}
