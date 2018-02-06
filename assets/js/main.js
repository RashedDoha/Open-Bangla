$(document).ready(function() {
    var wrapperMenu = document.querySelector('.hamburger');

    wrapperMenu.addEventListener('click', function(){
      wrapperMenu.classList.toggle('open');

      var toggleWidth = $(".drawer-layout").width() == 250 ? "0px" : "250px";
      console.log(toggleWidth);
      $('.drawer-layout').animate({
         width: toggleWidth
      });

      $('body').toggleClass('hideScrollbars');


  });


});
