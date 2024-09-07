document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle the popup visibility
    function poppup() {
        const popup = document.getElementById("popup1");
        if (popup) {
            popup.classList.toggle("active");
        }
    }

    // Add event listener to all "About" buttons to show the popup with specific doctor information
    document.querySelectorAll('.abButton').forEach(button => {
        button.addEventListener('click', function () {
            const doctorName = this.getAttribute('data-doctor-name');
            const doctorTitle = this.getAttribute('data-doctor-title');
            const doctorBody = this.getAttribute('data-doctor-body');
            const doctorImage = this.getAttribute('data-doctor-image'); // Ensure you add this data attribute in HTML

            const popupName = document.getElementById('popupName');
            const popupTitle = document.getElementById('popupTitle');
            const popupBody = document.getElementById('popupBody');
            const popupImage = document.getElementById('popupImage');

            if (popupName && popupTitle && popupBody && popupImage) {
                popupName.textContent = doctorName;
                popupTitle.textContent = doctorTitle;
                popupBody.textContent = doctorBody;
                popupImage.src = doctorImage; // Ensure an <img> with id "popupImage" exists in HTML
                popupImage.alt = doctorName + "'s image";

                poppup();
            }
        });
    });

    // Close the popup when the Escape key is pressed
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            const popup = document.getElementById("popup1");
            if (popup && popup.classList.contains("active")) {
                poppup();
            }
        }
    });

    // Close the popup when the overlay or close button is clicked
    const overlay = document.querySelector('.popup .overlay');
    const closeBtn = document.querySelector('.popup .closeBtn');
    if (overlay) {
        overlay.addEventListener('click', poppup);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', poppup);
    }

    // Function to toggle dark mode
    function toggleMode(isDarkMode) {
        const body = document.body;
        const darkIcon = document.getElementById('darkIcon');
        if (isDarkMode) {
            body.classList.add('dark-mode');
            if (darkIcon) darkIcon.src = "/img/sun.png";
            body.style.backgroundColor = "var(--body-bg-color-dark)";
            body.style.color = "var(--text-color-dark)";
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            if (darkIcon) darkIcon.src = "/img/moon.png";
            body.style.backgroundColor = "var(--body-bg-color-light)";
            body.style.color = "var(--text-color-light)";
            localStorage.setItem('darkMode', 'false');
        }
    }

    // Initialize dark mode based on stored preference
    const storedDarkMode = localStorage.getItem('darkMode');
    const isDarkMode = storedDarkMode === 'true';
    toggleMode(isDarkMode);

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentMode = document.body.classList.contains('dark-mode');
            toggleMode(!currentMode);
        });
    }

    // Update year dynamically
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.innerHTML = new Date().getFullYear();
    }

    // Slider functionality
    class SliderClip {
        constructor(el) {
            this.el = el;
            this.Slides = Array.from(this.el.querySelectorAll('li'));
            this.Nav = Array.from(this.el.querySelectorAll('nav a'));
            this.totalSlides = this.Slides.length;
            this.current = 0;
            this.autoPlay = true; // true or false
            this.timeTrans = 4000; // transition time in milliseconds
            this.IndexElements = Array.from({ length: this.totalSlides }, (_, i) => i);

            this.setCurret();
            this.initEvents();
        }
        setCurret() {
            this.Slides[this.current].classList.add('current');
            this.Nav[this.current].classList.add('current_dot');
        }
        initEvents() {
            this.Nav.forEach(dot => {
                dot.addEventListener('click', (ele) => {
                    ele.preventDefault();
                    this.changeSlide(this.Nav.indexOf(dot));
                });
            });

            this.el.addEventListener('mouseenter', () => this.autoPlay = false);
            this.el.addEventListener('mouseleave', () => this.autoPlay = true);

            setInterval(() => {
                if (this.autoPlay) {
                    this.current = this.current < this.Slides.length - 1 ? this.current + 1 : 0;
                    this.changeSlide(this.current);
                }
            }, this.timeTrans);
        }
        changeSlide(index) {
            this.Nav.forEach(allDot => allDot.classList.remove('current_dot'));
            this.Slides.forEach(allSlides => allSlides.classList.remove('prev', 'current'));

            this.IndexElements.filter(value => value < index).forEach(indexPrevEle => {
                this.Slides[indexPrevEle].classList.add('prev');
            });

            this.Slides[index].classList.add('current');
            this.Nav[index].classList.add('current_dot');
        }
    }

    const slider = document.querySelector('.slider');
    if (slider) {
        new SliderClip(slider);
    }

    // Dropdown functionality
    const dropdownLinks = document.querySelectorAll('.newNavigation > li > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // event.preventDefault();

            const openSubmenus = document.querySelectorAll('.subnavigation__wrapper');
            openSubmenus.forEach(submenu => {
                if (submenu !== this.nextElementSibling) {
                    submenu.style.maxHeight = '0';
                }
            });

            const submenu = this.nextElementSibling;
            submenu.style.maxHeight = submenu.style.maxHeight && submenu.style.maxHeight !== '0px' ? '0' : '35rem';
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.newNavigation')) {
            document.querySelectorAll('.subnavigation__wrapper').forEach(submenu => {
                submenu.style.maxHeight = '0';
            });
        }
    });

    // Tabs functionality
    const allLinks = document.querySelectorAll(".tabs a");
    const allTabs = document.querySelectorAll(".tab-content");
    const tabContentWrapper = document.querySelector(".tab-content-wrapper");
    const select = document.querySelector(".tabs-select");

    const shiftTabs = (linkId) => {
        allTabs.forEach((tab, i) => {
          if (tab.id.includes(linkId)) {
            allTabs.forEach((tabItem) => {
              const height = tabContentWrapper.clientHeight;
              tabItem.style = `transform: translateY(-${i * height}px);`;
              select.value = linkId;
            });
          }
        });
      };

    function handleLinkChange(elem) {
        const linkId = elem.id;
        allLinks.forEach(link => {
            link.classList.toggle('active', link === elem);
        });
        shiftTabs(linkId);
    }

    allLinks.forEach(elem => {
        elem.addEventListener("click", function (event) {
            event.preventDefault();
            handleLinkChange(elem);
        });
    });

    const currentHash = window.location.hash;
    const activeLink = document.querySelector(`.tabs a${currentHash ? `[href="${currentHash}"]` : '.tabs a'}`);
    if (activeLink) {
        activeLink.classList.add("active");
        shiftTabs(activeLink.id);
    }

    if (select) {
        select.addEventListener("change", function (e) {
            const linkId = e.target.value;
            const elem = document.getElementById(linkId);
            if (elem) {
                window.location.hash = linkId;
                handleLinkChange(elem);
            }
        });
    }
});
