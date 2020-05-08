---
title: CSS * Display Property and values
slug: CSS * Display Property and values
image: ./css.jpg
icon: ./css.jpg
tags: ['css', 'web development']
tutorialID: 1
lead: '2020-05-03'
---

<article class="h-entry">

<header>

# CSS * Display Property in Depth

</header>

<section data-field="subtitle" class="p-summary">The display CSS property sets whether an element is treated as a block or inline element and the layout used for its children, such as…</section>

<section data-field="body" class="e-content">

<section name="4d52" class="section section--body section--first section--last">

<div class="section-divider">

* * *

</div>

<div class="section-content">

<div class="section-inner sectionLayout--insetColumn">

### CSS * Display Property in Depth

</div>

<div class="section-inner sectionLayout--fullWidth">

<figure name="9070" id="9070" class="graf graf--figure graf--layoutFillWidth graf-after--h3">

<div class="aspectRatioPlaceholder is-locked">

![](https://cdn-images-1.medium.com/max/2560/1*pcRPYxY6_MJ5Sys-HWDcDg.jpeg)</div>

</figure>

</div>

<div class="section-inner sectionLayout--insetColumn">

The `display` [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) property sets whether an element is treated as a [block or inline element](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout) and the layout used for its children, such as [grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) or [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout).

Formally, the `display` property sets an element's inner and outer _display types_. The outer typeset an element's participation in [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout); the inner type sets the layout of children. Some values are fully defined in their own individual specifications; see the table at the end of this document for links to all relevant specifications.

### Syntax
```css
/* <display-outside> values */
display: block;
display: inline;
display: run-in;
/* <display-inside> values */
display: flow;
display: flow-root;
display: table;
display: flex;
display: grid;
display: ruby;
/* <display-outside> plus <display-inside> values */
display: block flow;
display: inline table;
display: flex run-in;
/* <display-listitem> values */
display: list-item;
display: list-item block;
display: list-item inline;
display: list-item flow;
display: list-item flow-root;
display: list-item block flow;
display: list-item block flow-root;
display: flow list-item block;
/* <display-internal> values */
display: table-row-group;
display: table-header-group;
display: table-footer-group;
display: table-row;
display: table-cell;
display: table-column-group;
display: table-column;
display: table-caption;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;
/* <display-box> values */
display: contents;
display: none;
/* <display-legacy> values */
display: inline-block;
display: inline-table;
display: inline-flex;
display: inline-grid;
/* Global values */
display: inherit;
display: initial;
display: unset;

```
The `display` property is specified using keyword values. Keyword values are grouped into six value categories:

</div>

<div class="section-inner sectionLayout--outsetColumn">

<figure name="f99f" id="f99f" class="graf graf--figure graf--layoutOutsetCenter graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 1192px; max-height: 1095px;">

![](https://cdn-images-1.medium.com/max/1200/1*092EXCMb7K5tj-HdTHCCvg.png)</div>

</figure>

</div>

<div class="section-inner sectionLayout--insetColumn">

display — Block: This property is used as the default property of div. This property places the div one after another vertically. Height and width of the div can be changed using the block property if the width is not mentioned, then div under block property will take up the width of the container.Every element on a web page is a rectangular box. The display property in CSS determines just how that rectangular box behaves. There are only a handful of values that are commonly used:
```css
    div {  display: inline }
```

The default value for all elements is inline. Most “User Agent stylesheets” (the default styles the browser applies to all sites) reset many elements to “block”. Let’s go through each of these, and then cover some of the other less common values.

#### Inline — display inline

The default value for elements. Think of elements like `<span>`, `<em>`, or `<b>` and how wrapping text in those elements within a string of text doesn't break the flow of the text.

<figure name="ed46" id="ed46" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 346px; max-height: 108px;">

![](https://cdn-images-1.medium.com/max/800/0*re5eb-G6GcxfY161.png)</div>

</figure>

The `<em>` element has a 1px red border. Notice it sits right _inline_ with the rest of the text.

An inline element will accept margin and padding, but the element still sits inline as you might expect. Margin and padding will only push other elements horizontally away, not vertically.

<figure name="f193" id="f193" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 519px; max-height: 148px;">

![](https://cdn-images-1.medium.com/max/800/0*ENJ5fgxFe5oIO71J.png)</div>

</figure>

An inline element will not accept `[height](http://css-tricks.com/almanac/properties/h/height/)` and `[width](http://css-tricks.com/almanac/properties/w/width/)`. It will just ignore it.

#### Inline Block — `display: inline-block`

An element set to `inline-block` is very similar to inline in that it will set inline with the natural flow of text (on the "baseline"). The difference is that you are able to set a `width` and `height` which will be respected.

<figure name="30a8" id="30a8" class="graf graf--figure graf-after--p">

<div class="aspectRatioPlaceholder is-locked" style="max-width: 526px; max-height: 207px;">

![](https://cdn-images-1.medium.com/max/800/0*7He0UR6WLejr8ZJa.png)</div>

</figure>

#### Block — display: block

A number of elements are set to `block` by the browser UA stylesheet. They are usually container elements, like `<div>`, `<section>`, and `<ul>`. Also text "blocks" like `<p>` and `<h1>`. Block level elements do not sit inline but break past them. By default (without setting a width) they take up as much horizontal space as they can.

### Display — Table Values

There is a whole set of display values that force non-table elements to behave like table-elements if you need that to happen. It’s rare-ish, but it sometimes allows you to be “more semantic” with your code while utilizing the unique positioning powers of tables.

```css
    div {  
    display: table; 
    display: table-cell; 
    display: table-column; 
    display: table-colgroup; 
    display: table-header-group; 
    display: table-row-group; 
    display: table-footer-group; 
    display: table-row; 
    display: table-caption;
  }
```

To use, just mimic normal table structure. Simple example:

```html
    <div style="display: table;">
      <div style="display: table-row;">
        <div style="display: table-cell;">
           Gross but sometimes useful
        </div>  
       </div>
    </div>
```

The `display` the property specifies if/how an element is displayed.

Every HTML element has a default display value depending on what type of element it is. The default display value for most elements is `block` or `inline`.

### Block-level Elements

A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).

```html
The <div> element is a block-level element.
```

### Inline Elements

An inline element does not start on a new line and only takes up as much width as necessary.

```html
This is an inline <span> element inside a paragraph.
```

``display: none;`` is commonly used with JavaScript to hide and show elements without deleting and recreating them. Take a look at our last example on this page if you want to know how this can be achieved.

The `<script>` element uses `display: none;` as default.

### Override The Default Display Value

As mentioned, every element has a default display value. However, you can override this.

Changing an inline element to a block element, or vice versa, can be useful for making the page look a specific way, and still follow the web standards.

A common example is making inline `<li>` elements for horizontal menus:


<pre name="7f22" id="7f22" class="graf graf--pre graf-after--pre">display: inline;</pre>

Note: Setting the display property of an element only changes how the element is displayed, NOT what kind of element it is. So, an inline element `display: block;` is not allowed to have other block elements inside it.

The following example displays <span> elements as block elements:
```css
span {  
 display: block;  
}
```

The following example displays <a> elements as block elements:

```css
a {  
 display: block;  
}
```

### Hide an ``Element — display:none`` or ``visibility:hidden``

`display:none` means that the tag in question will not appear on the page at all (although you can still interact with it through the dom). There will be no space allocated for it between the other tags.

`visibility:hidden` means that unlike `display:none`, the tag is not visible, but space is allocated for it on the page. The tag is rendered, it just isn't seen on the page. example ..

    test | <span style="[style-tag-value]">Appropriate style in this tag</span> | test

Replacing `[style-tag-value]` with `display:none` results in:

    test |   | test

Replacing `[style-tag-value]` with `visibility:hidden` results in:

    test |                        | test

`display:none` removes the element from the normal flow of the page, allowing other elements to fill in.

`visibility:hidden` leaves the element in the normal flow of the page such that is still occupies space.

Few examples


![](https://cdn-images-1.medium.com/max/800/1*NZJjIP5M343Er-NkUdSr8g.png)</div>


Block: This property is used as the default property of div. This property places the div one after another vertically. Height and width of the div can be changed using the block property if the width is not mentioned, then div under block property will take up the width of the container.


![](https://cdn-images-1.medium.com/max/800/1*tuZDY-YPl7t6NFzgJ1ph9w.png)</div>

![](https://cdn-images-1.medium.com/max/800/1*NHF1Esf_EAXWD3Jbch4NpQ.png)</div>

</figure>

examples captured from [https://www.geeksforgeeks.org/css-display-property/](https://www.geeksforgeeks.org/css-display-property/)

### More Information