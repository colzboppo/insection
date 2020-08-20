# insection
Module that accepts and monitors a selector for intersection with the viewport (scroll into view) in vanillaJS


## Install
``` $ npm install @colzboppo/insection```


## Usage

Add this import code to your `app.js` file.

```
const { insection } = require("@colzboppo/insection");
insection("selector") 
```


### Options

An optional set of config parameters can be passed to the module when instantiating, example: `insection("selector",{persist:false})`

Full set of config options:
```
{
  persist: true (default) // if set to false -cue and -vue classes will re-toggle when scrolled out of view
  context: document.body (default) // context with which to observe scrolling, useful for scrolling div's inside of the document
  threshold: 1 (default) // the percentage of object in view when we trigger our -vue class, 1 = 100% of object, 0.01 = 1%
  cueFix: "cue" (default) // the suffix to add to the class when cue'd for scroll into view
  vueFix: "vue" (default) // the suffix to add to the class when scrolled into view according to our threshold
}
```

Insection will replace `selector` class and add `selector-cue` class onto any html elements that match the selector.

Insection will replace the class with `selector-vue` when the element is either scrolled into view, or already in view.

You can then add CSS styles and animations with the classes provided to reflect items coming into view.

NB. Due to IntersectionObserver API support only in modern browsers this module will not work in <IE Edge v14 & <MSIE v11, plus some older versions of other popular browsers, please see: https://caniuse.com/#search=Intersection

In this case the module will return without an error and without any DOM manipulation to maintain progressive enhancement principles.
