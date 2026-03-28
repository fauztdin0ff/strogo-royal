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
Observer Animation
============================================================================*/
/* if (document.readyState === "complete") {
   init();
} else {
   window.addEventListener("load", init);
}

function init() {
   function onEntry(entry) {
      entry.forEach(change => {
         if (change.isIntersecting) {
            change.target.classList.add('element-show');
         }
      });
   }

   let options = { threshold: [0.4] };
   let observer = new IntersectionObserver(onEntry, options);
   let elements = document.querySelectorAll('.element-animation');
   for (let elm of elements) {
      observer.observe(elm);
   }
} */

/*==========================================================================
Swiper slider
============================================================================*/
/* const reviewsSlider = document.querySelector(".reviews__slider");

if (reviewsSlider) {
   const reviewsSwiper = new Swiper(reviewsSlider, {
      slidesPerView: 1,
      loop: true,
      freeMode: false,
      parallax: true,
      speed: 800,
      pagination: {
         el: ".reviews__slider-pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".reviews__slide-next",
         prevEl: ".reviews__slide-prev",
      },
   });
}
 */


/*==========================================================================
Submenu
============================================================================*/
function initSubmenu() {
   const isTouch = window.matchMedia('(hover: none)').matches;
   const items = document.querySelectorAll('.menu__item');

   items.forEach(item => {
      const label = item.querySelector('.menu__label');
      const submenu = item.querySelector('.submenu');
      const backBtn = item.querySelector('.submenu__back');

      if (!label || !submenu) return;

      const baseTitle = label.textContent.trim();

      // ===== DESKTOP (hover) =====
      if (!isTouch) {
         item.addEventListener('mouseenter', () => {
            label.classList.add('active');
            submenu.classList.add('show');
         });

         item.addEventListener('mouseleave', () => {
            label.classList.remove('active');
            submenu.classList.remove('show');
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
            });
         });

         // ===== BACK BUTTON =====
         if (backBtn) {
            backBtn.addEventListener('click', () => {

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

                  return;
               }
               submenu.classList.remove('show');
               label.classList.remove('active');
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
Init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initSubmenu();
   initLangDropdown();
   initProductsCarousel();
})
})();

/******/ })()
;