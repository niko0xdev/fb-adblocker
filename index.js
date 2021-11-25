(function () {
  "use strict";

  var mutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  function removeContentSponsors() {
    const feedItems = document.querySelectorAll(
      'div[role="feed"] > div[data-pagelet]'
    );
    feedItems.forEach((feed) => {
      const sponsorElm = feed.querySelector('a[aria-label="Sponsored"]');
      if (sponsorElm) {
        console.log("===> remove sponsored content...");
        feed.remove();
      }
    });
  }

  function removePanelSponsors() {
    const feedItems = document.querySelectorAll(
      'div[data-pagelet="RightRail"] > div'
    );

    if (feedItems.length > 1) {
      feedItems[0].remove();
    }

    feedItems.forEach((feed) => {
      const sponsorElm = feed.querySelector("a");
      if (sponsorElm && /\/gaming\/.*/g.exec(sponsorElm.href)) {
        console.log("===> remove sponsored gaming: ", sponsorElm.href);
        feed.remove();
      }
    });
  }

  function process() {
    removeContentSponsors();
    removePanelSponsors();
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
