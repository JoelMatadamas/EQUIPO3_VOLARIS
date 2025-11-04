// Initialize Swiper after DOM is ready and add diagnostic logs to help debugging
// If this script is run in a non-browser environment (e.g. Node) avoid using `document`
if (typeof document === 'undefined' || typeof window === 'undefined') {
  // Provide a friendly warning when someone tries to run this file with Node
  // (VS Code's "Run" on a JS file often executes it with Node, which doesn't have DOM globals).
  console.warn('[info] script.js running outside browser environment — skipping Swiper initialization');
} else {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[debug] DOMContentLoaded — checking Swiper availability...');

    // Is the Swiper constructor available?
    console.log('[debug] Swiper type:', typeof Swiper);

    const container = document.querySelector('.swiper');
    console.log('[debug] .swiper container found:', !!container, container);

    const wrapper = container ? container.querySelector('.swiper-wrapper') : null;
    console.log('[debug] .swiper-wrapper found inside container:', !!wrapper, wrapper);

    const slides = wrapper ? wrapper.querySelectorAll('.swiper-slide') : [];
    console.log('[debug] .swiper-slide count:', slides.length);

    if (typeof Swiper !== 'function') {
      console.error('[error] Swiper is not available. Check that the Swiper script is loaded before script.js');
      return;
    }

    if (!container) {
      console.error('[error] No element with class ".swiper" found. Make sure your HTML has the correct container.');
      return;
    }

    if (slides.length === 0) {
      console.warn('[warn] No slides (.swiper-slide) found. Swiper will still initialize but nothing to swipe.');
    }

    const swiper = new Swiper(container, {
      direction: 'horizontal',
      loop: true,

      //bullet/paginación 
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,


      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {

        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        
        992: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 20,
        }

      }

    });

    console.log('[debug] Swiper instance created:', !!swiper, swiper);
  });
}