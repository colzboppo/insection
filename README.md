# insection
Module that accepts and monitors a selector for intersection with the viewport (scroll into view) in vanillaJS


## Install
``` $ npm install @colzboppo/insection```


## Usage

Add this import code to your `app.js` file.

```
const { insection } = require("@colzboppo/insection");
insection("selector", [{ config:options... }]) 
```


### Options

An optional set of config parameters can be passed to the module when instantiating, example: `insection("selector",{persist:false})`

Full set of config options:
```
{
  persist: true (default) // if set to false -cue and -vue classes will re-toggle when scrolled out and back into view
  context: document.body (default) // context with which to observe scrolling, set to specific container with scroll
  hideThreshold: 0.01 (default) // percentage of object in view when we trigger out of view
  viewThreshold: 1 (default) // percentage of object in view when we trigger in view
  cueFix: "cue" (default) // class suffix when cued outside view
  vueFix: "vue" (default) // class suffix when scrolled into view
  preserveClass: false (default) // to preserve the selector class of the elements set to true
  contextClass: false (default) // add a class string to apply to our context on element view triggers [unstable when using with multiple elements]
  reverseContextClass: false (default) // reverse our trigger to add class when trigger out of view of element
}
```

Insection will replace `selector` class and add `selector-cue` class onto any html elements that match the selector.

Insection will replace the class with `selector-vue` when the element is either scrolled into view, or already in view.

You can then add CSS styles and animations with the classes provided to reflect items coming into view.

NB. Due to IntersectionObserver API support only in modern browsers this module will not work in <IE Edge v14 & <MSIE v11, plus some older versions of other popular browsers, please see: https://caniuse.com/#search=Intersection

In this case the module will return without an error and without any DOM manipulation to maintain progressive enhancement principles.
