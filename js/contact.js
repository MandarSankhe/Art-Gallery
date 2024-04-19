$(document).ready(function () {
  // move focus to first text box
  $("#name").focus();

  // the handler for the click event of the submit button
  $("#contact_form").submit((event) => {
    let isValid = true;

    // validate the name
    const username = $("#name").val();
    if (username == "") {
      $("#name").next().text("The Name field is required.");
      isValid = false;
    } else {
      $("#name").next().text("");
    }
    $("#name").val(username);

    // validate the email entry with a regular expression
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    const email = $("#email").val().trim();
    if (email == "") {
      $("#email").next().text("The email field is required.");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $("#email").next().text("Must be a valid email address.");
      isValid = false;
    } else {
      $("#email").next().text("");
    }
    $("#email").val(email);

    //validate phone number
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    const phone = $("#phone").val().trim();
    if (phone == "") {
      $("#phone").next().text("Phone number field is required.");
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      $("#phone").next().text("Must be a valid phone number.");
      isValid = false;
    } else {
      $("#phone").next().text("");
    }
    $("#phone").val(phone);

    //  validate subject
    const subject = $("#subject").val().trim();
    if (subject == "") {
      $("#subject").next().text("Subject is required.");

      isValid = false;
    } else {
      $("#subject").next().text("");
    }
    $("#subject").val(subject);

    //  validate message
    const message = $("#subject").val().trim();
    if (message == "") {
      $("#message").next().text("Message is required.");
      isValid = false;
    } else {
      $("#message").next().text("");
    }
    $("#message").val(message);

    // prevent the submission of the form if any entries are invalid
    event.preventDefault();
    if (isValid) {
      $("#success").text("Successfully sent the message");
      // form reset after submission
      $("#contact_form")[0].reset();
    }
  });

  // variables for keeping the elements
  var allAccordions = $(".accordion p");
  var allAccordionItems = $(".accordion .acc-handle");
  var allAccordionItemsI = $(".accordion .acc-handle i");

  //accordion open and close on click the heading
  $(".accordion .acc-handle").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
      $(this).find("p").slideUp("slow");
    } else {
      allAccordions.slideUp("slow");
      allAccordionItems.removeClass("active");
      $(this).addClass("active");
      $(this).find("p").slideDown("slow");
      allAccordionItemsI.removeClass("fa-angle-up").addClass("fa-angle-down");
      $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
      return false;
    }
  });
});
