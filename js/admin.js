$(document).ready(async function () {
  // Paste here your copied configuration code
  const firebaseConfig = {
    apiKey: "AIzaSyBY1wnS-gYjCQcpRrcg7S4Tt0P2Jv5X5zA",
    authDomain: "js-group-b0538.firebaseapp.com",
    projectId: "js-group-b0538",
    storageBucket: "js-group-b0538.appspot.com",
    messagingSenderId: "1043447951110",
    appId: "1:1043447951110:web:a362b050778e6956c53887",
    measurementId: "G-HR7MYSJFDJ",
  };

  // supabase connection
  const SUPABASE_URL = "https://oauaucggrtjcwwiwdqgo.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdWF1Y2dncnRqY3d3aXdkcWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzNTU3MzYsImV4cCI6MjAyNzkzMTczNn0.R8_zyZcUnAYy93dzMSQ-kdcSeQ3h5bsTON2puRqUN24";

  const supabaseDb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  let { data: gallery, error } = await supabaseDb.from("gallery").select("*");

  $.each(gallery, function (index, item) {
    const artItemsContainer = $(".upload-sub");
    const portfolio = $("#portfolio");

    const truncatedContent = item.content.slice(0, 400) + "...";
    const itemHTML =
      '<div id="' +
      item.id +
      '">' +
      '<div class="reco-sections">' +
      '<img src="' +
      item.image_url +
      '" class="upload-img" />' +
      "</div>" +
      '<div class="edit-post">' +
      '<h2 class="title">' +
      item.title +
      "</h2>" +
      '<div class="edit-button"><i class="fa fa-edit"></i><i class="fa fa-trash"></i></div>' +
      "</div>" +
      '<h3 class="category">Category: ' +
      item.category +
      "</h3>" +
      '<h3 class="artists">Artists: ' +
      item.artists +
      "</h3>" +
      '<p class="collection-name">' +
      truncatedContent +
      "</p>" +
      "</div>";

    let className = "web";
    switch (item.category) {
      case "Fictional":
        className = "web";
        break;
      case "Nature":
        className = "flyers";
        break;
      case "History":
        className = "bcards";
        break;
      default:
        className = "web";
    }

    const portfolioHtml =
      '<div class="tile scale-anm ' +
      className +
      '" style="display: inline-block;" data-bound=""> ' +
      '<img src="' +
      item.image_url +
      '" alt="" class="imgTile" />' +
      '<div class="overlay">' +
      '<a href="details.html">VIEW</a>' +
      "</div>" +
      "</div>";
    artItemsContainer.append(itemHTML);
    portfolio.append(portfolioHtml);
  });

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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storageRef = firebase.storage().ref();

  $("#uploadForm").submit(function (event) {
    event.preventDefault();
    const file = $("#photo")[0].files[0];
    const title = $("#title").val();
    const content = $("#content").val();
    const category = $("#category").val();
    const artists = $("#artists").val();
    if (file && title && content) {
      uploadImage(file, title, content, category, artists);
    } else {
      alert("Please fill all fields");
    }
  });

  function uploadImage(file, title, content, category, artists) {
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type,
    };
    const imageRef = storageRef.child(name);

    imageRef.put(file, metadata).then(function (snapshot) {
      imageRef
        .getDownloadURL()
        .then(async (url) => {
          console.log(url);
          alert("Image uploaded successfully");

          const { data } = await supabaseDb
            .from("gallery")
            .insert([
              {
                image_url: url,
                title: title,
                content: content,
                category: category,
                artists: artists,
              },
            ])
            .select();

          $("#image").attr("src", url);
          window.location.reload();
        })
        .catch(console.error);
    });
  }

  $(".reco-sections")
    .on("mouseenter", function () {
      $(this).find(".overlay").fadeIn();
      $(this).find(".upload-img").css("transform", "scale(1.1)");
    })
    .on("mouseleave", function () {
      $(this).find(".overlay").fadeOut();
      $(this).find(".upload-img").css("transform", "scale(1)");
    });

  // When any "EDIT" button is clicked
  $(".upload-sub").on("click", ".fa-edit", async (event) => {
    const currentItem = $(event.currentTarget);
    const item = currentItem.closest(".edit-post");
    const imgSrc = item
      .prev(".reco-sections")
      .find("img.upload-img")
      .attr("src");

    const postId = $(event.currentTarget).closest("[id]").attr("id");

    let { data: gallery, error } = await supabaseDb
      .from("gallery")
      .select()
      .eq("id", postId);

    // Open the modal popup
    $(".edit-modal").css("display", "block");
    $(".upload-label #photo").css({
      display: "none",
    });
    $("#edit-title").val(gallery[0].title);
    $("#edit-category").val(gallery[0].category);
    $("#edit-artists").val(gallery[0].artists);
    $("#edit-content").val(gallery[0].content);
    $("#photo-preview").css({ display: "block", width: "20%" });
    $("#photo-preview").attr("src", imgSrc);

    $(".edit-modal").data("postId", postId).css("display", "block");
  });

  // When the close button or outside the modal is clicked
  $(".edit-modal .close, .edit-modal").on("click", function () {
    // Close the modal popup
    $(this).closest(".edit-modal").css("display", "none");
  });

  // Prevent closing modal when clicking inside it
  $(".edit-modal .edit-modal-content").on("click", function (event) {
    event.stopPropagation();
  });

  async function updatePostInSupabase(
    postId,
    updatedImage,
    updatedTitle,
    updatedContent,
    updatedCategory,
    updatedArtist,
    url
  ) {
    if (updatedImage) {
      const name = +new Date() + "-" + updatedImage.name;
      const metadata = {
        contentType: updatedImage.type,
      };
      const imageRef = storageRef.child(name);

      imageRef.put(updatedImage, metadata).then(function (snapshot) {
        imageRef
          .getDownloadURL()
          .then(async (url) => {
            const { data, error } = await supabaseDb
              .from("gallery")
              .update({
                image_url: url,
                title: updatedTitle,
                content: updatedContent,
                category: updatedCategory,
                artists: updatedArtist,
              })
              .eq("id", postId)
              .select();
            $("#image").attr("src", url);
            window.location.reload();
          })
          .catch(console.error);
      });
    } else {
      const { data, error } = await supabaseDb
        .from("gallery")
        .update({
          image_url: url,
          title: updatedTitle,
          content: updatedContent,
          category: updatedCategory,
          artists: updatedArtist,
        })
        .eq("id", postId)
        .select();
      window.location.reload();
    }
  }

  // update the post
  $("#edit-post").on("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    const postId = $(".edit-modal").data("postId");

    // Get the updated data from the form fields
    const updatedTitle = $("#edit-title").val();
    const updatedContent = $("#edit-content").val();
    const updatedCategory = $("#edit-category").val();
    const updatedArtists = $("#edit-artists").val();
    const imgSrc = $("#photo-preview").attr("src");
    const updatedImage = $("#photo")[0].files[0];

    // Update the post in Supabase
    updatePostInSupabase(
      postId,
      updatedImage,
      updatedTitle,
      updatedContent,
      updatedCategory,
      updatedArtists,
      imgSrc
    );
  });

  async function removeFromSupabase(id) {
    const { error } = await supabaseDb.from("gallery").delete().eq("id", id);
  }

  // delete post
  $(".upload-sub").on("click", ".fa-trash", async function () {
    const id = $(this).closest("div[id]").attr("id");

    // Delete the record from Supabase
    await removeFromSupabase(id);

    // Remove the parent element of the delete icon from the DOM
    $(this).closest("div[id]").remove();
  });
});
