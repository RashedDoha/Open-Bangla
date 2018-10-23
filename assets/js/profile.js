$(document).ready(function () {
    'use strict';

    // Scroll Navbar
    $(window).on('scroll', function() {
      if($(document).scrollTop() > 10) {
        $('.navbar').addClass('nav-scroll');
      }
      else {
      $('.navbar').removeClass('nav-scroll');
      };
    });

    //smoothly Scroll To Element
    $('.navbar-nav li a').on('click', function(e) {
       e.preventDefault();
       $('html, body').animate({
          scrollTop: $('#' + $(this).data('scroll')).offset().top + 1
       }, 1000);
    });

    // Sync Links With Sections
    $(window).on('scroll', function(){
      $('section').each(function() {
        if($(window).scrollTop() > $(this).offset().top) {
          var secID = $(this).attr('id');
          $('.navbar-nav li a').removeClass('active-li')
          $('.navbar-nav li a[data-scroll="' + secID + '"]').addClass('active-li');
        }
      })
    });

    // Scroll Too Top
    $('.scroll-top').on('click', function () {$('html, body').animate({scrollTop: 0}, 1000); });

    $(window).on('scroll', function(){
        if ($(this).scrollTop() > 600) {
            $('.scroll-top').fadeIn('slow');
        } else {
            $('.scroll-top').fadeOut('slow');
        }
    });
});