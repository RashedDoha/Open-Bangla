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
