/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Проверка WebP
---------------------------------------------------------------------------*/
function isWebp() {
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      document.body.classList.add(support ? "webp" : "no-webp");
   });
}


/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");
      const animationDuration = 500;

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         const link = e.target.closest("a");
         if (link) {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
               window.location.href = link.href;
            }, animationDuration);
         }
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}



/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPopups);
   } else {
      initPopups();
   }
}

function initPopups() {
   const POPUP_SELECTOR = ".popup";
   const OPEN_BTN_SELECTOR = ".open-popup";
   const ACTIVE_CLASS = "show";
   const BODY_ACTIVE_CLASS = "popup-opened";

   let activeButton = null;

   // =========================
   // OPEN / SWITCH POPUPS
   // =========================
   document.addEventListener("click", (e) => {
      const button = e.target.closest(OPEN_BTN_SELECTOR);
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const popupId = button.dataset.popup;
      if (!popupId) return;

      const popup = document.getElementById(popupId);
      if (!popup) return;

      const currentPopup = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );

      if (activeButton === button && currentPopup) {
         closePopup(currentPopup);
         return;
      }

      if (currentPopup) {
         closePopup(currentPopup);
      }

      openPopup(popup, button);
   });

   // =========================
   // CLOSE POPUPS (overlay / close btn / outside)
   // =========================
   document.addEventListener("click", (e) => {
      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      if (e.target.closest(OPEN_BTN_SELECTOR)) return;

      const isCloseBtn = e.target.closest(".popup__close");
      const isInsideBody = e.target.closest(".popup__body");

      if (isCloseBtn || !isInsideBody) {
         closePopup(openPopupEl);
      }
   });

   // =========================
   // ESC KEY
   // =========================
   document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      closePopup(openPopupEl);
   });

   // =========================
   // HELPERS
   // =========================
   function openPopup(popup, button) {
      popup.classList.add(ACTIVE_CLASS);
      document.body.classList.add(BODY_ACTIVE_CLASS);

      if (button) {
         button.classList.add("active");
         activeButton = button;
      }
   }

   function closePopup(popup) {
      popup.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);

      if (activeButton) {
         activeButton.classList.remove("active");
         activeButton = null;
      }
   }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();


/*==========================================================================
Fix header
============================================================================*/
function initHideHeaderOnScroll() {
   const header = document.querySelector('.header');

   if (!header) return;

   let lastScroll = window.scrollY;
   let scrollUpStart = window.scrollY;

   const showDelta = 40;
   const topOffset = 40;

   window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= topOffset) {
         header.classList.remove('header--hide');
         lastScroll = currentScroll;
         scrollUpStart = currentScroll;
         return;
      }

      if (currentScroll > lastScroll) {
         header.classList.add('header--hide');
         scrollUpStart = currentScroll;
      }

      else if (currentScroll < lastScroll) {
         const scrolledUp = scrollUpStart - currentScroll;

         if (scrolledUp > showDelta) {
            header.classList.remove('header--hide');
         }
      }

      lastScroll = currentScroll;
   });
}

/*==========================================================================
Submenu
============================================================================*/
function initSubmenu() {
   const isTouch = window.matchMedia('(hover: none)').matches;
   const items = document.querySelectorAll('.menu__item');
   const headerBg = document.querySelector('.header-bg');

   // ===== ПОДЛОЖКА =====
   function toggleHeaderBg() {
      if (!headerBg) return;

      const activeSubmenu = document.querySelector('.submenu.show');

      if (activeSubmenu) {
         const height = activeSubmenu.scrollHeight;

         headerBg.classList.add('show');
         headerBg.style.height = height + 'px';
      } else {
         headerBg.classList.remove('show');
         headerBg.style.height = '0px';
      }
   }

   items.forEach(item => {
      const label = item.querySelector('.menu__label');
      const submenu = item.querySelector('.submenu');
      const backBtn = item.querySelector('.submenu__back');

      if (!label || !submenu) return;

      const baseTitle = label.textContent.trim();

      // ===== DESKTOP =====
      if (!isTouch) {
         item.addEventListener('mouseenter', () => {
            document.querySelectorAll('.menu__item').forEach(el => {
               el.querySelector('.menu__label')?.classList.remove('active');
               el.querySelector('.submenu')?.classList.remove('show');
            });

            label.classList.add('active');
            submenu.classList.add('show');

            toggleHeaderBg();
         });

         item.addEventListener('mouseleave', () => {
            label.classList.remove('active');
            submenu.classList.remove('show');

            toggleHeaderBg();
         });
      }

      // ===== MOBILE / TABLET =====
      if (isTouch) {
         label.addEventListener('click', (e) => {
            e.preventDefault();

            const isOpen = label.classList.contains('active');

            document.querySelectorAll('.menu__item').forEach(el => {
               el.querySelector('.menu__label')?.classList.remove('active');
               el.querySelector('.submenu')?.classList.remove('show');

               el.querySelectorAll('.submenu__sublist').forEach(list => {
                  list.classList.remove('show');
               });

               const back = el.querySelector('.submenu__back');
               const lbl = el.querySelector('.menu__label');

               if (back && lbl) {
                  back.classList.remove('added');
                  back.innerHTML = `
                     <svg>
                        <use xlink:href="img/icons/icons.svg#icon-chevron-left"></use>
                     </svg>
                     ${lbl.textContent.trim()}
                  `;
               }
            });

            if (!isOpen) {
               label.classList.add('active');
               submenu.classList.add('show');
            }

            toggleHeaderBg();
         });

         // ===== ВТОРОЙ УРОВЕНЬ =====
         const subLabels = submenu.querySelectorAll('.submenu__label');

         subLabels.forEach(subLabel => {
            const subItem = subLabel.closest('.submenu__item');
            const subList = subItem.querySelector('.submenu__sublist');

            if (!subList) return;

            subLabel.addEventListener('click', (e) => {
               e.preventDefault();

               submenu.querySelectorAll('.submenu__sublist').forEach(list => {
                  list.classList.remove('show');
               });

               subList.classList.add('show');

               if (backBtn) {
                  backBtn.classList.add('added');

                  backBtn.innerHTML = `
                     <svg>
                        <use xlink:href="img/icons/icons.svg#icon-chevron-left"></use>
                     </svg>
                     ${baseTitle} / ${subLabel.textContent.trim()}
                  `;
               }

               toggleHeaderBg();
            });
         });

         // ===== BACK BUTTON =====
         if (backBtn) {
            backBtn.addEventListener('click', () => {

               // назад со второго уровня
               if (backBtn.classList.contains('added')) {
                  submenu.querySelectorAll('.submenu__sublist').forEach(list => {
                     list.classList.remove('show');
                  });

                  backBtn.classList.remove('added');

                  backBtn.innerHTML = `
                     <svg>
                        <use xlink:href="img/icons/icons.svg#icon-chevron-left"></use>
                     </svg>
                     ${baseTitle}
                  `;

                  toggleHeaderBg();
                  return;
               }

               // закрыть submenu
               submenu.classList.remove('show');
               label.classList.remove('active');

               toggleHeaderBg();
            });
         }
      }
   });

   // ===== КЛИК ВНЕ =====
   document.addEventListener('click', (e) => {
      if (!isTouch) return;

      if (!e.target.closest('.menu__item')) {
         document.querySelectorAll('.menu__item').forEach(el => {
            const lbl = el.querySelector('.menu__label');
            const sub = el.querySelector('.submenu');
            const back = el.querySelector('.submenu__back');

            lbl?.classList.remove('active');
            sub?.classList.remove('show');

            el.querySelectorAll('.submenu__sublist').forEach(list => {
               list.classList.remove('show');
            });

            if (back && lbl) {
               back.classList.remove('added');

               back.innerHTML = `
                  <svg>
                     <use xlink:href="img/icons/icons.svg#icon-chevron-left"></use>
                  </svg>
                  ${lbl.textContent.trim()}
               `;
            }
         });

         toggleHeaderBg();
      }
   });
}

/*==========================================================================
Lang module
============================================================================*/
function initLangDropdown() {
   document.addEventListener('click', function (e) {
      const btn = e.target.closest('.lang-mod__btn');

      if (!btn) {
         document.querySelectorAll('.lang-mod').forEach(el => {
            el.querySelector('.lang-mod__btn')?.classList.remove('active');
            el.querySelector('.lang-mod__menu')?.classList.remove('show');
         });
         return;
      }

      const langMod = btn.closest('.lang-mod');
      const menu = langMod.querySelector('.lang-mod__menu');
      const isOpen = btn.classList.contains('active');

      document.querySelectorAll('.lang-mod').forEach(el => {
         el.querySelector('.lang-mod__btn')?.classList.remove('active');
         el.querySelector('.lang-mod__menu')?.classList.remove('show');
      });

      if (!isOpen) {
         btn.classList.add('active');
         menu.classList.add('show');
      }
   });
}


/*==========================================================================
Products slider
============================================================================*/
function initProductsCarousel() {
   const sliders = document.querySelectorAll('.products');

   if (!sliders.length) return;

   sliders.forEach((carousel) => {
      const sliderEl = carousel.querySelector('.products__slider');
      const paginationEl = carousel.querySelector('.products__pagination');
      const prevEl = carousel.querySelector('.products__prev');
      const nextEl = carousel.querySelector('.products__next');

      if (!sliderEl) return;

      new Swiper(sliderEl, {
         slidesPerView: 4,
         loop: false,
         pagination: {
            el: paginationEl,
            type: 'progressbar',
            clickable: true,
         },
         speed: 600,
         navigation: {
            prevEl,
            nextEl,
         },
         breakpoints: {
            320: {
               slidesPerView: 2,
               spaceBetween: 4,
            },
            900: {
               slidesPerView: 3,
               spaceBetween: 6,
            },
            1200: {
               slidesPerView: 4,
               spaceBetween: 7,
            }
         },
         on: {
            progress(swiper, progress) {
               const line = swiper.pagination.el;
               if (!line || !line.offsetWidth) return;

               const clamped = Math.min(Math.max(progress, 0), 1);

               const bulletWidth = parseFloat(
                  getComputedStyle(line).getPropertyValue('--bullet-width')
               ) || 81;

               const move = clamped * (line.offsetWidth - bulletWidth);

               line.style.setProperty('--move', move + 'px');
            }
         }
      });
   });
}


/*==========================================================================
Footer submenu
============================================================================*/
function initFooterSubmenu() {
   const items = document.querySelectorAll('.footer__menu-list-item.has-submenu');

   if (!items.length) return;

   items.forEach((item) => {
      const button = item.querySelector('.footer__menu-button');
      const submenu = item.querySelector('.footer__submenu');

      if (!button || !submenu) return;

      button.addEventListener('click', (e) => {
         e.stopPropagation();

         const isOpen = button.classList.contains('active');

         items.forEach((el) => {
            el.querySelector('.footer__menu-button')?.classList.remove('active');
            el.querySelector('.footer__submenu')?.classList.remove('show');
         });

         if (!isOpen) {
            button.classList.add('active');
            submenu.classList.add('show');
         }
      });
   });

   document.addEventListener('click', () => {
      items.forEach((item) => {
         item.querySelector('.footer__menu-button')?.classList.remove('active');
         item.querySelector('.footer__submenu')?.classList.remove('show');
      });
   });
}

/*==========================================================================
Gallery
============================================================================*/
if (typeof GLightbox !== 'undefined') {
   const lightbox = GLightbox({
      selector: '.glightbox'
   });
} else {
   console.warn('GLightbox не загружен');
}

/*==========================================================================
Gallery slider
============================================================================*/
function initGallerySliders() {
   const sliders = document.querySelectorAll('.gallery');

   if (!sliders.length) return;

   sliders.forEach((carousel) => {
      const sliderEl = carousel.querySelector('.gallery__slider');
      const paginationEl = carousel.querySelector('.gallery__pagination');
      const prevEl = carousel.querySelector('.gallery__prev');
      const nextEl = carousel.querySelector('.gallery__next');

      if (!sliderEl) return;

      new Swiper(sliderEl, {
         slidesPerView: 4,
         loop: false,
         pagination: {
            el: paginationEl,
            type: 'progressbar',
            clickable: true,
         },
         speed: 600,
         navigation: {
            prevEl,
            nextEl,
         },
         breakpoints: {
            320: {
               slidesPerView: 1.18,
               spaceBetween: 7,
            },
            550: {
               slidesPerView: 1.6,
               spaceBetween: 7,
            },
            900: {
               slidesPerView: 3,
               spaceBetween: 10,
            }
         },
         on: {
            progress(swiper, progress) {
               const line = swiper.pagination.el;
               if (!line || !line.offsetWidth) return;

               const clamped = Math.min(Math.max(progress, 0), 1);

               const bulletWidth = parseFloat(
                  getComputedStyle(line).getPropertyValue('--bullet-width')
               ) || 81;

               const move = clamped * (line.offsetWidth - bulletWidth);

               line.style.setProperty('--move', move + 'px');
            }
         }
      });
   });
}


/*==========================================================================
Color labels
============================================================================*/
document.querySelectorAll('.filter-color').forEach(el => {
   const color = el.dataset.color;
   if (color) {
      el.style.setProperty('--filter-color', color);
   }
});


/*==========================================================================
Filter
============================================================================*/
function initFilter() {
   const filter = document.querySelector('.filter');
   const toggle = document.querySelector('.filter__toggle');
   const close = document.querySelector('.filter__close');
   const body = document.body;

   if (!filter || !toggle) return;

   const open = () => {
      filter.classList.add('show');
      body.classList.add('filter-opened');
   };

   const hide = () => {
      filter.classList.remove('show');
      body.classList.remove('filter-opened');
   };

   const toggleFilter = () => {
      const isOpen = filter.classList.contains('show');
      isOpen ? hide() : open();
   };

   toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFilter();
   });

   close?.addEventListener('click', hide);

   document.addEventListener('click', (e) => {
      if (!filter.contains(e.target) && !toggle.contains(e.target)) {
         hide();
      }
   });
}


/*==========================================================================
Filter functions
============================================================================*/
function initFilterUI() {
   const groups = document.querySelectorAll('.filter__group');
   const resetBtn = document.querySelector('.filter__reset');
   const form = document.querySelector('.filter__form');

   if (!groups.length) return;

   groups.forEach((group) => {
      const head = group.querySelector('.filter__group-head');
      const content = group.querySelector('.filter__group-content');

      head.addEventListener('click', () => {
         const isActive = group.classList.contains('active');

         if (isActive) {
            group.classList.remove('active');
            content.style.maxHeight = null;
         } else {
            group.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
         }
      });
   });

   function updateState() {
      let hasSelected = false;

      groups.forEach((group) => {
         const inputs = group.querySelectorAll('input:checked');
         const keys = group.querySelector('.filter__group-keys');

         keys.innerHTML = '';

         inputs.forEach((input) => {
            hasSelected = true;

            const label = input.closest('label');
            const textEl = label.querySelector(
               '.filter-radio__text, .filter-checkbox__text, .filter-color__text'
            );

            if (textEl) {
               const span = document.createElement('span');
               span.textContent = textEl.textContent;
               keys.appendChild(span);
            }
         });
      });

      if (resetBtn) {
         resetBtn.style.display = hasSelected ? 'flex' : 'none';
      }
   }

   form.addEventListener('change', updateState);

   form.addEventListener('reset', () => {
      setTimeout(updateState, 0);
   });

   updateState();
}


/*==========================================================================
Product gallery
============================================================================*/
function initProductGalleryMobile() {
   const slider = document.querySelector('.product__gallery-slider');
   const wrapper = document.querySelector('.product__gallery-slider-wrapper');
   const slides = document.querySelectorAll('.product__gallery-slide');

   if (!slider || !wrapper || !slides.length || typeof Swiper === 'undefined') return;

   let swiper = null;

   function enableSwiper() {
      if (swiper) return;

      slider.classList.add('swiper');
      wrapper.classList.add('swiper-wrapper');

      slides.forEach((slide) => {
         slide.classList.add('swiper-slide');
      });

      swiper = new Swiper(slider, {
         slidesPerView: 1,
         spaceBetween: 0,
         pagination: {
            el: '.product__slider-pagination',
            type: 'progressbar',
            clickable: true,
         },
         on: {
            progress(swiper, progress) {
               const line = swiper.pagination.el;
               if (!line || !line.offsetWidth) return;

               const clamped = Math.min(Math.max(progress, 0), 1);

               const bulletWidth = parseFloat(
                  getComputedStyle(line).getPropertyValue('--bullet-width')
               ) || 81;

               const move = clamped * (line.offsetWidth - bulletWidth);

               line.style.setProperty('--move', move + 'px');
            }
         }
      });
   }

   function disableSwiper() {
      if (!swiper) return;

      swiper.destroy(true, true);
      swiper = null;

      slider.classList.remove('swiper');
      wrapper.classList.remove('swiper-wrapper');

      slides.forEach((slide) => {
         slide.classList.remove('swiper-slide');
      });
   }

   function checkScreen() {
      if (window.innerWidth <= 1000) {
         enableSwiper();
      } else {
         disableSwiper();
      }
   }

   checkScreen();
   window.addEventListener('resize', checkScreen);
}


/*==========================================================================
Product accordion
============================================================================*/
function initProductAccordion() {
   const items = document.querySelectorAll('.product__about-group');
   if (!items.length) return;

   let activeItem = null;

   items.forEach((item, index) => {
      const head = item.querySelector('.product__about-head');
      const body = item.querySelector('.product__about-body');

      if (!head || !body) return;

      if (index === 0) {
         item.classList.add('active');

         requestAnimationFrame(() => {
            body.style.maxHeight = body.scrollHeight + 'px';
         });

         activeItem = item;
      } else {
         body.style.maxHeight = '';
      }

      head.addEventListener('click', () => {
         if (activeItem === item) {
            item.classList.remove('active');
            body.style.maxHeight = '';
            activeItem = null;
            return;
         }

         if (activeItem) {
            const prevBody = activeItem.querySelector('.product__about-body');
            if (prevBody) prevBody.style.maxHeight = '';
            activeItem.classList.remove('active');
         }

         item.classList.add('active');

         requestAnimationFrame(() => {
            body.style.maxHeight = body.scrollHeight + 'px';
         });

         activeItem = item;
      });
   });
}


/*==========================================================================
Product toggle text (read more)
============================================================================*/
function initProductReadMore() {
   const buttons = document.querySelectorAll('.product__about-read');
   if (!buttons.length) return;

   buttons.forEach(btn => {
      btn.addEventListener('click', () => {
         const text = btn.closest('.product__about-text');
         const wrapper = text?.querySelector('.product__about-text-wrapper');
         const body = btn.closest('.product__about-body');

         if (!wrapper || !body) return;

         const isExpanded = wrapper.classList.contains('expanded');

         if (isExpanded) {
            wrapper.style.maxHeight = '120px';
            wrapper.classList.remove('expanded');
            btn.textContent = 'Далее';

            requestAnimationFrame(() => {
               body.style.maxHeight = body.scrollHeight + 'px';
            });

         } else {
            requestAnimationFrame(() => {
               wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
               requestAnimationFrame(() => {
                  body.style.maxHeight = body.scrollHeight + 'px';
               });
            });

            wrapper.classList.add('expanded');
            btn.textContent = 'Скрыть';
         }
      });
   });
}

function checkReadMoreVisibility() {
   const blocks = document.querySelectorAll('.product__about-text');

   blocks.forEach(block => {
      const wrapper = block.querySelector('.product__about-text-wrapper');
      const btn = block.querySelector('.product__about-read');

      if (!wrapper || !btn) return;

      requestAnimationFrame(() => {
         if (wrapper.scrollHeight <= wrapper.clientHeight) {
            btn.style.display = 'none';
         } else {
            btn.style.display = '';
         }
      });
   });
}

/*==========================================================================
Product card swipe   
============================================================================*/
function initProductSwipe() {
   const cards = document.querySelectorAll('.product-card');

   cards.forEach(card => {
      if (card.classList.contains('swiper-slide')) return;

      let startX = 0;
      let currentX = 0;
      let isSwiping = false;

      card.addEventListener('touchstart', (e) => {
         startX = e.touches[0].clientX;
         isSwiping = true;
      });

      card.addEventListener('touchmove', (e) => {
         if (!isSwiping) return;
         currentX = e.touches[0].clientX;
      });

      card.addEventListener('touchend', () => {
         if (!isSwiping) return;

         const diff = currentX - startX;

         if (Math.abs(diff) > 30) {
            card.classList.toggle('is-swiped');
         }

         isSwiping = false;
      });
   });
}



/*==========================================================================
Calendar
============================================================================*/
const deliveryInputs = document.querySelectorAll('.calendar-mask');

deliveryInputs.forEach(input => {
   input.addEventListener('keydown', e => e.preventDefault());

   if (typeof AirDatepicker !== 'undefined') {
      new AirDatepicker(input, {
         timepicker: true,
         dateFormat: 'dd.MM.yyyy',
         timeFormat: 'HH:mm',
         autoClose: true,
         minDate: new Date()
      });
   }
});



/*==========================================================================
Sliders in About page
============================================================================*/
function initAboutSliders() {
   const sliders = document.querySelectorAll('.about__gallery');

   if (!sliders.length) return;

   sliders.forEach((carousel) => {
      const sliderEl = carousel.querySelector('.about__slider');
      const paginationEl = carousel.querySelector('.about__slider-pagination');
      const prevEl = carousel.querySelector('.about__slider-prev');
      const nextEl = carousel.querySelector('.about__slider-next');

      if (!sliderEl) return;

      new Swiper(sliderEl, {
         slidesPerView: 2,
         loop: false,
         pagination: {
            el: paginationEl,
            type: 'progressbar',
            clickable: true,
         },
         speed: 600,
         navigation: {
            prevEl,
            nextEl,
         },
         breakpoints: {
            320: {
               slidesPerView: 1.2,
               spaceBetween: 4,
            },
            900: {
               slidesPerView: 3,
               spaceBetween: 6,
            },
            1200: {
               slidesPerView: 2,
               spaceBetween: 7,
            }
         },
         on: {
            progress(swiper, progress) {
               const line = swiper.pagination.el;
               if (!line || !line.offsetWidth) return;

               const clamped = Math.min(Math.max(progress, 0), 1);

               const bulletWidth = parseFloat(
                  getComputedStyle(line).getPropertyValue('--bullet-width')
               ) || 81;

               const move = clamped * (line.offsetWidth - bulletWidth);

               line.style.setProperty('--move', move + 'px');
            }
         }
      });
   });
}



/*==========================================================================
Blog marque
============================================================================*/
const marqueSlider = document.querySelector(".blog__slider");

if (marqueSlider) {
   const brandsSwiper = new Swiper(marqueSlider, {
      slidesPerView: 6,
      spaceBetween: 60,
      loop: true,
      speed: 3000,
      freeMode: true,
      freeModeMomentum: false,
      allowTouchMove: false,
      autoplay: {
         delay: 0,
         disableOnInteraction: false,
      },
      breakpoints: {
         320: {
            slidesPerView: 2.6,
         },
         600: {
            slidesPerView: 3,
         },
         900: {
            slidesPerView: 4,
         },
         1200: {
            slidesPerView: 5,
         },
         2000: {
            slidesPerView: 6,
         }
      }
   });
}


/*==========================================================================
Readmore slider
============================================================================*/
function moreSlider() {
   const sliderEl = document.querySelector('.readmore__slider');
   if (!sliderEl) return;

   if (sliderEl.swiper) return;

   new Swiper(sliderEl, {
      slidesPerView: 3,
      loop: false,
      navigation: {
         prevEl: '.readmore__prev',
         nextEl: '.readmore__next',
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 2,
            spaceBetween: 16,
         },
         1200: {
            slidesPerView: 3,
            spaceBetween: 24,
         },
         2000: {
            slidesPerView: 4,
            spaceBetween: 24,
         }
      }
   });
}



/*==========================================================================
faq
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__accordion-item');
   if (!faqItems.length) return;

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__accordion-head');
      const answer = item.querySelector('.faq__accordion-content');

      if (!question || !answer || item.dataset.inited) return;

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         faqItems.forEach(el => {
            const elAnswer = el.querySelector('.faq__accordion-content');
            if (!elAnswer) return;

            el.classList.remove('active');
            elAnswer.style.maxHeight = null;
         });

         if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}


/*==========================================================================
Gift slider
============================================================================*/
function initGiftSlider() {
   const carousel = document.querySelector('.sertificate__gallery');
   if (!carousel) return;

   const sliderEl = carousel.querySelector('.sertificate__slider');
   const paginationEl = carousel.querySelector('.sertificate__pagination');

   if (!sliderEl) return;

   let swiper = null;
   const mediaQuery = window.matchMedia('(max-width: 1200px)');

   function initSwiper() {
      swiper = new Swiper(sliderEl, {
         slidesPerView: 1.2,
         loop: false,
         spaceBetween: 7,
         pagination: {
            el: paginationEl,
            type: 'progressbar',
            clickable: true,
         },
         speed: 600,
         on: {
            progress(swiper, progress) {
               const line = swiper.pagination.el;
               if (!line || !line.offsetWidth) return;

               const clamped = Math.min(Math.max(progress, 0), 1);

               const bulletWidth = parseFloat(
                  getComputedStyle(line).getPropertyValue('--bullet-width')
               ) || 81;

               const move = clamped * (line.offsetWidth - bulletWidth);

               line.style.setProperty('--move', move + 'px');
            }
         }
      });
   }

   function destroySwiper() {
      if (swiper) {
         swiper.destroy(true, true);
         swiper = null;
      }
   }

   function checkBreakpoint(e) {
      if (e.matches) {
         if (!swiper) initSwiper();
      } else {
         destroySwiper();
      }
   }

   checkBreakpoint(mediaQuery);
   mediaQuery.addEventListener('change', checkBreakpoint);
}


/*==========================================================================
Contacts slider
============================================================================*/
function contactsSlider() {
   const sliderEl = document.querySelector('.contacts__slider');
   if (!sliderEl) return;

   if (sliderEl.swiper) return;

   new Swiper(sliderEl, {
      slidesPerView: 4,
      spaceBetween: 7,
      speed: 600,
      loop: false,
      navigation: {
         prevEl: '.contacts__slider-prev',
         nextEl: '.contacts__slider-next',
      },
      breakpoints: {
         320: {
            slidesPerView: 1.2,
         },
         768: {
            slidesPerView: 3,
         },
         1200: {
            slidesPerView: 4,
         }
      },
      pagination: {
         el: '.contacts__slider-pagination',
         type: 'progressbar',
         clickable: true,
      },
      on: {
         progress(swiper, progress) {
            const line = swiper.pagination.el;
            if (!line || !line.offsetWidth) return;

            const clamped = Math.min(Math.max(progress, 0), 1);

            const bulletWidth = parseFloat(
               getComputedStyle(line).getPropertyValue('--bullet-width')
            ) || 81;

            const move = clamped * (line.offsetWidth - bulletWidth);

            line.style.setProperty('--move', move + 'px');
         }
      }
   });
}


/*==========================================================================
Map
============================================================================*/
if (typeof ymaps !== 'undefined') {
   ymaps.ready(initMap);
} else {
   console.warn('Yandex Maps API не загружен');
}

function initMap() {
   const mapEl = document.getElementById('map');
   if (!mapEl) return;

   const lat = parseFloat(mapEl.dataset.lat);
   const lng = parseFloat(mapEl.dataset.lng);

   // Проверка координат
   if (isNaN(lat) || isNaN(lng)) {
      console.warn('Некорректные координаты в data-атрибутах');
      return;
   }

   const hint = mapEl.dataset.hint || '';
   const balloon = mapEl.dataset.balloon || '';

   const mapCenter = [lat, lng];

   const myMap = new ymaps.Map('map', {
      center: mapCenter,
      zoom: 12,
   }, {
      searchControlProvider: 'yandex#search'
   });

   const iconImageSize = window.innerWidth < 768 ? [53, 70] : [103, 137];
   const iconImageOffset = window.innerWidth < 768 ? [-25, -50] : [-50, -120];

   const myPlacemark = new ymaps.Placemark(mapCenter, {
      hintContent: hint,
      balloonContent: balloon
   }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-location.png',
      iconImageSize: iconImageSize,
      iconImageOffset: iconImageOffset
   });

   myMap.behaviors.disable('scrollZoom');

   myMap.controls.remove('searchControl');
   myMap.controls.remove('fullscreenControl');
   myMap.controls.remove('rulerControl');

   myMap.geoObjects.add(myPlacemark);

   window.addEventListener('resize', function () {
      const newIconImageSize = window.innerWidth < 768 ? [80, 107] : [170, 200];
      const newIconImageOffset = window.innerWidth < 768 ? [-42.5, -105] : [-85, -200];

      myPlacemark.options.set({
         iconImageSize: newIconImageSize,
         iconImageOffset: newIconImageOffset,
      });
   });
}


/*==========================================================================
Cookies
============================================================================*/
(function () {
   const banner = document.getElementById('cookieBanner');
   const acceptBtn = document.getElementById('cookieAccept');
   const STORAGE_KEY = 'cookie_consent';

   if (localStorage.getItem(STORAGE_KEY)) return;

   setTimeout(() => {
      banner.classList.add('show');
   }, 500);

   function hideBanner() {
      banner.classList.remove('show');
   }

   acceptBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      hideBanner();
   });

})();

/*==========================================================================
Init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initSubmenu();
   initLangDropdown();
   initProductsCarousel();
   initFooterSubmenu();
   initGallerySliders();
   initFilter();
   initFilterUI();
   initProductAccordion();
   initProductSwipe();
   initProductReadMore();
   checkReadMoreVisibility();
   initAboutSliders();
   moreSlider();
   initFaqAccordion();
   initGiftSlider();
   contactsSlider();
   initHideHeaderOnScroll();
   initProductGalleryMobile();

})





/*==========================================================================
TEST REQUEST SEND
============================================================================*/
function initRequestForm() {
   const form = document.querySelector('.request__form');
   const body = document.querySelector('.request__body');
   const success = document.querySelector('.request__success');

   if (!form || !body || !success) return;

   form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
         form.reportValidity();
         return;
      }

      body.classList.add('is-hidden');
      success.classList.add('is-visible');
   });
}

initRequestForm();
})();

/******/ })()
;