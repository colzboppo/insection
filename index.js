// selector = selection for intersect //
// context = selector (body by default) //
// contextClass = class to add to context when any intersect occurs (global) //
// threshold = threshold of intersection //

exports.insection = (selector) => {
  // detect browser support for scroll animation with intersect //

  let cueSfix = "cue",
    vueSfix = "vue";
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
    window.document.body.classList.add("intersect");
  }
  let selectorClass = "." + selector;
  let selInit = window.document.querySelectorAll(
    "body.intersect " + selectorClass
  );

  if (selInit.length > 0) {
    // this is the target which is observed
    for (let selEl of selInit) {
      // cue up animations (no-JS friendly) //
      selEl.classList.remove(selector);
      selEl.classList.add(selector + "-" + cueSfix);
    }

    let selStart = window.document.querySelectorAll(
      selectorClass + "-" + cueSfix
    );
    // configure the intersection observer instance
    let intersectionObserverOptions = {
      root: null,
      rootMargin: "20px",
      threshold: 0.75, // percentage of object to intersect as threshold
    };

    // instantiate our animation element observer
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          selector + "-" + vueSfix,
          entry.intersectionRatio > 0
        );
        if (entry.intersectionRatio > 0) {
          // Start Anim / Stop watching //
          entry.target.classList.remove(selector + "-" + cueSfix);
          observer.unobserve(entry.target);
        }
      });
    }, intersectionObserverOptions);
    for (let selEl of selStart) {
      // provide the observer with a target
      observer.observe(selEl);
    }
  } else {
    console.log(
      selInit,
      "No elements found with provided selector, returning."
    );
    return false;
  }
};
