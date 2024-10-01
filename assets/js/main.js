const header = document.querySelector('header');

let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah
        header.classList.add('header-hidden');
    } else {
        // Scroll ke atas
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop;
});


(function () {
  "use strict";
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  window.addEventListener('load', aosInit);
  const selectTyped_2 = document.querySelector('.typed-2');
  if (selectTyped_2) {
    let typed_strings = selectTyped_2.getAttribute('data-typed-items-2');
    typed_strings = typed_strings.split(',');
    new Typed('.typed-2', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  new PureCounter();

  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();


const elems = document.querySelectorAll('.elem');
const fixedImage = document.getElementById('fixed-imagee');

// Initially set the fixed image to be hidden
fixedImage.classList.add('hidden');
fixedImage.style.display = 'none'; // Ensure it's not displayed at all

elems.forEach(elem => {
    elem.addEventListener('mouseover', (event) => {
        const imageUrl = elem.getAttribute('data-image');
        fixedImage.style.backgroundImage = `url(${imageUrl})`;
        fixedImage.classList.remove('hidden'); // Remove hidden class to show the image
        fixedImage.style.display = 'block'; // Make sure it's displayed
        
        // Trigger the animation
        fixedImage.style.animation = 'pop-up 0.7s ease forwards'; // Start animation
        updateImagePosition(event); // Update position on hover
    });

    elem.addEventListener('mouseleave', () => {
        fixedImage.classList.add('hidden'); // Add hidden class to hide the image
        fixedImage.style.display = 'none'; // Hide the image again
        fixedImage.style.animation = ''; // Reset animation
    });

    elem.addEventListener('mousemove', (event) => {
        updateImagePosition(event); // Update position while moving
    });
});

// Function to update position of the fixed image
function updateImagePosition(event) {
    fixedImage.style.left = `${event.clientX}px`;
    fixedImage.style.top = `${event.clientY - 150}px`; // Adjust position as needed
}

// Ensure that the fixed image is hidden upon page load
window.addEventListener('load', () => {
    fixedImage.classList.add('hidden'); // Ensure the hidden class is applied
    fixedImage.style.display = 'none'; // Ensure it's not displayed
});


// Ambil elemen gambar dan teks hover
const img = document.querySelector('.hero-img');
const hoverText = document.getElementById('hover-text');

// Event listener untuk hover di gambar
img.addEventListener('mousemove', function(event) {
  // Tampilkan teks hover
  hoverText.style.display = 'block';

  // Perbarui posisi teks sesuai dengan posisi kursor
  hoverText.style.left = event.pageX + 'px';
  hoverText.style.top = event.pageY + 'px';
});

// Event listener untuk keluar dari hover
img.addEventListener('mouseleave', function() {
  // Sembunyikan teks saat tidak di-hover
  hoverText.style.display = 'none';
});


function loaderAnimation() {
  var loader = document.querySelector("#loader")
  setTimeout(function () {
      loader.style.top = "-100%"
  }, 4200)
}

loaderAnimation()