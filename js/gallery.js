jQuery("#portfolio").mixItUp({
  // sort and filtering of gallery sections
  selectors: {
    target: ".tile",
    filter: ".filter",
    sort: ".sort-btn",
  },
  animation: {
    animateResizeContainer: false,
    effects: "fade scale",
  },
});
