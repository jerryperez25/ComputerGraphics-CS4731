CS 4731 Project 4

Inside of this zip file, you will find 4 files and 2 folders:

- Pjt4.js - holds all of the javascript work
- Pjt4 HTML.html - holds all of the graphical interface work
- Style.css - holds all of the styling for the html 
- README.txt - describes project
- lib - contains given libraries

Walkthrough of the JavaScript:

The toughest thing for me to figure out was how to express a hierarchical relationship that would be fairly easy to maintain. In one of my prior CS courses in Java, we dealt with nodes that had children, and it made it extremely easy to not only create those relationships but to keep track of them also. I wanted to incorporate that into this project somehow. The first portion of the code is the creation of a node class that consisted of vertices, normals, texture coordinates, color, right children, left children, and extents. It allowed me to insert models, draw them, and of course... draw the lines that connect them. The next thought process was to create the button calls that would bring life to the program. The rest of the program is creating the models that we wanted with the shape that we wanted, developing the hierarchy of parent and child relationships, and expressing the characteristics that we desired. Within these characteristics we have variables to control spotlight size, and a slew of variables that control and determine how light will interact with the scene (light position, ambience, diffuse, material ambience, diffuse, shininess, etc.). For this project, majority of the code has stayed the same, with some slight additions that brought life to code that was not correctly working in the prior submission. For one, there is added functionality to load textures and create a cube map that allows models to react accordingly. There is also functionality for drawing the background that will be shown when the user toggles off texturing. Lastly, and in no particular order, was the shadowing. For this project the functionality that was required was: shadowing of model, texture toggling, reflecting and refracting of cube map creation. 


Walkthrough of the HTML:

The HTMl contains brief instructions at the users possession to appropriately navigate through the program. The description on the side is there as a visual aid in case the button presses are not explicitly given to them. Also inside of the HTML, the vertex shader does have significantly more going on inside of it due to our use of Gouraud shading that occurs in the vertex shader. 

