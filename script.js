/**
 * MANIFEST — Contemporary Menswear Label
 * Typographic Store Overview & Concierge Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Header Scroll Effect
       ========================================================================== */
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ==========================================================================
       2. Mobile Navigation Drawer & Backdrop Interactions
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navBackdrop = document.getElementById('nav-backdrop');
    const navItems = document.querySelectorAll('.nav-link, .btn-mobile-nav-wa');

    const openMenu = () => {
        if (!mobileToggle || !navLinks) return;
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.classList.add('nav-open');
    };

    const closeMenu = () => {
        if (!mobileToggle || !navLinks) return;
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.classList.remove('nav-open');
    };

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                closeMenu();
            });
        });

        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMenu);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 820 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    /* ==========================================================================
       3. Mobile Interactive Store Switcher Tabs
       ========================================================================== */
    const storeTabs = document.querySelectorAll('.store-tab-btn');
    const storeCards = document.querySelectorAll('.stores-layout .store-box');

    if (storeTabs.length > 0 && storeCards.length > 0) {
        storeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetStore = tab.getAttribute('data-store');

                storeTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                storeCards.forEach(card => {
                    const cardStore = card.getAttribute('data-store-name');
                    if (targetStore === 'all' || cardStore === targetStore) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Ensure display resets if resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 820) {
                storeCards.forEach(card => {
                    card.style.display = 'flex';
                });
            } else {
                const activeTab = document.querySelector('.store-tab-btn.active');
                if (activeTab) {
                    const targetStore = activeTab.getAttribute('data-store');
                    storeCards.forEach(card => {
                        const cardStore = card.getAttribute('data-store-name');
                        if (targetStore === 'all' || cardStore === targetStore) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            }
        });
    }

    /* ==========================================================================
       4. Mobile Bottom Bar Active Link Indicator
       ========================================================================== */
    const bottomNavItems = document.querySelectorAll('.bottom-bar-item');
    const trackedSections = [
        { id: 'home', btnId: 'bbar-home' },
        { id: 'stores', btnId: 'bbar-stores' },
        { id: 'drops', btnId: 'bbar-drops' },
        { id: 'vip', btnId: 'bbar-vip' }
    ];

    const updateBottomBar = () => {
        const scrollY = window.scrollY;

        trackedSections.forEach(({ id, btnId }) => {
            const section = document.getElementById(id);
            const button = document.getElementById(btnId);
            if (section && button) {
                const top = section.offsetTop - 140;
                const bottom = top + section.offsetHeight;
                if (scrollY >= top && scrollY < bottom) {
                    bottomNavItems.forEach(item => item.classList.remove('active'));
                    button.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateBottomBar, { passive: true });
    updateBottomBar();

    /* ==========================================================================
       5. VIP WhatsApp Community Links Tracking
       ========================================================================== */
    const communityLinks = document.querySelectorAll('.btn-community-join');
    communityLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const storeName = link.id === 'mukkam-community-link' ? 'Mukkam Flagship' : 'Manjeri Outlet';
            console.log(`[MANIFEST] User clicked to join ${storeName} WhatsApp Community`);
        });
    });

});
