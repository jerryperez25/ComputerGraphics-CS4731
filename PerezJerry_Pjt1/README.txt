CS 4731 Project 1 

Inside of this zip file, you will find 4 files and 2 folders:

- Pjt1JavaScript.js - holds all of the javascript work
- Pjt1HTML.html - holds all of the graphical interface work
- Style.css - holds all of the styling for the html 
- README.txt - describes project
- files - contains all .dat files for this assignment
- lib - contains given libraries

Walkthrough of the JavaScript:

The Code begins with the few lines of code that make WebGL work. Then, you will see the File Mode Manipulations... this consisted of choosing a file, cleaning that file, and modifying the size to be projected onto the canvas properly.

The next notable checkpoint was to allow for the switching of the modes. For instance, pressing the 'd' key would display to the user that they are in draw mode, and will now allow them to draw on the canvas, for this... I chose to take the approach of blocking the file upload button. Using this method, the user must press the 'f' key in order to upload a file to the canvas. I also added additional functionality that consisted of pressing the 'x' key to wipe the canvas manually.

Then came the Draw Mode Manipulations, which consisted of the 'b' button press to start a new polyline, eventListeners for clicks, and utilizing the 100 click max for a single poly line.

Lastly, was the Color Manipulations, which allows the user the ability to change the line color for either their drawing or the uploaded file. 

Walkthrough of the HTML:

The HTMl contains brief instructions at the users possession to appropriately navigate through the program. It also highlights the canvas for them, as well as shows a title that demonstrates which mode they are currently in. The description on the side is there as a visual aid in case the button presses are not explicitly given to them. 

