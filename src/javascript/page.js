import 'intersection-observer';
import throttle from 'lodash/throttle';
import raf from 'raf';

import '../sass/app.scss'; //import the main css file into our js bundle
const THRESHOLD = 1.0;
(() => {
  const nav = document.querySelector('.nav');
  const spacer = document.querySelector('.nav-spacer');
  const aboveTheFoldThreshold = 90;

  (() => {
    // https://jeremenichelli.github.io/2016/04/quick-introduction-to-the-intersection-observer-api/
    const onChange = (changes) => {
      const status = changes[0].intersectionRatio < THRESHOLD;
      nav.classList[(status) ? 'add' : 'remove']("nav--collapsed");
      spacer.classList[(status) ? 'add' : 'remove']("nav-spacer--collapsed");
    };
    let observer = new IntersectionObserver(onChange, {
      threshold: THRESHOLD, //100%
      root: null,
      rootMargin: `${aboveTheFoldThreshold}px`
    });
    observer.observe(spacer);
  })();

  (() => {
    let prevY = window.pageYOffset;
    const pollCycle = 500;
    const deltaScroll = 50; // The scroll position delta needs to be at least as tall as the nav to avoid annoying behaviors.

    const detectScroll = throttle(() => {
      let curY = window.pageYOffset;
      if (curY + deltaScroll < prevY) {
        //user has scrolled up at least `deltaScroll` since the last poll cycle - show the whole nav!
        nav.classList.remove("nav--collapsed");
        spacer.classList.remove("nav-spacer--collapsed");
      }
      else if (curY > prevY + 10 && curY > aboveTheFoldThreshold) {
        //user is scrolling down by more than 10px.
        //The second condition is to ensure that the user has scrolled at least `aboveTheFoldThreshold` into the above-the-fold area
        nav.classList.add("nav--collapsed");
        spacer.classList.add("nav-spacer--collapsed");
      }
      prevY = curY;
      raf(detectScroll);
    }, pollCycle);

    raf(detectScroll);
  })();
})();


