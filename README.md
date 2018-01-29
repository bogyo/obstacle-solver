
## Obstacle solver
## install and run

1. git clone
2. npm install
3. npm start

## Usage

1. drag and drop one START and one TARGET element to the grid
2. Drop as many other element as you want.
Please note: Naturally the wormhole does affect only, if at least one wormhole entrance and one wormhole exit present.

3. Click on show the shortest route button if you are done with your settings.

You can add/drag-drop elements on the grid if you would like to change your settings.
To check the new shortest route with the new settings click the button again.
To start from scratch press clear the grid button.

If start/target elements are missing or there is no route to your target the application  will display a notification
about this situation, otherwise it will show the shortest route highlighted with green color.

For smaller/bigger cells or different number of cells you can rewrite
cellsize, cellnumber, cellnumbervertical variables under utils/constants.js.
Please note: I tested the style/css of the application mainly with the default settings.

 ## Possible future development directions

code-wise:
1. unit tests for every component!!!
2. More structured code
3. I think, I used only a few css declaration, that's why no sass or other preprocessor needs here.
however for a bigger application a css preprocessor needs to be introduced
(using nesting in css blocks, using variables and mixins)
4. optimizing image sizes and types, using svg icons to the obstacles.
Please note, I've just searched some 'space-theme images' on the internet, to add some style to my solution,
these are not optimized at all.
5.  using svg with rectangles as grid - need to implement drag and drop with mouseenter/leave to the svg elements
(or use some third party library here for instance d3)
6. optimize performance for very-large grids

feature-wise:
1. remove single elements from the grid not only clear all - to have better UX.
2. use some BE to store data
3. add a form  element to the user - to interactively change cell numbers  and/or cell sizes
4. fully responsive grid, however not a best solution -> user can't see too small grids
