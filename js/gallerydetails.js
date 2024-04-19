$(document).ready(function () {
  // fadein and fadeout animation when hover on image in gallery section
  $(".tile, .recomendation-sub div")
    .on("mouseenter", function () {
      $(this).find(".overlay").fadeIn();
      $(this)
        .find(".imgTile, .recomendation-img")
        .css("transform", "scale(1.5)");
    })
    .on("mouseleave", function () {
      $(this).find(".overlay").fadeOut();
      $(this).find(".imgTile, .recomendation-img").css("transform", "scale(1)");
    });
});
