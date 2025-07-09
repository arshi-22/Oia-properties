class Navbar {
  constructor() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.dropdowns = document.querySelectorAll(".dropdown");
    this.mobileDropdownToggles = document.querySelectorAll(
      ".mobile-dropdown-toggle"
    );
    this.mobileLanguageToggle = document.querySelector(
      ".mobile-language-toggle"
    );
    this.mobileLanguageDropdownContent = document.querySelector(
      ".mobile-language-dropdown-content"
    );
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener(
        "click",
        this.toggleMobileMenu.bind(this)
      );
    }

    // Desktop dropdowns 
    this.dropdowns.forEach((dropdown) => {
    });

    // Mobile dropdowns 
    this.mobileDropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", this.toggleMobileDropdown.bind(this));
    });

    // Mobile language dropdown toggle
    if (this.mobileLanguageToggle) {
      this.mobileLanguageToggle.addEventListener(
        "click",
        this.toggleMobileLanguageDropdown.bind(this)
      );
    }
    this.mobileMenu
      .querySelectorAll(".mobile-dropdown-content a")
      .forEach((link) => {
        link.addEventListener("click", () => {
          this.mobileMenu.classList.add("hidden");
        });
      });
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("hidden");
   
    this.mobileDropdownToggles.forEach((toggle) => {
      const content = toggle.nextElementSibling;
      if (content && !content.classList.contains("hidden")) {
        content.classList.add("hidden");
      }
    });
    if (
      this.mobileLanguageDropdownContent &&
      !this.mobileLanguageDropdownContent.classList.contains("hidden")
    ) {
      this.mobileLanguageDropdownContent.classList.add("hidden");
    }
  }

  toggleMobileDropdown(event) {
    const clickedToggle = event.currentTarget;
    const dropdownContent = clickedToggle.nextElementSibling;

    if (dropdownContent) {
      this.mobileDropdownToggles.forEach((toggle) => {
        const content = toggle.nextElementSibling.classList;
        if (content && !content.contains("hidden")) {
          content.add("hidden");
        }
      });

      if (
        this.mobileLanguageDropdownContent &&
        !this.mobileLanguageDropdownContent.classList.contains("hidden")
      ) {
        this.mobileLanguageDropdownContent.classList.add("hidden");
      }
      dropdownContent.classList.toggle("hidden");
    }
  }

  toggleMobileLanguageDropdown() {
    if (this.mobileLanguageDropdownContent) {
      this.mobileDropdownToggles.forEach((toggle) => {
        const content = toggle.nextElementSibling;
        if (content && !content.classList.contains("hidden")) {
          content.classList.add("hidden");
        }
      });
      this.mobileLanguageDropdownContent.classList.toggle("hidden");
    }
  }
}

class HeroSearch {
  constructor() {
    this.forSaleTab = document.getElementById("tab-for-sale");
    this.forRentTab = document.getElementById("tab-for-rent");
    this.resetTab = document.getElementById("tab-reset");
    this.searchForm = document.querySelector(".hero-search-form-new form"); // Updated selector
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.forSaleTab) {
      this.forSaleTab.addEventListener("click", () =>
        this.setActiveTab(this.forSaleTab, this.forRentTab)
      );
    }
    if (this.forRentTab) {
      this.forRentTab.addEventListener("click", () =>
        this.setActiveTab(this.forRentTab, this.forSaleTab)
      );
    }
    if (this.resetTab) {
      this.resetTab.addEventListener("click", this.resetForm.bind(this));
    }
    if (this.searchForm) {
      this.searchForm.addEventListener(
        "submit",
        this.handleSearchSubmit.bind(this)
      );
    }
  }

  setActiveTab(activeTab, inactiveTab) {
    activeTab.classList.remove(
      "bg-gray-200",
      "text-gray-700",
      "hover:bg-gray-300"
    );
    activeTab.classList.add("bg-blue-600", "text-white");
    inactiveTab.classList.remove("bg-blue-600", "text-white");
    inactiveTab.classList.add(
      "bg-gray-200",
      "text-gray-700",
      "hover:bg-gray-300"
    );
  }

  resetForm(event) {
    event.preventDefault(); 
    this.searchForm.reset();
    this.setActiveTab(this.forSaleTab, this.forRentTab); 
    console.log("Search form reset.");
  }

  handleSearchSubmit(event) {
    event.preventDefault(); 
    const formData = new FormData(this.searchForm);
    const searchParams = {};
    for (let [key, value] of formData.entries()) {
      searchParams[key] = value;
    }
    console.log("Search submitted with:", searchParams);
   
  }
}

class PropertyCarousel {
  constructor() {
    this.swiper = null;
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper(".swiper-latest-properties", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }
}

class OffPlanCarousel {
  constructor() {
    this.swiperTabs = null;
    this.initSwiperTabs();
  }

  initSwiperTabs() {
    const swiperContainer = document.querySelector(".swiper-off-plan-tabs-new");
    if (!swiperContainer) {
      console.error(
        "Swiper container '.swiper-off-plan-tabs-new' not found. OffPlanCarousel will not initialize."
      );
      return;
    }

    this.swiperTabs = new Swiper(swiperContainer, {
   
      slidesPerView: "auto", 
      spaceBetween: 10,
      freeMode: true,
      navigation: {
        nextEl: ".off-plan-swiper-button-next",
        prevEl: ".off-plan-swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          freeMode: false,
          spaceBetween: 20,
        },
      },
    });

    if (this.swiperTabs && this.swiperTabs.slides) {
      this.swiperTabs.slides.forEach((slide, index) => {
        const button = slide.querySelector("button");
        if (button) {
          button.addEventListener("click", () => {
            this.setActiveTab(index);
          });
        }
      });
      this.setActiveTab(0);
    }
  }

  setActiveTab(activeIndex) {
    if (this.swiperTabs && this.swiperTabs.slides) {
      this.swiperTabs.slides.forEach((slide, index) => {
        const button = slide.querySelector("button");
        if (button) {
          if (index === activeIndex) {
            button.classList.remove("inactive-tab");
            button.classList.add("active-tab");
          } else {
            button.classList.remove("active-tab");
            button.classList.add("inactive-tab");
          }
        }
      });
    }
  }
}

class AreaModal {
  constructor() {
    this.areaMenuTrigger = document.getElementById("area-menu-trigger");
    this.mobileAreaMenuTrigger = document.getElementById(
      "mobile-area-menu-trigger"
    );
    this.areaModalOverlay = document.getElementById("area-modal-overlay");
    this.areaModalCloseButton = document.getElementById("area-modal-close");
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.areaMenuTrigger) {
    
      this.areaMenuTrigger.addEventListener("click", this.openModal.bind(this));
    }
    if (this.mobileAreaMenuTrigger) {
      this.mobileAreaMenuTrigger.addEventListener(
        "click",
        this.openModal.bind(this)
      );
    }
    if (this.areaModalCloseButton) {
      this.areaModalCloseButton.addEventListener(
        "click",
        this.closeModal.bind(this)
      );
    }
    if (this.areaModalOverlay) {
      this.areaModalOverlay.addEventListener("click", (event) => {
        if (event.target === this.areaModalOverlay) {
          this.closeModal();
        }
      });
    }
  }

  openModal() {
    if (this.areaModalOverlay) {
      this.areaModalOverlay.classList.add("open");
      document.body.style.overflow = "hidden"; 
    }
  }

  closeModal() {
    if (this.areaModalOverlay) {
      this.areaModalOverlay.classList.remove("open");
      document.body.style.overflow = ""; 
    }
  }
}

class LatestProperties {
  constructor() {
    this.forSaleTab = document.getElementById("latest-tab-for-sale");
    this.forRentTab = document.getElementById("latest-tab-for-rent");
    this.addEventListeners();
  }

  addEventListeners() {
    if (this.forSaleTab) {
      this.forSaleTab.addEventListener("click", () =>
        this.setActiveTab(this.forSaleTab, this.forRentTab)
      );
    }
    if (this.forRentTab) {
      this.forRentTab.addEventListener("click", () =>
        this.setActiveTab(this.forRentTab, this.forSaleTab)
      );
    }
  }

  setActiveTab(activeTab, inactiveTab) {
    activeTab.classList.remove("inactive-tab");
    activeTab.classList.add("active-tab");
    inactiveTab.classList.remove("active-tab");
    inactiveTab.classList.add("inactive-tab");
  }
}

class App {
  constructor() {
    this.navbar = new Navbar();
    this.heroSearch = new HeroSearch();
    this.propertyCarousel = new PropertyCarousel();
    this.offPlanCarousel = new OffPlanCarousel();
    this.areaModal = new AreaModal(); 
    this.latestProperties = new LatestProperties(); 
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});
