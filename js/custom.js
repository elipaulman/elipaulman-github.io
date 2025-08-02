$(function () {
    'use strict';
  
    // MENU
    $('.navbar .nav-link').on('click', function () {
      $(".navbar-collapse").collapse('hide');
    });
  
    $(window).on('scroll', function () {
  
      /*----------------------------------------------------*/
      /*  Navigation Menu Scroll
      /*----------------------------------------------------*/
  
      var b = $(window).scrollTop();
  
      if (b > 72) {
        $(".navbar").addClass("scroll");
      } else {
        $(".navbar").removeClass("scroll");
      }
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
      margin: 10,
      autoplay: false,
      dots: true,
      nav: false,
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
  
    // SMOOTHSCROLL
    $('.navbar .nav-link').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1000);
      event.preventDefault();
    });
  
    // Skills Section Animation
    function skillsAnimation() {
      var skillsSection = $('#skills'); // Updated to select by ID
      if (skillsSection.length) {
        var skillsOffset = skillsSection.offset().top - $(window).height() + 100; // Trigger a bit before
  
        if ($(window).scrollTop() > skillsOffset) {
          $('.skill-item').each(function (i) {
            var $this = $(this);
            setTimeout(function () {
              $this.addClass('animate');
            }, 150 * (i + 1)); // Stagger the animations
          });
        }
      }
    }
  
    // Initial check on document ready
    skillsAnimation();
  
    // Scroll event listener
    $(window).on('scroll', skillsAnimation);
  });