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

    wrapperMenu.addEventListener('click', function() {
        wrapperMenu.classList.toggle('open');

        var toggleWidth = $(".drawer-layout").width() == 250
            ? "0px"
            : "250px";
        console.log(toggleWidth);
        $('.drawer-layout').animate({width: toggleWidth});

        $('body').toggleClass('hideScrollbars');

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
