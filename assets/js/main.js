$(document).ready(function() {

    var wrapperMenu = document.querySelector('.hamburger');

    wrapperMenu.addEventListener('click', function() {
        wrapperMenu.classList.toggle('open');

        var toggleWidth = $(".drawer-layout").width() == 250
            ? "0px"
            : "250px";
        console.log(toggleWidth);
        $('.drawer-layout').animate({width: toggleWidth});

        $('body').toggleClass('hideScrollbars');

    });

    // Scrollax
    $.Scrollax();


    // loader
    var loader = function() {
        setTimeout(function() { 
            if($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    $(window).stellar({
        responsive: false,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
      });

    $('.slider-text').each(function(index, slide) {
        if(index % 2 == 0 ) $(slide).addClass('caption-reverse');
    });

    var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1,
	        nav:false
	      },
	      600:{
	        items:1,
	        nav:false
	      },
	      1000:{
	        items:1,
	        nav:false
	      }
	    }
	   });


		$('.carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
			center: true,
            loop: true,
            autoplay: true,
            autoplayHoverPause: false,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 1
				}
			}
		});

		$('.carousel1').owlCarousel({
			loop: false,
			items:1,
			margin: 30,
			stagePadding: 10,
			nav: false,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

		$('.carousel-engine').owlCarousel({
			loop: false,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 4
				}
			}
		});
	};
    carousel();
    
    var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

});