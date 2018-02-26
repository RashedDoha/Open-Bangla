$(document).ready(function() {
    var entryStates = [false, false, false, false, false];
    var wrapperMenu = document.querySelector('.hamburger');
    $home = $('nav#header-menu > a:nth-child(1)');
    $learn = $('nav#header-menu > a:nth-child(2)');
    $dataset = $('nav#header-menu > a:nth-child(3)');
    $contribute = $('nav#header-menu > a:nth-child(4)');
    $affiliate = $('nav#header-menu > a:nth-child(5)');
    elems = [$learn, $dataset, $contribute, $affiliate];
    $currentElem = null;
    $previousScroll = 0;

    springImages();
    fillDigits();
    var canvasDiv = document.getElementById('canvasDiv');
    var canvas = document.createElement('canvas');
    var canvasWidth = 170;
    var canvasHeight = 230;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    var context = canvas.getContext("2d");

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    var press = function(e) {
            var mouseX = (e.changedTouches
                    ? e.changedTouches[0].pageX
                    : e.pageX) - this.offsetLeft,
                mouseY = (e.changedTouches
                    ? e.changedTouches[0].pageY
                    : e.pageY) - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        },

        drag = function(e) {
            var mouseX = (e.changedTouches
                    ? e.changedTouches[0].pageX
                    : e.pageX) - this.offsetLeft,
                mouseY = (e.changedTouches
                    ? e.changedTouches[0].pageY
                    : e.pageY) - this.offsetTop;
            if (paint) {
                addClick(mouseX, mouseY, true);
                redraw();
            }
            e.preventDefault();
        },

        release = function() {
            paint = false;
            redraw();
        },

        cancel = function() {
            paint = false;
        };

    // Add mouse event listeners to canvas element
    canvas.addEventListener("mousedown", press, false);
    canvas.addEventListener("mousemove", drag, false);
    canvas.addEventListener("mouseup", release);
    canvas.addEventListener("mouseout", cancel, false);

    canvas.addEventListener("touchstart", press, false);
    canvas.addEventListener("touchmove", drag, false);
    canvas.addEventListener("touchend", release, false);
    canvas.addEventListener("touchcancel", cancel, false);

    $('.clear-canvas').on('click', function() {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        context.clearRect(0, 0, canvasWidth, canvasHeight);

    });

    $('.submit-char').on('click', function() {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        writeMessage("Thanks!");
    });

    function writeMessage(msg) {
        context.fillStyle = '#df4b26';
        context.font = "30px Raleway";
        context.fillText(msg, 10, 100);
    }

    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }

    wrapperMenu.addEventListener('click', function() {
        wrapperMenu.classList.toggle('open');

        var toggleWidth = $(".drawer-layout").width() == 250
            ? "0px"
            : "250px";
        console.log(toggleWidth);
        $('.drawer-layout').animate({width: toggleWidth});

        $('body').toggleClass('hideScrollbars');

    });

    // $('.image-column > img').each(function(image, elem) {
    //     $top = $(elem).position().top;
    //     $updated = $top - 250;
    //     $(elem).css('top', $updated);
    // });

    // $bottom = $('.section-image:last-child').position().top + $('.image-column:nth-child(1)').height();
    // $newelem = $('.image-column').clone();
    // $newelem.css('top', $bottom);
    // $('#dataset .section-image').append($newelem);

    // Implement slider in mobile

    $(window).scroll(function() {
        $pos = $(window).scrollTop();
        if ($(window).width() <= 767) {
            if ($pos > $previousScroll) {
                console.log("Scrolling Down");
                if ($pos + $(window).height() >= $('#affiliate').position().top && $pos <= $('footer').position().top) {
                    $('#affiliate .section-image .image-row > img').css('transform', 'translateX(-150px)');
                }
            } else if ($pos < $previousScroll) {
                console.log("Scrolling Up");
                if ($pos < $('footer').position().top && $pos >= $('#affiliate').position().top) {

                    $('#affiliate .section-image .image-row > img').css('transform', 'translateX(200px)');
                }
            }

            $previousScroll = $pos;
        }
        if ($pos + $(window).height() - 300 >= $('#contribute').position().top && $pos <= $('#affiliate').position().top - 300) {
            if (!$('.topLeftLand').hasClass('activeTopLeft')) {
                $('.topLeftLand').addClass('activeTopLeft');
            }

            if (!$('.bottomRightLand').hasClass('activeBottomRight')) {
                $('.bottomRightLand').addClass('activeBottomRight');
            }
        } else {
            $('.landingImage').removeClass('activeTopLeft');
            $('.landingImage').removeClass('activeBottomRight');
        }
        //     // Scroll Down
        //     $scrolledInto = $pos + $(window).height() - $('#datasetLink').offset().top;
        //
        //     if($scrolledInto >= 0 && $pos <= $('#contributeLink').offset().top) {
        //         console.log("Scrolling Down");
        //         // $('.image-column > img').each(function(image, elem) {
        //         //     $top = $(elem).position().top;
        //         //     $updated = $top - $scrolledInto*0.01;
        //         //     $(elem).css('top', $updated);
        //         // });
        //
        //         $top = $('.image-column').position().top;
        //         $updated = $top - $scrolledInto*0.001;
        //         $('.image-column').css('top', $updated);
        //
        //     }
        // }
        // else {
        //     // Scroll Up
        //     $scrolledInto = $('#contributeLink').offset().top - $pos;
        //     if($pos + $(window).height() >= $('#datasetLink').offset().top && $pos <= $('#contributeLink').offset().top) {
        //         console.log("Scrolling Up");
        //         // $('.image-column > img').each(function(image, elem) {
        //         //     $top = $(elem).position().top;
        //         //     $updated = $top + $scrolledInto*0.01;
        //         //     $(elem).css('top', $updated);
        //         // });
        //
        //         $top = $('.image-column').position().top;
        //         $updated = $top + $scrolledInto*0.001;
        //         $('.image-column').css('top', $updated);
        //
        //
        //
        //     }

    });

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]').not('[href="#0"]').click(function(event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
                ? target
                : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

});

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function springImages() {
    var imagePos = shuffle([0, 1, 2, 3]);
    $('.sprung-image').each(function(index, el) {
        var choice = imagePos[index];
        if (choice == 0) {
            $(el).addClass('sprung-image-tr');
        } else if (choice == 1) {
            $(el).addClass('sprung-image-tl');
        } else if (choice == 2) {
            $(el).addClass('sprung-image-br');
        } else {
            $(el).addClass('sprung-image-bl');
        }

    });

    $('.sprung-image-tr').css('top', '20px');
    $('.sprung-image-tr').css('left', '10px');
    $('.sprung-image-tr').css('transform', 'rotate(30deg)');

    $('.sprung-image-tl').css('top', '20px');
    $('.sprung-image-tl').css('right', '10px');
    $('.sprung-image-tl').css('transform', 'rotate(-30deg)');

    $('.sprung-image-br').css('bottom', '20px');
    $('.sprung-image-br').css('left', '10px');
    $('.sprung-image-br').css('transform', 'rotate(30deg)');

    $('.sprung-image-bl').css('bottom', '20px');
    $('.sprung-image-bl').css('right', '10px');
    $('.sprung-image-bl').css('transform', 'rotate(-30deg)');

    $('.sprung-image').css('opacity', 1);

}

function fillDigits() {
    var digits = [
        '০',
        '১',
        '২',
        '৩',
        '৪',
        '৫',
        '৬',
        '৭',
        '৮',
        '৯'
    ];
    var choice = Math.floor(Math.random() * 10);

    $('.bengali-numeral').text(digits[choice]);
}

function setUpHighLights() {
    $('#sketchboard').on('scrollSpy:enter', function() {
        removeAllHighlights();
        $learn.css('border-bottom', '2px solid white');
    });

    $('#learn .section-body').on('scrollSpy:enter', function() {
        removeAllHighlights();
        $learn.css('border-bottom', '2px solid white');
    });

    $('#dataset').on('scrollSpy:enter', function() {
        removeAllHighlights();
        $dataset.css('border-bottom', '2px solid white');
    });

    $('#contribute').on('scrollSpy:enter', function() {
        removeAllHighlights();
        $contribute.css('border-bottom', '2px solid white');
    });

    $('#affiliate').on('scrollSpy:enter', function() {
        removeAllHighlights();
        $affiliate.css('border-bottom', '2px solid white');
    });

    $('#sketchboard').scrollSpy();
    $('#learn .section-body').scrollSpy();
    $('#dataset').scrollSpy();
    $('#contribute').scrollSpy();
    $('#affiliate').scrollSpy();
}

function removeAllHighlights() {
    $(elems).each(function(index) {
        $(elems)[index].css('border', '0px');
    });
}
