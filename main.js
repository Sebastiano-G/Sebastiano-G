$(document).ready(function () {

  $('nav a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if (target.length) {
      const offset = 80;
      $('html, body').animate({
        scrollTop: target.offset().top - offset
      }, 500);
    }
  });

  const $progressBar = $('#scroll-progress');
  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = (scrollTop / docHeight) * 100;
    $progressBar.css('width', progress + '%');
  });

  const $links = $('nav a[href^="#"]');

  const $targets = $links.map(function () {
    return $($(this).attr('href'))[0];
  }).get();

  function updateActiveLink() {
    const pos = $(document).scrollTop();
    const offset = 120;
    let found = false;

    for (let i = 0; i < $targets.length; i++) {
      const el = $targets[i];
      if (!el) continue;

      const $el = $(el);
      const top = $el.offset().top - offset;
      const bottom = top + $el.outerHeight();
      const id = el.id;

      if (pos >= top && pos < bottom) {
        $links.removeClass('active');
        $(`nav a[href="#${id}"]`).addClass('active');
        found = true;
        break;
      }
    }

    if (!found) {
      $links.removeClass('active');
      $('nav a[href="#home"]').addClass('active');
    }
  }

  $(window).on('scroll', updateActiveLink);
  updateActiveLink();
  const $navbar = $('.glass-navbar');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }
  });

  $('.project-card, .pub-card').on('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    $(this).css('--x', `${x}px`);
    $(this).css('--y', `${y}px`);
  });


  const $filterButtons = $(".projects-menu-item");
  const $projectCards = $(".project-card");

  $filterButtons.on("click", function () {
    const filter = this.id;
    const isSelected = $(this).hasClass("selected");

    $filterButtons.removeClass("active selected");

    if (isSelected) {
      $projectCards.stop(true).fadeIn(200);
      return;
    }

    $(this).addClass("active selected");

    $projectCards.each(function () {
      const match = $(this).data("id") === filter;
      if (match) {
        $(this).stop(true).fadeIn(200);
      } else {
        $(this).stop(true).fadeOut(200);
      }
    });
  });

});


(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.18 });

  const elements = document.querySelectorAll(
    '.container, .main-text, h2, h3, h4, .project-card, .pub-item, section'
  );

  elements.forEach(el => observer.observe(el));
})();
