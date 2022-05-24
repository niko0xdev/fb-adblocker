(function () {
  "use strict";

  var garbageTextPatterns = [
    /Sponsored/gi,
    /Suggested\sfor\syou/gi,
    /Promoted/gi,
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
    removeByInnerText('data-testid="cellInnerDiv"');
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
