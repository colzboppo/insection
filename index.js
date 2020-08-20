// selector = selection for intersect //
// context = selector (body by default) //
// contextClass = class to add to context when any intersect occurs (global) //
// threshold = threshold of intersection //

exports.insection = (selector, scrollover) => {
  // detect browser support for scroll animation with intersect //

  if (
    !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    window.document.body.classList.add("no-intersect");
    console.log("intersectionApi not supported in current browser");
  } else if (
    selector.length < 1 ||
    typeof selector != "string" ||
    selector[0] != "."
  ) {
    console.log(
      selector,
      "; Invalid argument, please use a suitable class selector string."
    );
    return false;
  }
  let selectorClass = selector.replace(/^\./, "");
  let selInit = window.document.querySelectorAll(
    "body:not(.no-intersect) " + selector
  );
  window.document.body.classList.add("intersect");

  if (selInit.length > 0) {
    // this is the target which is observed
    for (let selEl of selInit) {
      // cue up animations (no-JS friendly) //
      selEl.classList.remove(selectorClass);
      selEl.classList.add(selectorClass + "-start");
    }

    let selStart = window.document.querySelectorAll(selector + "-start");
    // configure the intersection observer instance
    let intersectionObserverOptions = {
      root: null,
      rootMargin: "20px",
      threshold: 0.75, // percentage of object to intersect as threshold
    };

    // instantiate our animation element observer
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(scrollover, entry.intersectionRatio > 0);
        if (entry.intersectionRatio > 0) {
          // Start Anim / Stop watching //
          entry.target.classList.remove(selectorClass + "-start");
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
