//"use strict";
//$(document).ready(() => {
//    // create an array of the slide images
//    let imageCache = [];
//    $("#slides img").each((index, img) => {
//        const image = new Image();
//        image.src = $(img).attr("src");
//        image.title = $(img).attr("alt");
//        imageCache[index] = image;
//    });
//    // start slide show
//    let imageCounter = 0;
//    setInterval(() => {
//        $("#caption").fadeOut(1000);
//        $("#slide").fadeOut(1000,
//            () => {
//                imageCounter = (imageCounter + 1) %
//                    imageCache.length;
//                const nextImage = imageCache[imageCounter];
//                $("#slide").attr("src",
//                    nextImage.src).fadeIn(1000);
//                $("#caption").text(nextImage.title).fadeIn(1000);
//            }); // end fadeOut() method
//    },
//        3000); // end setInterval() method
//});

$(document).ready(() => {

    //$("#image_list a").hover(
    //    evt => $(evt.currentTarget).stop(true).animate(
    //        { top: 15 }, "fast"),
    //    evt => $(evt.currentTarget).stop(true).animate(
    //        { top: 0 }, "fast")
    //);

    //$("#image_list a").hover(
    //    $("#image_list a").delay(2000).animate(
    //        { top: 15 }, "fast"),
    //);

    //$("#image_list a").delay(1000).animate(
    //    { top: 15 }, "fast");

    let p = [];
    for (i = 0; i < 100; i++) {


        $("#image_list a").each(function (index) {
            p[index] = index;
            $(this).delay(index * 200).animate(
                { top: 15 }, "easeIn");
        });

        for (j = (p.length -1) ; j > 0; j--)
            $("#image_list a").delay(p[j-4] * 200).animate({ top: 0 }, "easeOut")
    }

});





//"use strict";
//$(document).ready(() => {
//    let nextSlide = $("#slides img:first-child");
//    // start slide show
//    setInterval(() => {
//        $("#caption").fadeOut(1000);
//        $("#slide").fadeOut(1000,
//            () => {
//                if (nextSlide.next().length == 0) {
//                    nextSlide =
//                        $("#slides img:first-child");
//                }
//                else {
//                    nextSlide = nextSlide.next();
//                }
//                const nextSlideSource =
//                    nextSlide.attr("src");
//                const nextCaption =
//                    nextSlide.attr("alt");
//                $("#slide").attr("src",
//                    nextSlideSource).fadeIn(1000);
//                $("#caption").text(
//                    nextCaption).fadeIn(1000);
//            }); // end fadeOut() method
//    },
//        3000); // end setInterval() method
//});




//"use strict";
//$(document).ready(() => {
//    let nextSlide = $("#slides img:first-child");
//    // the function for running the slide show
//    const runSlideShow = () => {
//        $("#caption").fadeOut(1000);
//        $("#slide").fadeOut(1000,
//            () => {
//                if (nextSlide.next().length == 0) {
//                    nextSlide = $("#slides img:first-child");
//                } else {
//                    nextSlide = nextSlide.next();
//                }
//                const nextSlideSource = nextSlide.attr("src");
//                const nextCaption = nextSlide.attr("alt");
//                $("#slide").attr("src",
//                    nextSlideSource).fadeIn(1000);
//                $("#caption").text(nextCaption).fadeIn(1000);
//            }
//        ); // end fadeOut() method
//    }; // end runSlideShow() arrow function
//    // start slide show
//    let timer1 = setInterval(runSlideShow, 3000);
//    // starting and stopping the slide show
//    $("#slide").click(() => {
//        if (timer1 != null) {
//            clearInterval(timer1); // stop
//            timer1 = null;
//        }
//        else {
//            runSlideShow(); // start immediately
//            // change every 3 seconds
//            timer1 = setInterval(runSlideShow, 3000);
//        }
//    });
//});