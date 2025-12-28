
// //CODE5
function loadNavbar() {
    const path = window.location.pathname;

    // Kiểm tra nếu file đang nằm trong folder /pages
    const inPagesFolder = path.includes('/page/') || path.includes('/page_luyenthi/');

    // Nếu nằm trong pages => dùng ../components
    const basePath = inPagesFolder ? '../components' : './components';

    //const basePath = inPagesFolder ? '../components' : (someCondition ? '/components' : './components');

    const cssPath = `${basePath}/navbar.css`;
    const htmlPath = `${basePath}/navbar.html`;

    console.log('Loading navbar from:', { cssPath, htmlPath });

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);

    // Load HTML
    fetch(htmlPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Chèn navbar vào DOM
            document.body.insertAdjacentHTML('afterbegin', html);

            // Khởi tạo dropdown nếu có
            if (typeof initNavbarDropdown === "function")
                initNavbarDropdown();

            // 🔥 TỰ ĐỘNG FIX LINK CHO TRANG CON
            fixNavbarLinks(inPagesFolder);
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}
 


// Hàm fix link
function fixNavbarLinks(inPagesFolder) {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Bỏ qua link rỗng hoặc '#'
        if (!href || href === '#') return;

        if (inPagesFolder) {
            // Nếu đang ở trang con (/pages/), thêm ../ để trỏ về đúng
            link.href = '../' + href;
        }
        // Nếu đang ở root, giữ nguyên href
    });
}




// Thêm hàm này vào code của bạn
function initNavbarDropdown() {
    // Xử lý dropdown cho navbar
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Đóng tất cả dropdown
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Xử lý click cho dropdown
    dropdownToggles.forEach(toggle => {
        // Xóa event listeners cũ (nếu có)
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Gắn event listener mới
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.closest('.dropdown');
            const isActive = dropdown.classList.contains('active');
            
            closeAllDropdowns();
            
            if (!isActive) {
                dropdown.classList.add('active');
            }
        });
    });
    
    // Xử lý hamburger menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Đóng menu khi click ra ngoài
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.menu-toggle')) {
            closeAllDropdowns();
            
            // Đóng mobile menu
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            }
        }
    });
    
    // Ngăn click trong dropdown content đóng dropdown
    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// //sửa code
// // Hàm khởi tạo navbar responsive
// function initNavbarResponsive() {
//     // Mobile Menu Toggle
//     const menuToggle = document.getElementById('menuToggle');
//     const navMenu = document.getElementById('navMenu');
//     const dropdowns = document.querySelectorAll('.dropdown');
//     const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
//     const navLinks = document.querySelectorAll('.nav-link');

//     // Kiểm tra xem các phần tử có tồn tại không
//     if (!menuToggle || !navMenu) return;

//     // Toggle mobile menu
//     menuToggle.addEventListener('click', function() {
//         navMenu.classList.toggle('active');
//         menuToggle.classList.toggle('active');
        
//         // Đóng tất cả dropdown khi toggle menu
//         if (!navMenu.classList.contains('active')) {
//             dropdowns.forEach(dropdown => {
//                 dropdown.classList.remove('active');
//             });
//         }
//     });

//     // Handle dropdown on mobile
//     dropdownToggles.forEach((toggle, index) => {
//         toggle.addEventListener('click', function(e) {
//             if (window.innerWidth <= 768) {
//                 e.preventDefault();
//                 e.stopPropagation();
                
//                 // Đóng các dropdown khác
//                 dropdowns.forEach((dropdown, i) => {
//                     if (i !== index) {
//                         dropdown.classList.remove('active');
//                     }
//                 });
                
//                 // Toggle dropdown hiện tại
//                 dropdowns[index].classList.toggle('active');
//             }
//         });
//     });

//     // Đóng menu khi click vào nav link (trên mobile)
//     navLinks.forEach(link => {
//         link.addEventListener('click', function() {
//             if (window.innerWidth <= 768) {
//                 navMenu.classList.remove('active');
//                 menuToggle.classList.remove('active');
                
//                 // Đóng tất cả dropdown
//                 dropdowns.forEach(dropdown => {
//                     dropdown.classList.remove('active');
//                 });
//             }
//         });
//     });

//     // Đóng menu khi click ra ngoài (trên mobile)
//     document.addEventListener('click', function(e) {
//         if (window.innerWidth <= 768) {
//             const isClickInsideMenu = navMenu.contains(e.target) || menuToggle.contains(e.target);
            
//             if (!isClickInsideMenu && navMenu.classList.contains('active')) {
//                 navMenu.classList.remove('active');
//                 menuToggle.classList.remove('active');
                
//                 // Đóng tất cả dropdown
//                 dropdowns.forEach(dropdown => {
//                     dropdown.classList.remove('active');
//                 });
//             }
//         }
//     });

//     // Xử lý resize window
//     window.addEventListener('resize', function() {
//         if (window.innerWidth > 768) {
//             // Trên desktop: hiển thị menu bình thường
//             navMenu.classList.remove('active');
//             menuToggle.classList.remove('active');
            
//             // Đóng tất cả dropdown
//             dropdowns.forEach(dropdown => {
//                 dropdown.classList.remove('active');
//             });
//         } else {
//             // Trên mobile: reset menu nếu cần
//             if (navMenu.classList.contains('active')) {
//                 navMenu.style.transition = 'none';
//                 navMenu.classList.remove('active');
//                 setTimeout(() => {
//                     navMenu.style.transition = '';
//                 }, 10);
//             }
//         }
//     });
// }



// // Sửa hàm loadNavbar để gọi initNavbarResponsive
// function loadNavbar() {
//     const path = window.location.pathname;

//     // Kiểm tra nếu file đang nằm trong folder /pages
//     const inPagesFolder = path.includes('/page/') || path.includes('/page_luyenthi/');

//     // Nếu nằm trong pages => dùng ../components
//     const basePath = inPagesFolder ? '../components' : './components';

//     const cssPath = `${basePath}/navbar.css`;
//     const htmlPath = `${basePath}/navbar.html`;

//     console.log('Loading navbar from:', { cssPath, htmlPath });

//     // Load CSS
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = cssPath;
//     document.head.appendChild(link);

//     // Load HTML
//     fetch(htmlPath)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Failed to load navbar: ${response.status}`);
//             }
//             return response.text();
//         })
//         .then(html => {
//             // Chèn navbar vào DOM
//             document.body.insertAdjacentHTML('afterbegin', html);

//             // Khởi tạo dropdown nếu có
//             if (typeof initNavbarDropdown === "function")
//                 initNavbarDropdown();

//             // 🔥 TỰ ĐỘNG FIX LINK CHO TRANG CON
//             fixNavbarLinks(inPagesFolder);
            
//             // 🔥 KHỞI TẠO RESPONSIVE NAVBAR
//             setTimeout(initNavbarResponsive, 100); // Delay một chút để DOM được render
//         })
//         .catch(error => {
//             console.error('Error loading navbar:', error);
//         });
// }

