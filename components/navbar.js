
//CODE5
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

