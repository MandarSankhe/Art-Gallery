$(document).ready(() => {
  /* Animate on Scroll
     
    https://github.com/michalsnik/aos */
  AOS.init({
    duration: 1200,
    mirror: true,
  });

  function changecolor() {
    let scrollPosition = $(window).scrollTop();
    if (scrollPosition >= 280) {
      // Apply CSS changes when scrolled past 500px
      $(".navbar").css("background-color", "#071804");
    } else {
      // Reset CSS changes when scrolled back up
      $(".navbar").css("background-color", "rgb(0, 0, 0, 0.50)");
    }
  }
  changecolor();

  $(window).scroll(function () {
    changecolor();
  });

  // SLIDER FUNCTIONALITY

  // get card width dynamically
  cardWidth = $(".slide-card").width();
  // next-arrow
  $("#next-arrow").click(function (event) {
    event.preventDefault();
    var firstChildAppend = $(".slide-card:first-child()");
    $(".slide-card").animate({ left: -cardWidth }, function () {
      $(".slider-wrap").append(firstChildAppend);
      $(".slide-card").css({
        left: 0,
      });
    });
  });
  // previous-arrow
  $("#previous-arrow").click(function (event) {
    event.preventDefault();
    var lastChildPrepend = $(".slide-card:last-child()");
    $(".slide-card").animate({ left: cardWidth }, function () {
      $(".slider-wrap").prepend(lastChildPrepend);
      $(".slide-card").css({
        left: 0,
      });
    });
  });
});
