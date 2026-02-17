// js/main.js - Complete Library Storage Management

const LibraryStorage = {
    // Initialize library storage
    init() {
        console.log("Initializing library storage...");
        
        // Initialize books if not exists
        if (!localStorage.getItem('libraryBooks')) {
            const defaultBooks = [
                { 
                    id: 1, 
                    name: "Introduction to Computer Science", 
                    author: "John Smith", 
                    category: "Science", 
                    copies: 5,
                    quantity: 5,
                    status: "Available",
                    serial: "SCB000001",
                    procurementDate: "2024-01-01",
                    addedDate: new Date().toISOString(),
                    cost: "500"
                },
                { 
                    id: 2, 
                    name: "Economics for Beginners", 
                    author: "Jane Doe", 
                    category: "Economics", 
                    copies: 3,
                    quantity: 3,
                    status: "Available",
                    serial: "ECB000001",
                    procurementDate: "2024-01-05",
                    addedDate: new Date().toISOString(),
                    cost: "450"
                },
                { 
                    id: 3, 
                    name: "The Great Adventure", 
                    author: "Robert Johnson", 
                    category: "Fiction", 
                    copies: 2,
                    quantity: 0,
                    status: "Issued",
                    serial: "FCB000001",
                    procurementDate: "2024-01-10",
                    addedDate: new Date().toISOString(),
                    cost: "350"
                },
                { 
                    id: 4, 
                    name: "Web Development Basics", 
                    author: "Robert Brown", 
                    category: "Science", 
                    copies: 4,
                    quantity: 4,
                    status: "Available",
                    serial: "SCB000002",
                    procurementDate: "2024-01-10",
                    addedDate: new Date().toISOString(),
                    cost: "600"
                },
                { 
                    id: 5, 
                    name: "JavaScript Programming", 
                    author: "Sarah Wilson", 
                    category: "Science", 
                    copies: 2,
                    quantity: 2,
                    status: "Available",
                    serial: "SCB000003",
                    procurementDate: "2024-01-15",
                    addedDate: new Date().toISOString(),
                    cost: "550"
                }
            ];
            localStorage.setItem('libraryBooks', JSON.stringify(defaultBooks));
            console.log("Default books added:", defaultBooks.length);
        }
        
        // Initialize members if not exists
        if (!localStorage.getItem('libraryMembers')) {
            const defaultMembers = [
                { 
                    id: 1, 
                    firstName: "John",
                    lastName: "Doe",
                    contactNumber: "9876543210",
                    email: "john@example.com",
                    address: "123 Main Street, City",
                    aadharNumber: "123456789012",
                    membershipDuration: "6",
                    startDate: "2024-01-01",
                    endDate: "2024-07-01",
                    fee: "₹500",
                    status: "Active",
                    membershipId: "MEM000123"
                }
            ];
            localStorage.setItem('libraryMembers', JSON.stringify(defaultMembers));
            console.log("Default members added:", defaultMembers.length);
        }
        
        // Initialize movies if not exists
        if (!localStorage.getItem('libraryMovies')) {
            localStorage.setItem('libraryMovies', JSON.stringify([]));
        }
        
        // Initialize issues if not exists
        if (!localStorage.getItem('libraryIssues')) {
            const defaultIssues = [
                {
                    id: 1,
                    bookId: 3,
                    bookName: "The Great Adventure",
                    bookAuthor: "Robert Johnson",
                    bookSerial: "FCB000001",
                    memberId: "MEM000123",
                    memberName: "Library User",
                    issueDate: "2024-01-20",
                    dueDate: "2024-02-04",
                    returnDate: null,
                    status: "Active",
                    fineAmount: 0,
                    finePaid: 0,
                    remarks: "Sample issue"
                }
            ];
            localStorage.setItem('libraryIssues', JSON.stringify(defaultIssues));
            console.log("Default issues added:", defaultIssues.length);
        }
        
        console.log("Library storage initialized successfully");
    },
    
    // Get all books
    getBooks() {
        const books = JSON.parse(localStorage.getItem('libraryBooks') || '[]');
        return books;
    },
    
    // Add new book
    addBook(book) {
        const books = this.getBooks();
        
        // Generate new ID
        const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
        
        const newBook = {
            ...book,
            id: newId,
            status: "Available",
            addedDate: new Date().toISOString()
        };
        
        books.push(newBook);
        localStorage.setItem('libraryBooks', JSON.stringify(books));
        
        console.log("Book added:", newBook);
        return newBook;
    },
    
    // Update book
    updateBook(bookId, updates) {
        const books = this.getBooks();
        const index = books.findIndex(b => b.id == bookId);
        
        if (index !== -1) {
            books[index] = { ...books[index], ...updates };
            localStorage.setItem('libraryBooks', JSON.stringify(books));
            console.log("Book updated:", books[index]);
            return books[index];
        }
        
        return null;
    },
    
    // Delete book
    deleteBook(bookId) {
        const books = this.getBooks();
        const filteredBooks = books.filter(b => b.id != bookId);
        localStorage.setItem('libraryBooks', JSON.stringify(filteredBooks));
        console.log("Book deleted:", bookId);
        return true;
    },
    
    // Get all members
    getMembers() {
        const members = JSON.parse(localStorage.getItem('libraryMembers') || '[]');
        return members;
    },
    
    // Add new member
    addMember(member) {
        const members = this.getMembers();
        
        // Generate new ID
        const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
        
        const newMember = {
            ...member,
            id: newId,
            status: "Active",
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        members.push(newMember);
        localStorage.setItem('libraryMembers', JSON.stringify(members));
        
        console.log("Member added:", newMember);
        return newMember;
    },
    
    // Get movies
    getMovies() {
        const movies = JSON.parse(localStorage.getItem('libraryMovies') || '[]');
        return movies;
    },
    
    // Add movie
    addMovie(movie) {
        const movies = this.getMovies();
        
        const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
        
        const newMovie = {
            ...movie,
            id: newId,
            status: "Available",
            addedDate: new Date().toISOString(),
            type: "movie"
        };
        
        movies.push(newMovie);
        localStorage.setItem('libraryMovies', JSON.stringify(movies));
        
        console.log("Movie added:", newMovie);
        return newMovie;
    },
    
    // Get all issues
    getIssues() {
        const issues = JSON.parse(localStorage.getItem('libraryIssues') || '[]');
        return issues;
    },
    
    // Add new issue
    addIssue(issue) {
        const issues = this.getIssues();
        
        const newId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
        
        const newIssue = {
            ...issue,
            id: newId,
            status: "Active",
            issueDate: issue.issueDate || new Date().toISOString().split('T')[0]
        };
        
        issues.push(newIssue);
        localStorage.setItem('libraryIssues', JSON.stringify(issues));
        
        console.log("Issue added:", newIssue);
        return newIssue;
    },
    
    // Search books
    searchBooks(query) {
        const books = this.getBooks();
        const searchTerm = query.toLowerCase();
        
        return books.filter(book => 
            book.name.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm) ||
            (book.serial && book.serial.toLowerCase().includes(searchTerm))
        );
    },
    
    // Get books by category
    getBooksByCategory(category) {
        const books = this.getBooks();
        return books.filter(book => book.category === category);
    },
    
    // Get available books
    getAvailableBooks() {
        const books = this.getBooks();
        return books.filter(book => book.status === 'Available');
    },
    
    // Get book by ID
    getBookById(bookId) {
        const books = this.getBooks();
        return books.find(book => book.id == bookId);
    },
    
    // Get book by serial
    getBookBySerial(serial) {
        const books = this.getBooks();
        return books.find(book => book.serial === serial);
    },
    
    // Get active issues
    getActiveIssues() {
        const issues = this.getIssues();
        return issues.filter(issue => issue.status === 'Active');
    },
    
    // Get overdue issues
    getOverdueIssues() {
        const issues = this.getIssues();
        const today = new Date().toISOString().split('T')[0];
        return issues.filter(issue => 
            issue.status === 'Active' && 
            issue.dueDate && 
            issue.dueDate < today
        );
    },
    
    // Get user's issues
    getUserIssues(memberId) {
        const issues = this.getIssues();
        return issues.filter(issue => issue.memberId === memberId && issue.status === 'Active');
    },
    
    // **FIXED: Issue a book by Serial Number**
    issueBook(bookSerial, memberId, memberName, dueDate, remarks = "") {
        console.log("Issuing book:", { bookSerial, memberId, memberName, dueDate });
        
        // Get books
        const books = this.getBooks();
        console.log("Total books:", books.length);
        
        // Find the book by serial
        const book = books.find(b => b.serial === bookSerial);
        if (!book) {
            console.error("Book not found with serial:", bookSerial);
            alert("Book not found with serial: " + bookSerial);
            return null;
        }
        
        console.log("Found book:", book);
        
        if (book.status !== 'Available') {
            alert(`Book "${book.name}" is not available. Current status: ${book.status}`);
            return null;
        }
        
        if (book.quantity <= 0) {
            alert(`No copies available for "${book.name}"`);
            return null;
        }
        
        // Update book status
        book.status = 'Issued';
        book.quantity = book.quantity - 1;
        
        // Save updated books
        localStorage.setItem('libraryBooks', JSON.stringify(books));
        console.log("Book status updated to Issued");
        
        // Create issue record
        const issues = this.getIssues();
        const newIssueId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
        
        const newIssue = {
            id: newIssueId,
            bookId: book.id,
            bookName: book.name,
            bookAuthor: book.author,
            bookSerial: bookSerial,
            memberId: memberId,
            memberName: memberName,
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: dueDate,
            returnDate: null,
            status: "Active",
            fineAmount: 0,
            finePaid: 0,
            remarks: remarks,
            createdAt: new Date().toISOString()
        };
        
        issues.push(newIssue);
        localStorage.setItem('libraryIssues', JSON.stringify(issues));
        
        console.log("New issue created:", newIssue);
        return newIssue;
    },
    
    // **NEW: Issue book by Book ID (Alternative method)**
    issueBookById(bookId, memberId, memberName, dueDate, remarks = "") {
        console.log("Issuing book by ID:", bookId);
        
        // Get the book by ID first
        const book = this.getBookById(bookId);
        if (!book) {
            alert("Book not found!");
            return null;
        }
        
        // Then use the serial number to issue
        return this.issueBook(book.serial, memberId, memberName, dueDate, remarks);
    },
    
    // Return a book
    returnBook(issueId, actualReturnDate, remarks = "") {
        const issues = this.getIssues();
        const issueIndex = issues.findIndex(issue => issue.id == issueId);
        
        if (issueIndex === -1) return null;
        
        const issue = issues[issueIndex];
        
        // Update book status
        const books = this.getBooks();
        const bookIndex = books.findIndex(book => book.serial === issue.bookSerial);
        if (bookIndex !== -1) {
            books[bookIndex].status = 'Available';
            books[bookIndex].quantity += 1;
            localStorage.setItem('libraryBooks', JSON.stringify(books));
        }
        
        // Calculate fine if overdue
        let fine = 0;
        if (actualReturnDate > issue.dueDate) {
            const daysOverdue = Math.ceil(
                (new Date(actualReturnDate) - new Date(issue.dueDate)) / 
                (1000 * 60 * 60 * 24)
            );
            fine = daysOverdue * 10; // ₹10 per day
        }
        
        // Update issue
        issues[issueIndex].returnDate = actualReturnDate;
        issues[issueIndex].status = 'Returned';
        issues[issueIndex].fineAmount = fine;
        issues[issueIndex].remarks = remarks;
        
        localStorage.setItem('libraryIssues', JSON.stringify(issues));
        
        console.log("Book returned:", issues[issueIndex]);
        return issues[issueIndex];
    },
    
    // Generate serial number
    generateSerialNumber(category, type) {
        const categoryCodes = {
            'Science': 'SC',
            'Economics': 'EC', 
            'Fiction': 'FC',
            'Children': 'CH',
            'Personal Development': 'PD',
            'Educational': 'ED',
            'Entertainment': 'EN'
        };
        
        const code = categoryCodes[category] || 'XX';
        const books = this.getBooks();
        const movies = this.getMovies();
        
        // Find highest serial number
        let maxNumber = 0;
        const allItems = [...books, ...movies];
        
        allItems.forEach(item => {
            if (item.serial && item.serial.startsWith(code)) {
                const serialStr = item.serial.substring(code.length + 1);
                const num = parseInt(serialStr) || 0;
                if (num > maxNumber) maxNumber = num;
            }
        });
        
        const nextNumber = (maxNumber + 1).toString().padStart(6, '0');
        return `${code}${type === 'book' ? 'B' : 'M'}${nextNumber}`;
    },
    
    // Get statistics
    getStats() {
        const books = this.getBooks();
        const members = this.getMembers();
        const issues = this.getActiveIssues();
        
        const totalBooks = books.length;
        const availableBooks = books.filter(b => b.status === 'Available').length;
        const issuedBooks = books.filter(b => b.status === 'Issued').length;
        const totalMembers = members.filter(m => m.status === 'Active').length;
        
        // Calculate pending fines
        let pendingFines = 0;
        const today = new Date().toISOString().split('T')[0];
        
        issues.forEach(issue => {
            if (issue.dueDate < today) {
                const daysOverdue = Math.ceil(
                    (new Date(today) - new Date(issue.dueDate)) / 
                    (1000 * 60 * 60 * 24)
                );
                pendingFines += daysOverdue * 10;
            }
        });
        
        return {
            totalBooks,
            availableBooks,
            issuedBooks,
            totalMembers,
            pendingFines,
            activeIssues: issues.length
        };
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing LibraryStorage...");
    LibraryStorage.init();
});

// Make LibraryStorage available globally
window.LibraryStorage = LibraryStorage;
