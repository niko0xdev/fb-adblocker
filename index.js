(function () {
  "use strict";

  var feedGarbageTextPatterns = [
    /Suggested\sfor\syou/gi,
    /Reels\sand\sshort\svideos/gi,
    /r\no\ns\ne\nd\nS\no\nt\nc\np\n0\nh\nd\na\ne\no\na\nS\ns\n1\ng\nr\no\nn\ng\n9\nu\n1\nf\n1/gi,
  ];

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

  function removeFeedSponsors() {
    const feedItems = document.querySelectorAll('div[role="feed"] > div');

    feedItems.forEach((d) => {
      if (feedGarbageTextPatterns.some((p) => p.test(d.innerText))) {
        d.remove();
      }
    });
  }

  function process() {
    removeContentSponsors();
    removePanelSponsors();
    removeFeedSponsors();
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
