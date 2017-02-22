import '../sass/app.scss'; //import the main css file into our js bundle

(() => {
  const nav = document.querySelector('.nav');
  const spacer = document.querySelector('.nav-spacer');
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      // how's this going to behave with responsive nav heights?
      nav.classList.add("nav--fixed");
      spacer.classList.add("nav-spacer--expanded");
    }
    if (window.pageYOffset <= 20) {
      nav.classList.remove("nav--fixed");
      spacer.classList.remove("nav-spacer--expanded");
    }
  });
})();
