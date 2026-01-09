// Transactions Management
document.addEventListener('DOMContentLoaded', function() {
    // Sample book data
    const books = [
        { id: 1, name: "Introduction to Computer Science", author: "John Smith", serial: "SCB000001", category: "Science", available: true },
        { id: 2, name: "Economics for Beginners", author: "Alice Johnson", serial: "ECB000001", category: "Economics", available: true },
        { id: 3, name: "The Great Adventure", author: "Robert Brown", serial: "FCB000001", category: "Fiction", available: false },
        { id: 4, name: "Children's World", author: "Sarah Wilson", serial: "CHB000001", category: "Children", available: true },
        { id: 5, name: "Personal Growth", author: "Michael Davis", serial: "PDB000001", category: "Personal Development", available: true }
    ];

    // Sample issued books
    const issuedBooks = [
        { bookId: 3, memberId: "MEM001", issueDate: "2024-01-15", returnDate: "2024-01-30", actualReturn: null }
    ];

    // Book Availability Search
    const searchForm = document.getElementById('bookSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookName = document.getElementById('bookName').value.toLowerCase();
            const author = document.getElementById('author').value.toLowerCase();
            
            // Validate at least one field is filled
            if (!bookName && !author) {
                showMessage('Please enter either Book Name or Author to search.', 'error');
                return;
            }
            
            // Filter books based on search criteria
            const results = books.filter(book => {
                const matchesName = bookName ? book.name.toLowerCase().includes(bookName) : true;
                const matchesAuthor = author ? book.author.toLowerCase().includes(author) : true;
                return matchesName && matchesAuthor;
            });
            
            displaySearchResults(results);
        });
    }

    // Display search results
    function displaySearchResults(results) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No books found matching your criteria</h3>
                </div>
            `;
            return;
        }
        
        let html = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Serial Number</th>
                        <th>Category</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        results.forEach(book => {
            html += `
                <tr>
                    <td>
                        <input type="radio" name="selectedBook" value="${book.id}" 
                               data-book='${JSON.stringify(book)}' 
                               ${!book.available ? 'disabled' : ''}>
                    </td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.serial}</td>
                    <td>${book.category}</td>
                    <td>
                        <span class="${book.available ? 'status-active' : 'status-inactive'}">
                            ${book.available ? 'Yes' : 'No'}
                        </span>
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table>`;
        resultsContainer.innerHTML = html;
        
        // Add radio button selection handler
        const radioButtons = resultsContainer.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    const bookData = JSON.parse(this.dataset.book);
                    populateBookIssueForm(bookData);
                }
            });
        });
    }

    // Populate book issue form
    function populateBookIssueForm(book) {
        const issueForm = document.getElementById('bookIssueForm');
        if (!issueForm) return;
        
        // Calculate dates
        const today = new Date().toISOString().split('T')[0];
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 15);
        const returnDateStr = returnDate.toISOString().split('T')[0];
        
        // Populate form fields
        document.getElementById('issueBookName').value = book.name;
        document.getElementById('issueAuthor').value = book.author;
        document.getElementById('issueDate').value = today;
        document.getElementById('returnDate').value = returnDateStr;
        document.getElementById('issueSerial').value = book.serial;
        
        // Enable confirm button
        const confirmBtn = issueForm.querySelector('.btn-primary');
        if (confirmBtn) {
            confirmBtn.disabled = false;
        }
    }

    // Book Issue Form Submission
    const issueForm = document.getElementById('bookIssueForm');
    if (issueForm) {
        issueForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookName = document.getElementById('issueBookName').value;
            const issueDate = document.getElementById('issueDate').value;
            const returnDate = document.getElementById('returnDate').value;
            
            // Validations
            if (!bookName) {
                showMessage('Book Name is required!', 'error');
                return;
            }
            
            if (new Date(issueDate) < new Date()) {
                showMessage('Issue Date cannot be in the past!', 'error');
                return;
            }
            
            if (new Date(returnDate) < new Date(issueDate)) {
                showMessage('Return Date must be after Issue Date!', 'error');
                return;
            }
            
            // Success
            showMessage('Book issued successfully!', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                issueForm.reset();
                window.location.href = 'transactions.html';
            }, 2000);
        });
    }

    // Book Return Form
    const returnForm = document.getElementById('bookReturnForm');
    if (returnForm) {
        returnForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const bookName = document.getElementById('returnBookName').value;
            const serialNo = document.getElementById('returnSerial').value;
            const actualReturn = document.getElementById('actualReturnDate').value || new Date().toISOString().split('T')[0];
            
            // Validations
            if (!bookName || !serialNo) {
                showMessage('Book Name and Serial Number are required!', 'error');
                return;
            }
            
            // Calculate fine if any
            const issueDate = document.getElementById('returnIssueDate').value;
            const expectedReturn = document.getElementById('expectedReturnDate').value;
            
            let fine = 0;
            if (new Date(actualReturn) > new Date(expectedReturn)) {
                const daysLate = Math.ceil((new Date(actualReturn) - new Date(expectedReturn)) / (1000 * 60 * 60 * 24));
                fine = daysLate * 10; // ₹10 per day fine
            }
            
            // Store fine calculation
            sessionStorage.setItem('pendingFine', fine);
            sessionStorage.setItem('returnBookData', JSON.stringify({
                bookName,
                serialNo,
                issueDate,
                expectedReturn,
                actualReturn,
                fine
            }));
            
            // Redirect to fine payment page
            showMessage('Book return processed. Redirecting to fine payment...', 'success');
            setTimeout(() => {
                window.location.href = 'pay_fine.html';
            }, 1500);
        });
    }

    // Fine Payment Form
    const fineForm = document.getElementById('finePaymentForm');
    if (fineForm) {
        // Populate form with return data
        const returnData = JSON.parse(sessionStorage.getItem('returnBookData') || '{}');
        const pendingFine = parseFloat(sessionStorage.getItem('pendingFine') || 0);
        
        if (returnData.bookName) {
            document.getElementById('fineBookName').value = returnData.bookName;
            document.getElementById('fineAuthor').value = returnData.author || "Author Name";
            document.getElementById('fineSerial').value = returnData.serialNo;
            document.getElementById('fineIssueDate').value = returnData.issueDate;
            document.getElementById('fineExpectedReturn').value = returnData.expectedReturn;
            document.getElementById('fineActualReturn').value = returnData.actualReturn;
            document.getElementById('fineCalculated').value = `₹${pendingFine}`;
        }
        
        fineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const finePaid = document.getElementById('finePaid').checked;
            
            // Validation for pending fine
            if (pendingFine > 0 && !finePaid) {
                showMessage('Please check "Fine Paid" checkbox to complete the transaction.', 'error');
                return;
            }
            
            // Success
            showMessage('Transaction completed successfully! Book returned.', 'success');
            
            // Clear session storage
            sessionStorage.removeItem('pendingFine');
            sessionStorage.removeItem('returnBookData');
            
            // Reset form after delay
            setTimeout(() => {
                fineForm.reset();
                window.location.href = 'transactions.html';
            }, 2000);
        });
    }

    // Initialize date pickers
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
        input.min = today;
    });

    // Auto-fill author based on book selection
    const bookSelect = document.getElementById('returnBookSelect');
    if (bookSelect) {
        bookSelect.addEventListener('change', function() {
            const bookId = this.value;
            const book = books.find(b => b.id == bookId);
            if (book) {
                document.getElementById('returnAuthor').value = book.author;
                document.getElementById('returnSerial').value = book.serial;
            }
        });
    }
});

// Helper function to show messages
function showMessage(message, type) {
    // Implementation similar to auth.js
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message); // Simplified for this example
}