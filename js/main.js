$(document).ready(() => {
  const carousel = $("#carouselExampleDark");
  const captions = carousel.find(".carousel-caption");

  captions.css({
    bottom: "-100%",
    animation: "slideUp 0.8s ease-in-out forwards",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    height: "60%",
  });

  const carousel1 = new bootstrap.Carousel(carousel, {
    interval: 2200,
    pause: false,
  });

  function changecolor() {
    let scrollPosition = $(window).scrollTop();
    if (scrollPosition >= 580) {
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

  /* Animate on Scroll
    
    https://github.com/michalsnik/aos */
  AOS.init({
    duration: 1200,
    mirror: true,
  });
});
