// js/main.js - Common Library Storage Management

const LibraryStorage = {
    // Initialize library storage
    init() {
        // Initialize books if not exists
        if (!localStorage.getItem('libraryBooks')) {
            const defaultBooks = [
                { 
                    id: 1, 
                    name: "Introduction to Computer Science", 
                    author: "John Smith", 
                    category: "Science", 
                    serial: "CS001", 
                    status: "Available",
                    procurementDate: "2024-01-01",
                    addedDate: new Date().toISOString()
                },
                { 
                    id: 2, 
                    name: "Economics for Beginners", 
                    author: "Jane Doe", 
                    category: "Economics", 
                    serial: "ECO001", 
                    status: "Available",
                    procurementDate: "2024-01-05",
                    addedDate: new Date().toISOString()
                },
                { 
                    id: 3, 
                    name: "The Great Adventure", 
                    author: "Robert Johnson", 
                    category: "Fiction", 
                    serial: "FIC001", 
                    status: "Issued",
                    procurementDate: "2024-01-10",
                    addedDate: new Date().toISOString()
                },
                { 
                    id: 4, 
                    name: "Children's Encyclopedia", 
                    author: "Sarah Williams", 
                    category: "Children", 
                    serial: "CHI001", 
                    status: "Available",
                    procurementDate: "2024-01-15",
                    addedDate: new Date().toISOString()
                }
            ];
            localStorage.setItem('libraryBooks', JSON.stringify(defaultBooks));
        }
        
        // Initialize members if not exists
        if (!localStorage.getItem('libraryMembers')) {
            const defaultMembers = [
                { 
                    id: 1, 
                    name: "John Doe", 
                    email: "john@example.com", 
                    phone: "1234567890", 
                    membershipId: "MEM001",
                    status: "Active",
                    joinDate: "2024-01-01"
                }
            ];
            localStorage.setItem('libraryMembers', JSON.stringify(defaultMembers));
        }
        
        console.log("Library storage initialized");
    },
    
    // Get all books (same for both admin and user)
    getBooks() {
        const books = JSON.parse(localStorage.getItem('libraryBooks') || '[]');
        console.log("Retrieved books:", books.length);
        return books;
    },
    
    // Add new book (admin only)
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
    
    // Update book (admin only)
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
    
    // Delete book (admin only)
    deleteBook(bookId) {
        const books = this.getBooks();
        const filteredBooks = books.filter(b => b.id != bookId);
        localStorage.setItem('libraryBooks', JSON.stringify(filteredBooks));
        console.log("Book deleted:", bookId);
        return true;
    },
    
    // Get all members (admin only)
    getMembers() {
        return JSON.parse(localStorage.getItem('libraryMembers') || '[]');
    },
    
    // Add new member (admin only)
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
    
    // Get movies (if any)
    getMovies() {
        return JSON.parse(localStorage.getItem('libraryMovies') || '[]');
    },
    
    // Search books (both admin and user)
    searchBooks(query) {
        const books = this.getBooks();
        const searchTerm = query.toLowerCase();
        
        return books.filter(book => 
            book.name.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm) ||
            book.serial.toLowerCase().includes(searchTerm)
        );
    },
    
    // Get books by category (both admin and user)
    getBooksByCategory(category) {
        const books = this.getBooks();
        return books.filter(book => book.category === category);
    },
    
    // Get available books (user view)
    getAvailableBooks() {
        const books = this.getBooks();
        return books.filter(book => book.status === 'Available');
    },
    
    // Get book by ID (both admin and user)
    getBookById(bookId) {
        const books = this.getBooks();
        return books.find(book => book.id == bookId);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    LibraryStorage.init();
});



// main.js के अंत में ये functions add करें:

// User Issue Management System
const UserIssues = {
    getIssues() {
        const userId = sessionStorage.getItem('userId') || 'user1';
        return JSON.parse(localStorage.getItem(`userIssues_${userId}`) || '[]');
    },
    
    getHistory() {
        const userId = sessionStorage.getItem('userId') || 'user1';
        return JSON.parse(localStorage.getItem(`userHistory_${userId}`) || '[]');
    },
    
    addIssue(book) {
        const userId = sessionStorage.getItem('userId') || 'user1';
        const issues = this.getIssues();
        const history = this.getHistory();
        
        const issueId = issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1;
        
        const issueDate = new Date().toISOString().split('T')[0];
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 14 days issue period
        
        const newIssue = {
            id: issueId,
            bookId: book.id,
            bookName: book.name,
            bookAuthor: book.author,
            bookSerial: book.serial,
            userId: userId,
            userName: sessionStorage.getItem('userName') || 'User',
            issueDate: issueDate,
            dueDate: dueDate.toISOString().split('T')[0],
            status: 'Active',
            fineAmount: 0,
            finePaid: 0
        };
        
        issues.push(newIssue);
        localStorage.setItem(`userIssues_${userId}`, JSON.stringify(issues));
        
        // Add to history
        history.push({
            ...newIssue,
            historyId: history.length + 1,
            action: 'Issued',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(`userHistory_${userId}`, JSON.stringify(history));
        
        return newIssue;
    },
    
    returnIssue(issueId) {
        const userId = sessionStorage.getItem('userId') || 'user1';
        const issues = this.getIssues();
        const history = this.getHistory();
        
        const issueIndex = issues.findIndex(i => i.id == issueId);
        if (issueIndex === -1) return false;
        
        const issue = issues[issueIndex];
        
        // Calculate fine if overdue
        const today = new Date();
        const dueDate = new Date(issue.dueDate);
        let fine = 0;
        
        if (today > dueDate) {
            const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
            fine = daysOverdue * 10; // ₹10 per day fine
        }
        
        // Update issue
        issues[issueIndex].status = 'Returned';
        issues[issueIndex].fineAmount = fine;
        localStorage.setItem(`userIssues_${userId}`, JSON.stringify(issues));
        
        // Add to history
        history.push({
            ...issue,
            historyId: history.length + 1,
            action: 'Returned',
            finePaid: fine,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(`userHistory_${userId}`, JSON.stringify(history));
        
        return true;
    }
};

// Export to global scope
window.UserIssues = UserIssues;