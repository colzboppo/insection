// contextClass = class to add to context when any intersect occurs (global) //

exports.insection = (
  selector,
  {
    context = null,
    contextClass = "",
    hideThreshold = 0.01,
    viewThreshold = 1,
    persist = true,
    cueFix = "cue",
    vueFix = "vue",
    trackVisibility = false,
  } = {}
) => {
  // detect browser support for scroll animation with intersect //
  if (
    !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    console.log("intersectionApi not supported in current browser");
    return false;
  } else if (selector.length < 1 || typeof selector != "string") {
    console.log(
      selector,
      "; Invalid argument, please use a suitable class selector string."
    );
    return false;
  } else {
    window.document.body.classList.add("insection");
  }
  let selectorClass = "." + selector;
  let selInit = window.document.querySelectorAll(
    "body.insection " + selectorClass
  );

  if (selInit.length > 0) {
    // this is the target which is observed
    for (let selEl of selInit) {
      // cue up animations (no-JS friendly) //
      selEl.classList.remove(selector);
      selEl.classList.add(selector + "-" + cueFix);
    }

    let selStart = window.document.querySelectorAll(
      selectorClass + "-" + cueFix
    );
    // configure the intersection observer instance
    let intersectionObserverOptions = {
      root: context,
      rootMargin: "0px 0px 0px 0px",
      threshold: [hideThreshold, viewThreshold], // percentage of object to intersect as threshold
      trackVisibility,
    };

    // instantiate our animation element observer
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let overThreshold = entry.intersectionRatio >= viewThreshold;
        let notInView = entry.intersectionRatio <= hideThreshold;
        if (persist) {
          // toggles -vue class
          entry.target.classList.toggle(selector + "-" + vueFix, overThreshold);
          if (overThreshold) {
            entry.target.classList.remove(selector + "-" + cueFix);
            observer.unobserve(entry.target);
          }
        } else {
          // toggles -cue/-vue class
          if (overThreshold) {
            entry.target.classList.add(selector + "-" + vueFix);
            entry.target.classList.remove(selector + "-" + cueFix);
          } else if (notInView) {
            entry.target.classList.remove(selector + "-" + vueFix);
            entry.target.classList.add(selector + "-" + cueFix);
          }
        }
      });
    }, intersectionObserverOptions);
    for (let selEl of selStart) {
      // provide the observer with a target
      observer.observe(selEl);
    }
    console.log(observer);
  } else {
    console.log(
      selInit,
      "No elements found with provided selector, returning."
    );
    return false;
  }
};
