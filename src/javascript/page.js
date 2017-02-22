import 'intersection-observer';
import throttle from 'lodash/throttle';
import raf from 'raf';

import '../sass/app.scss'; //import the main css file into our js bundle
const THRESHOLD = 1.0;
(() => {
  const nav = document.querySelector('.nav');
  const spacer = document.querySelector('.nav-spacer');

  (() => {
    // https://jeremenichelli.github.io/2016/04/quick-introduction-to-the-intersection-observer-api/
    IntersectionObserver.prototype.POLL_INTERVAL = 100;
    const onChange = (changes) => {
      const status = changes[0].intersectionRatio < THRESHOLD;
      nav.classList[(status) ? 'add' : 'remove']("nav--collapsed");
      spacer.classList[(status) ? 'add' : 'remove']("nav-spacer--collapsed");
    };
    let observer = new IntersectionObserver(onChange, {
      threshold: THRESHOLD, //100%
      root: null,
    });
    observer.observe(spacer);
  })();

  (() => {
    let prevY = window.pageYOffset;
    let pollCycle = 500;
    let deltaScroll = 120; // The delta needs to be at least as tall as the nav to avoid annoying behaviors.

    const detectScroll = throttle(() => {
      let curY = window.pageYOffset;
      if (curY + deltaScroll < prevY) {
        console.log('scrollUp');
        //user has scrolled up at least `deltaScroll` since the last poll cycle - show the whole nav!
        nav.classList.remove("nav--collapsed");
        spacer.classList.remove("nav-spacer--collapsed");
      }
      else if (curY > prevY + 10) {
        //user is scrolling down by more than 10px
        console.log('scrollDown');
        nav.classList.add("nav--collapsed");
        spacer.classList.add("nav-spacer--collapsed");
      }
      prevY = curY;
      raf(detectScroll);
    }, pollCycle);

    raf(detectScroll);
  })();
})();


