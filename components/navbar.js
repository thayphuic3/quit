// function loadNavbar() {
//     // Load CSS
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = '../components/navbar.css';
//     document.head.appendChild(link);

//     // Load HTML
//     fetch('../components/navbar.html')
//         .then(response => response.text())
//         .then(html => {
//             document.body.insertAdjacentHTML('afterbegin', html);
//             initNavbarDropdown(); // Khởi tạo dropdown
//         });
// }

// function initNavbarDropdown() {
//     const dropdowns = document.querySelectorAll('.dropdown');
    
//     dropdowns.forEach(dropdown => {
//         dropdown.addEventListener('mouseenter', function() {
//             this.querySelector('.dropdown-content').style.display = 'block';
//         });
        
//         dropdown.addEventListener('mouseleave', function() {
//             setTimeout(() => {
//                 this.querySelector('.dropdown-content').style.display = 'none';
//             }, 100);
//         });
//     });
// }

//CODE2
// function loadNavbar() {
//     // Phân tích URL để xác định đường dẫn phù hợp
//     const pathSegments = window.location.pathname.split('/').filter(segment => segment);
//     const isRoot = pathSegments.length <= 1;
    
//     const basePath = isRoot ? './components' : '../components';
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
//             document.body.insertAdjacentHTML('afterbegin', html);
//             initNavbarDropdown();
//         })
//         .catch(error => {
//             console.error('Error loading navbar:', error);
//         });
// }

//CODE3
// Router configuration
// const AppRouter = {
//     baseUrl: window.location.origin,
//     componentsPath: '/components',
    
//     // Phương thức xây dựng đường dẫn tuyệt đối
//     resolvePath(relativePath) {
//         return `${this.baseUrl}${this.componentsPath}/${relativePath}`;
//     },
    
//     // Phương thức xây dựng đường dẫn tương đối
//     getRelativePath(relativePath) {
//         return `${this.componentsPath}/${relativePath}`;
//     }
// };

// function loadNavbar() {
//     const cssPath = AppRouter.getRelativePath('navbar.css');
//     const htmlPath = AppRouter.getRelativePath('navbar.html');

//     console.log('Loading navbar with routing:', { 
//         baseUrl: AppRouter.baseUrl,
//         cssPath, 
//         htmlPath 
//     });

//     // Load CSS
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = cssPath;
//     document.head.appendChild(link);

//     // Load HTML
//     fetch(htmlPath)
//         .then(response => {
//             if (!response.ok) throw new Error(`HTTP ${response.status}`);
//             return response.text();
//         })
//         .then(html => {
//             document.body.insertAdjacentHTML('afterbegin', html);
//             initNavbarDropdown();
//             setupRouterLinks(); // Thiết lập routing cho các link
//         })
//         .catch(error => {
//             console.error('Error loading navbar:', error);
//             retryWithAbsolutePaths();
//         });
// }

// function setupRouterLinks() {
//     // Xử lý tất cả các link trong navbar để dùng client-side routing
//     const links = document.querySelectorAll('a[data-router]');
    
//     links.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const targetPath = this.getAttribute('href');
//             navigateTo(targetPath);
//         });
//     });
// }

// function navigateTo(path) {
//     // Client-side navigation
//     console.log('Navigating to:', path);
    
//     // Cập nhật URL mà không reload trang
//     history.pushState(null, null, path);
    
//     // Load content mới (tuỳ vào cấu trúc app của bạn)
//     loadPageContent(path);
// }

// function loadPageContent(path) {
//     // Tuỳ chỉnh theo cấu trúc trang của bạn
//     const contentMap = {
//         '/': 'pages/home.html',
//         '/practice': 'pages/practice.html',
//         '/about': 'pages/about.html'
//     };
    
//     const contentPath = contentMap[path] || 'pages/404.html';
    
//     fetch(contentPath)
//         .then(response => response.text())
//         .then(html => {
//             const contentContainer = document.getElementById('main-content');
//             if (contentContainer) {
//                 contentContainer.innerHTML = html;
//             }
//         })
//         .catch(error => {
//             console.error('Error loading page content:', error);
//         });
// }

// // Xử lý browser back/forward buttons
// window.addEventListener('popstate', function() {
//     loadPageContent(window.location.pathname);
// });


//CODE4
// function loadNavbar() {
//     // Kiểm tra nếu file đang nằm trong folder /pages
//     const inPagesFolder = window.location.pathname.includes('/page/');

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
//             document.body.insertAdjacentHTML('afterbegin', html);

//             // Nếu bạn có hàm dropdown
//             if (typeof initNavbarDropdown === "function")
//                 initNavbarDropdown();
//         })
//         .catch(error => {
//             console.error('Error loading navbar:', error);
//         });
// }

//CODE5
function loadNavbar() {
    // Kiểm tra nếu file đang nằm trong folder /pages
    const inPagesFolder = window.location.pathname.includes('/page/');

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

