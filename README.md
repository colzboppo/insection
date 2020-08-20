# insection
Module that accepts and monitors a selector for intersection with the viewport (scroll into view) in vanillaJS


## install
``` $ npm install @colzboppo/insection```


## usage

Add this import code to your `app.js` file.

```
const { insection } = require("@colzboppo/insection");
insection("selector") 
```

Insection will add `selector-cue` onto any html elements that match the given selector class.

Insection will replace this with `selector-vue` when the element is either scrolled into view, or already in view.

You can then add CSS styles and animations with the classes provided to reflect items coming into view.

NB. Due to IntersectionObserver API support only in modern browsers this module will not work in <IE Edge v14 & <MSIE v11, plus some older versions of other popular browsers, please see: https://caniuse.com/#search=Intersection

In this case the module will return without an error and without any DOM manipulation to maintain progressive enhancement principles.
