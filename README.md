# SVG utils

This is a simple module that provides a basic API to create SVG documents.

The module is currently WIP and doesn't support all functionalities provided by SVG.



## Installation

`npm i svgbuild`


## Usage

The API is chainable and every operation mutates the internal state of the SVG object, so you can create multiple shapes in one go or add shapes in different steps.

Invoke the ```.toString()``` method to get a full SVG document that you can save to a file or display in a browser.

```

const svgBuild = require('svgbuild');

// create svg object
const svg = svgBuild(400, 400);

// add a polygon
svg.polygon([
    { x: 10, y: 20 },
    { x: 20, y: 20 },
    { x: 20, y: 10 }
], { stroke: 'rgb(100, 100, 200)' });

// add a circle and create the SVG string
const svgString =
    .circle({ x: 10, y: 20 }, 5, { stroke: 'rgb(100, 100, 200)' })
    .toString();

```


## Methods

### polygon

    ```polygon(points[, style[, props]])```


### circle

    ```circle(point, radius[, style[, props]])```


### text

    ```text(text, position[, style[, props]])```


### line

    ```line(point1, point2[, style[, props]])```


### el (generic element)

    ```el(type[, style[, props[, content]]])```


### toString

    ```toString()```
