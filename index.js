(function () {
  "use strict";

  var garbageTextPatterns = [
    /Sponsored/gi,
    /Suggested\sfor\syou/gi,
    /Reels\sand\sshort\svideos/gi,
    /r\no\ns\ne\nd\nS\no\nt\nc\np\n0\nh\nd\na\ne\no\na\nS\ns\n1\ng\nr\no\nn\ng\n9\nu\n1\nf\n1/gi,
  ];

  var garbageInnerSelectors = ['a[aria-label="Sponsored"]'];

  var mutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  function removeElem(elm) {
    if (elm) {
      console.log("Remove element");
      elm.remove();
    }
  }

  function removeByInnerText(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elm) => {
      if (garbageTextPatterns.some((rgx) => rgx.test(elm.innerText))) {
        removeElem(elm);
      }
    });
  }

  function removeByInnerSelector(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elm) => {
      garbageInnerSelectors.forEach((s) => {
        const matchElms = elm.querySelector(s);

        if (matchElms) {
          matchElms.forEach((selm) => removeElem(selm));
        }
      });
    });
  }

  function process() {
    removeByInnerSelector('div[role="feed"] > div[data-pagelet]');
    removeByInnerText('div[role="feed"] > div');
    removeByInnerText(
      'div[role="complementary"] > div > div > div > div > div'
    );
  }

  if (mutationObserver) {
    var body = document.querySelector("body");
    if (!body) {
      return;
    }

    var observer = new mutationObserver(process);
    observer.observe(body, {
      childList: true,
      subtree: true,
    });
  }
})();
