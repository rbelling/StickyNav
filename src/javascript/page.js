import 'intersection-observer';

import '../sass/app.scss'; //import the main css file into our js bundle
const THRESHOLD = 1; // 10% threshold;
(() => {
  const nav = document.querySelector('.nav');
  const spacer = document.querySelector('.nav-spacer');

  const observePosition = () => {
    // https://jeremenichelli.github.io/2016/04/quick-introduction-to-the-intersection-observer-api/
    const onChange = (changes) => {
      const status = changes[0].intersectionRatio < THRESHOLD;
      // nav.classList[(status) ? 'add' : 'remove']("nav--fixed");
      // spacer.classList[(status) ? 'add' : 'remove']("nav-spacer--expanded");
    };
    let observer = new IntersectionObserver(onChange, {
      threshold: THRESHOLD, //100%
      root: null,
    });
    observer.observe(spacer);
  };
  observePosition();

})();


