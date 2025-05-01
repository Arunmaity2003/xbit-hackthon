window.addEventListener('load', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = '../pages/login.html';
        return;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuContainer = document.getElementById('menuContainer');
    const menuItems = document.querySelectorAll('.menu-items li');
    const contentSections = document.querySelectorAll('.content-section');

    // Show menu
    hamburgerBtn.addEventListener('click', () => {
        menuOverlay.style.display = 'block';
        menuContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Hide menu
    function hideMenu() {
        menuOverlay.style.display = 'none';
        menuContainer.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', hideMenu);
    menuOverlay.addEventListener('click', hideMenu);

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.querySelector('a').getAttribute('href').substring(1);
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // Hide menu
            hideMenu();
        });
    });

    // Show dashboard by default
    const dashboardSection = document.getElementById('dashboard');
    dashboardSection.classList.add('active');

    // Library Search Functionality
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookItems = document.querySelectorAll('.book-item');

    // Sample book data (in a real application, this would come from a database)
    const books = [
        {
            title: 'Introduction to Algorithms',
            author: 'Thomas H. Cormen',
            category: 'Computer Science',
            available: true
        },
        {
            title: 'Clean Code',
            author: 'Robert C. Martin',
            category: 'Programming',
            available: true
        },
        {
            title: 'Design Patterns',
            author: 'Erich Gamma',
            category: 'Programming',
            available: false
        },
        {
            title: 'The Pragmatic Programmer',
            author: 'Andrew Hunt',
            category: 'Programming',
            available: true
        },
        {
            title: 'Computer Networks',
            author: 'Andrew Tanenbaum',
            category: 'Computer Science',
            available: true
        },
        {
            title: 'Operating Systems',
            author: 'Abraham Silberschatz',
            category: 'Computer Science',
            available: false
        }
    ];

    // Function to update book display
    function updateBookDisplay(filteredBooks) {
        const popularBooks = document.querySelector('.popular-books');
        popularBooks.innerHTML = '<div class="section-title">Popular Books</div>';
        
        filteredBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <div class="book-cover">
                    <i class="fas fa-book"></i>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-details">
                        <span class="book-category">${book.category}</span>
                        <span class="book-availability ${book.available ? 'available' : 'unavailable'}">
                            ${book.available ? 'Available' : 'Checked Out'}
                        </span>
                    </div>
                </div>
            `;
            popularBooks.appendChild(bookItem);
        });
    }

    // Function to filter books based on search and category
    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').textContent;
        
        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                book.author.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        
        updateBookDisplay(filteredBooks);
    }

    // Event listeners
    searchInput.addEventListener('input', filterBooks);
    searchBtn.addEventListener('click', filterBooks);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterBooks();
        });
    });

    // Initial display
    updateBookDisplay(books);

    // Payment System
    const paymentButtons = document.querySelectorAll('.pay-btn, .pay-fine-btn');

    // Payment modal elements
    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal';
    paymentModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Payment Details</h3>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="payment-info">
                    <div class="payment-amount">
                        <span>Amount to Pay:</span>
                        <span class="amount">$0.00</span>
                    </div>
                    <div class="payment-type">
                        <span>Payment Type:</span>
                        <span class="type">Fees</span>
                    </div>
                </div>
                <form class="payment-form">
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cardName">Cardholder Name</label>
                        <input type="text" id="cardName" placeholder="John Doe">
                    </div>
                    <button type="submit" class="submit-payment">Pay Now</button>
                </form>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(paymentModal);

    // Payment success message
    const successMessage = document.createElement('div');
    successMessage.className = 'payment-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Payment Successful!</h3>
            <p>Your payment has been processed successfully.</p>
            <button class="close-success">Close</button>
        </div>
    `;
    document.body.appendChild(successMessage);

    // Handle payment button clicks
    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.closest('.fees-total, .fine-total, .fines-summary')
                .querySelector('.total-amount').textContent;
            const type = button.classList.contains('pay-fine-btn') ? 'Library Fines' : 'Fees';
            
            // Update modal with payment details
            paymentModal.querySelector('.amount').textContent = amount;
            paymentModal.querySelector('.type').textContent = type;
            
            // Show modal
            paymentModal.style.display = 'flex';
        });
    });

    // Close modal
    paymentModal.querySelector('.close-modal').addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Close success message
    successMessage.querySelector('.close-success').addEventListener('click', () => {
        successMessage.style.display = 'none';
    });

    // Handle payment form submission
    paymentModal.querySelector('.payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate payment processing
        setTimeout(() => {
            // Hide payment modal
            paymentModal.style.display = 'none';
            
            // Show success message
            successMessage.style.display = 'flex';
            
            // Update payment status
            const button = document.activeElement.closest('.pay-btn, .pay-fine-btn');
            if (button.classList.contains('pay-fine-btn')) {
                // Update fines status
                const finesSummary = button.closest('.fines-summary');
                finesSummary.querySelectorAll('.fine-item').forEach(item => {
                    item.querySelector('.fine-amount').textContent = '$0.00';
                });
                finesSummary.querySelector('.total-amount').textContent = '$0.00';
                button.disabled = true;
                button.textContent = 'Paid';
            } else {
                // Update fees status
                const feesContainer = button.closest('.fees-container');
                feesContainer.querySelectorAll('.fee-status.pending').forEach(status => {
                    status.textContent = 'Paid';
                    status.classList.remove('pending');
                    status.classList.add('paid');
                });
                feesContainer.querySelector('.total-amount').textContent = '$0.00';
                button.disabled = true;
                button.textContent = 'Paid';
            }
        }, 1500);
    });

    // Add styles for payment modal and success message
    const paymentStyles = document.createElement('style');
    paymentStyles.textContent = `
        .payment-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
            margin: 0;
            color: #2c3e50;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
        }

        .modal-body {
            padding: 1.5rem;
        }

        .payment-info {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 4px;
        }

        .payment-amount, .payment-type {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }

        .payment-amount .amount {
            font-weight: 600;
            color: #2c3e50;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #666;
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #eee;
            border-radius: 4px;
            font-size: 1rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .submit-payment {
            width: 100%;
            padding: 0.75rem;
            background-color: #2c3e50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            margin-top: 1rem;
        }

        .submit-payment:hover {
            background-color: #1a252f;
        }

        .payment-success {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .success-content {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
        }

        .success-content i {
            font-size: 3rem;
            color: #28a745;
            margin-bottom: 1rem;
        }

        .success-content h3 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }

        .success-content p {
            color: #666;
            margin-bottom: 1.5rem;
        }

        .close-success {
            padding: 0.75rem 2rem;
            background-color: #2c3e50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        }

        .close-success:hover {
            background-color: #1a252f;
        }
    `;

    document.head.appendChild(paymentStyles);

    // Profile Edit and Image Upload Functionality
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const infoValues = document.querySelectorAll('.info-value');
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    const navLogo = document.querySelector('.nav-logo');

    // Store original values for cancel
    let originalValues = {};

    // Edit button click handler
    editBtn.addEventListener('click', () => {
        // Store original values
        infoValues.forEach(value => {
            originalValues[value.previousElementSibling.textContent] = value.textContent;
        });

        // Enable editing
        infoValues.forEach(value => {
            value.contentEditable = true;
        });

        // Show/hide buttons
        editBtn.style.display = 'none';
        saveBtn.style.display = 'block';
        cancelBtn.style.display = 'block';
    });

    // Save button click handler
    saveBtn.addEventListener('click', () => {
        // Disable editing
        infoValues.forEach(value => {
            value.contentEditable = false;
        });

        // Show/hide buttons
        editBtn.style.display = 'block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        // Show success message
        showSuccessMessage('Profile updated successfully!');
    });

    // Cancel button click handler
    cancelBtn.addEventListener('click', () => {
        // Restore original values
        infoValues.forEach(value => {
            const label = value.previousElementSibling.textContent;
            value.textContent = originalValues[label];
            value.contentEditable = false;
        });

        // Show/hide buttons
        editBtn.style.display = 'block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    });

    // Image upload functionality
    uploadBtn.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                showErrorMessage('File size exceeds 2MB limit');
                return;
            }

            // Check file type
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                showErrorMessage('Only JPG and PNG files are allowed');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                // Update profile image
                profileImage.src = e.target.result;
                
                // Update navbar logo
                navLogo.src = e.target.result;
                navLogo.classList.add('updated');
                setTimeout(() => navLogo.classList.remove('updated'), 500);
                
                // Show success message
                showSuccessMessage('Profile image updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    });

    // Success message function
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
    }

    // Error message function
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Add styles for messages
    const messageStyles = document.createElement('style');
    messageStyles.textContent = `
        .success-message, .error-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease;
            z-index: 1000;
        }

        .success-message {
            background-color: #d4edda;
            color: #155724;
        }

        .error-message {
            background-color: #f8d7da;
            color: #721c24;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(messageStyles);

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Show confirmation dialog
            if (confirm('Are you sure you want to logout?')) {
                // Clear any session data
                localStorage.clear();
                sessionStorage.clear();
                
                // Redirect to login page
                window.location.href = '../pages/login.html';
            }
        });
    }

    // Update the logout function
    function logout() {
        // Clear session data
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        
        // Redirect to login page
        window.location.href = '../pages/login.html';
    }
}); 