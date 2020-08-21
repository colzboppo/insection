// contextClass = class to add to context when any intersect occurs (global) //
// classTarget = so we can target a different element to our selector if required //
let log = (msg, debug, type = "log") => {
  if (debug) {
    if (type === "log") {
      console.log(this, "log", msg);
    } else if (type === "error") {
      console.error(this, "error", msg);
    }
  }
};
let debug;
exports.insection = (
  selector,
  {
    context = null,
    contextClass = false,
    hideThreshold = 0.01,
    viewThreshold = 1,
    persist = true,
    cueFix = "cue",
    vueFix = "vue",
    trackVisibility = false,
    reverseContextClass = false,
    preserveClass = false,
    debug = false,
  } = {}
) => {
  // detect browser support for scroll animation with intersect //
  if (
    !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    log("intersectionApi not supported in current browser", true, "error");
    return false;
  } else if (selector.length < 1 || typeof selector != "string") {
    log(
      [
        selector,
        "; Invalid argument, please use a suitable class selector string.",
      ],
      true,
      "error"
    );
    return false;
  } else {
    window.document.documentElement.classList.add("insection");
  }
  let selectorClass = "." + selector;
  let selInit = window.document.querySelectorAll(
    "html.insection " + selectorClass
  );
  let contextTar;
  if (
    contextClass &&
    typeof contextClass === "string" &&
    !(selInit.length > 1 && persist !== false)
  ) {
    // we are applying a class to our context container when our element is in view //
    contextTar = context ? context : window.document.body;
  } else if (contextClass && typeof contextClass === "string") {
    // if more than one element and persist=true, this could become too much so pass warning and ignore //
    log(
      "context class given with multiple elements and persist=true, ignoring.",
      debug
    );
  }

  if (selInit.length > 0) {
    // this is the target which is observed
    for (let selEl of selInit) {
      // cue up animations (no-JS friendly) //
      preserveClass
        ? log("preserving selector class", debug)
        : selEl.classList.remove(selector);
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
        let inView = entry.intersectionRatio >= viewThreshold;
        let notInView = entry.intersectionRatio <= hideThreshold;
        if (persist) {
          // toggles -vue class
          entry.target.classList.toggle(selector + "-" + vueFix, inView);
          if (inView) {
            entry.target.classList.remove(selector + "-" + cueFix);
            observer.unobserve(entry.target);
            contextTar ? contextTar.classList.add(contextClass) : null;
          }
        } else {
          // toggles -cue/-vue class persistently
          if (inView) {
            entry.target.classList.add(selector + "-" + vueFix);
            entry.target.classList.remove(selector + "-" + cueFix);
            contextTar
              ? reverseContextClass
                ? contextTar.classList.remove(contextClass)
                : contextTar.classList.add(contextClass)
              : null;
          } else if (notInView) {
            entry.target.classList.remove(selector + "-" + vueFix);
            entry.target.classList.add(selector + "-" + cueFix);
            contextTar
              ? reverseContextClass
                ? contextTar.classList.add(contextClass)
                : contextTar.classList.remove(contextClass)
              : null;
          }
        }
      });
    }, intersectionObserverOptions);
    for (let selEl of selStart) {
      // provide the observer with a target
      observer.observe(selEl);
    }
  } else {
    log(
      [selInit, "No elements found with provided selector, returning."],
      true,
      "error"
    );
    return false;
  }
};
