
## Obstacle solver
## install and run

1. git clone
2. npm install
3. npm start

## Usage

1. drop at least one start and target element to the grid
2. Drop as many other element as you want.
Please note: Naturally the wormhole does affects only, if at least one wormhole entrance and one wormhole exit present.
3. Click on show the shortest route if are done with your settings.
5. You can add/drag-drop elements on the table if you would like to change the previous settings
to check the new  shortest route click the button.
6.  To start again press clear the grid button.

If something missing or there is no route the application will notify the user,
otherwise the user can check the shortest route highlighted with green color.

I think about a square but rectangle with change CELLNUMBER to CELLNUMBER - width, CELLNUMBER - height

 ## Possible future development directions

 1. unit tests for every component
 2. More structured code
 2. remove single elements from the grid not only clear all to have better UX.
 3. use some BE to store data
 5. I think, there is not too much css declaration, hence no sass or other preprocessor needs here,
 but sass if it would be a bigger app, to use nesting to define css blocks and  mixins to reuse some part of css.
 6. add form to the user interactively change cellNumbers or cellsizes
 7. responsive grid, however not a best solution -> user can't see too small grids
 8. optimize image sizes



 use svg  to render grid - drag drop implementation with mouseenter, leave
 or use d3 or other react comp
 optimaze performance for large grids
