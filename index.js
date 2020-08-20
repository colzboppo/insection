// selector = selection for intersect //
// context = selector (body by default) //
// contextClass = class to add to context when any intersect occurs (global) //
// threshold = threshold of intersection //
// persist = true, if set to false it will not set unobserve and reset to -cue/-vue class when in/out of viewport //

// add options parameters with default values //

exports.insection = (
  selector,
  {
    context = null,
    contextClass = null,
    threshold = 1,
    persist = true,
    cueFix = "cue",
    vueFix = "vue",
  }
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
      selEl.classList.add(selector + "-" + cueFix);
    }

    let selStart = window.document.querySelectorAll(
      selectorClass + "-" + cueFix
    );
    // configure the intersection observer instance
    let intersectionObserverOptions = {
      root: context,
      rootMargin: "0px 0px 0px 0px",
      threshold: threshold, // percentage of object to intersect as threshold
    };

    // instantiate our animation element observer
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let overThreshold = entry.intersectionRatio >= threshold;
        if (persist) {
          // toggles -vue class
          entry.target.classList.toggle(selector + "-" + vueFix, overThreshold);
          entry.target.classList.remove(selector + "-" + cueFix, overThreshold);
          if (overThreshold) {
            observer.unobserve(entry.target);
          }
        } else {
          // toggles -cue class
          entry.target.classList.toggle(selector + "-" + vueFix, overThreshold);
          entry.target.classList.toggle(selector + "-" + cueFix, overThreshold);
        }

        // if (entry.intersectionRatio > 0) {
        //   // Start Anim / Stop watching //
        //   entry.target.classList.remove(selector + "-" + cueFix);
        //   if (persist) {
        //     observer.unobserve(entry.target);
        //   }
        // } else if (!persist) {
        //   entry.target.classList.add(selector + "-" + cueFix);
        //   entry.target.classList.remove(selector + "-" + vueFix);
        // }
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
