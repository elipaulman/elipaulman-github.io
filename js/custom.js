$(function () {
    'use strict';
  
    // MENU
    $('.navbar .nav-link').on('click', function () {
      $(".navbar-collapse").collapse('hide');
    });

    // Throttled scroll handler for better performance
    var scrollTimeout;
    var skillsAnimationTriggered = false;

    $(window).on('scroll', function () {
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Throttle scroll events (only run every 15ms)
      scrollTimeout = setTimeout(function() {
        var scrollTop = $(window).scrollTop();

        /*----------------------------------------------------*/
        /*  Navigation Menu Scroll
        /*----------------------------------------------------*/
        if (scrollTop > 72) {
          $(".navbar").addClass("scroll");
        } else {
          $(".navbar").removeClass("scroll");
        }

        /*----------------------------------------------------*/
        /*  Skills Animation Trigger
        /*----------------------------------------------------*/
        if (!skillsAnimationTriggered) {
          var skillsSection = $('#skills');
          if (skillsSection.length) {
            var skillsOffset = skillsSection.offset().top - $(window).height() + 100;

            if (scrollTop > skillsOffset) {
              skillsAnimationTriggered = true;
              $('.skill-item').each(function (i) {
                var $this = $(this);
                setTimeout(function () {
                  $this.addClass('animate');
                }, 150 * (i + 1));
              });
            }
          }
        }
      }, 15);
    });
  
    // TESTIMONIALS CAROUSEL
    $('#testimonials-carousel').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        900: {
          items: 2,
        },
        1200: {
          items: 3,
          loop: false
        }
      }
    });
  
    // EXPERIENCE CAROUSEL
    $('#experience-carousel').owlCarousel({
      loop: true,
      margin: 10,
      dots: true,
      autoplay: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        900: {
          items: 2,
        },
        1200: {
          items: 3,
          loop: false
        }
      }
    });
  
    // PROJECTS CAROUSEL
    $('#projects-carousel').owlCarousel({
      loop: true,
      margin: 20,
      autoplay: false,
      dots: true,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          margin: 20
        },
        900: {
          items: 2,
          margin: 20
        },
        1200: {
          items: 3,
          margin: 25,
          loop: false
        }
      }
    });
  
    // SMOOTHSCROLL
    $('.navbar .nav-link').on('click', function (event) {
      event.preventDefault();

      var $anchor = $(this);
      var targetOffset = $($anchor.attr('href')).offset().top - 49;

      // Disable CSS smooth scroll during jQuery animation
      $('html').addClass('js-scrolling');

      $('html, body').stop().animate({
        scrollTop: targetOffset
      }, {
        duration: 300,
        complete: function() {
          // Re-enable CSS smooth scroll after animation
          $('html').removeClass('js-scrolling');
        }
      });
    });

    // FAQ SCROLL FIX - Prevent auto-scrolling when cards open/close on mobile
    $(document).on('show.bs.collapse hide.bs.collapse', '.faq .collapse', function(e) {
      // Add class to disable smooth scrolling during animation
      $('html').addClass('faq-animating');

      // Store the current scroll position
      var scrollPos = $(window).scrollTop();
      var $card = $(this).closest('.card');
      var cardTop = $card.offset().top;
      var navbarHeight = $('.navbar').outerHeight() || 80;

      // If the card is being shown and is below the current viewport
      if (e.type === 'show') {
        // Use setTimeout to execute after Bootstrap's internal scroll
        setTimeout(function() {
          // Only adjust scroll if user is already viewing the FAQ section
          // and the card opening would push content significantly
          var currentScroll = $(window).scrollTop();
          var cardVisibleTop = cardTop - navbarHeight - 20;

          // If the card header is above the visible area or too close to top
          if (currentScroll > cardVisibleTop - 50) {
            $('html, body').stop().animate({
              scrollTop: cardVisibleTop
            }, 300);
          }
        }, 50);
      }

      // Remove class after animation completes
      setTimeout(function() {
        $('html').removeClass('faq-animating');
      }, 400);
    });

    // Improved FAQ collapse behavior - smooth animations
    $(document).on('shown.bs.collapse', '.faq .collapse', function() {
      var $card = $(this).closest('.card');
      var $button = $card.find('[data-toggle="collapse"]');

      // Add visual feedback
      $button.addClass('expanded');
    });

    $(document).on('hidden.bs.collapse', '.faq .collapse', function() {
      var $card = $(this).closest('.card');
      var $button = $card.find('[data-toggle="collapse"]');

      // Remove visual feedback
      $button.removeClass('expanded');
    });
  });