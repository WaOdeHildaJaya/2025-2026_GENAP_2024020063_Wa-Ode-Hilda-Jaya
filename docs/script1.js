tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#004b87', // A deep, academic blue similar to the reference
                    yellow: '#facc15', // Accent yellow
                    dark: '#111827',
                    light: '#f3f4f6'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'], // Using Merriweather for a more academic serif look
            }
        }
    }
}

//Scripts for interactivity
document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. Mobile Menu Toggle Logic (TIDAK ADA PERUBAHAN)
    // ---------------------------------------------------------
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');

    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        if(menu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            btn.classList.add('bg-white/20');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            btn.classList.remove('bg-white/20');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            btn.classList.remove('bg-white/20');
        });
    });

    // ---------------------------------------------------------
    // 2. PERSIAPAN SCROLL SPY (KODE BARU: Deteksi Otomatis ID)
    // ---------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const logoText = document.getElementById('logo-text');
    const navLinks = document.querySelectorAll('.hidden.lg\\:flex a');
    
    // Ambil menu yang memiliki class nav-link khusus untuk spy
    const navLinksSpy = document.querySelectorAll('.nav-link'); 
    const sections = []; // Wadah untuk elemen yang akan dipantau

    // Deteksi cerdas: Cari elemen berdasarkan href di menu (mengatasi masalah <header> vs <section>)
    navLinksSpy.forEach(link => {
        const targetId = link.getAttribute('href').substring(1); 
        // Hindari memproses link eksternal seperti berita.html
        if (targetId && !targetId.includes('.html')) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                sections.push(targetElement); // Masukkan ke daftar pantauan
            }
        }
    });

    // ---------------------------------------------------------
    // 3. GABUNGAN Navbar Scroll Effect & Scroll Spy Tracker
    // ---------------------------------------------------------
    window.addEventListener('scroll', () => {
        
        // --- A. Efek Perubahan Warna Navbar (TIDAK ADA PERUBAHAN) ---
        if (window.scrollY > 50) {
            // Scrolled state
            navbar.classList.add('bg-white', 'shadow-md');
            navbar.classList.remove('bg-transparent', 'border-b', 'border-white/10', 'py-4');
            navbar.classList.add('py-2');
            
            // Change text colors for light background
            logoText.classList.remove('text-white');
            logoText.classList.add('text-brand-blue');
            
            navLinks.forEach(link => {
                if(!link.classList.contains('bg-brand-yellow')) { // Skip the apply button
                    link.classList.remove('text-white');
                    link.classList.add('text-brand-dark');
                }
            });
            
            // Adjust mobile button color
            btn.classList.remove('text-white', 'border-white/10', 'bg-brand-blue/50');
            btn.classList.add('text-brand-dark', 'border-gray-200', 'bg-gray-100');

        } else {
            // Top state
            navbar.classList.remove('bg-white', 'shadow-md', 'py-2');
            navbar.classList.add('bg-transparent', 'border-b', 'border-white/10', 'py-4');
            
            // Revert text colors for dark background
            logoText.classList.add('text-white');
            logoText.classList.remove('text-brand-blue');
            
            navLinks.forEach(link => {
                 if(!link.classList.contains('bg-brand-yellow')) {
                    link.classList.add('text-white');
                    link.classList.remove('text-brand-dark');
                }
            });

            // Revert mobile button color
            btn.classList.add('text-white', 'border-white/10', 'bg-brand-blue/50');
            btn.classList.remove('text-brand-dark', 'border-gray-200', 'bg-gray-100');
        }

        // --- B. Logika Scroll Spy (KODE BARU) ---
        let currentActiveId = "";

        // Hitung posisi masing-masing section/header yang dilacak
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Angka 150 adalah margin kompensasi agar navbar tidak menutupi judul
            if (window.scrollY >= (sectionTop - 150)) {
                currentActiveId = section.getAttribute('id');
            }
        });

        // Terapkan garis kuning dan huruf tebal pada menu yang sedang aktif
        navLinksSpy.forEach(link => {
            if (link.getAttribute('href') === `#${currentActiveId}`) {
                // JIKA AKTIF
                link.classList.add('border-brand-yellow', 'font-bold');
                link.classList.remove('border-transparent', 'font-semibold');
            } else {
                // JIKA TIDAK AKTIF
                link.classList.add('border-transparent', 'font-semibold');
                link.classList.remove('border-brand-yellow', 'font-bold');
            }
        });

    });
});