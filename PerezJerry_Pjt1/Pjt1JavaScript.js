// Global variables for easy function access - accessible everywhere
// could take the approach of making all variables holding numerical values
// single arrays, just in case (better safe than sorry)
var canvas;
var gl;
var program;
var bPress;
bPress = false;
var drawM = [];
drawM = 0;
var fileM = [];
fileM = 1;
var firstTime = [];
firstTime = 0;
var points = [][0];
var allPoints = [][0];
const maxclicks = 100;
var remainingclicks;
remainingclicks = maxclicks;
var currcolor;
currcolor= 'black';
var colors = [][0];
var projMatrix;

function main()
{
    // Prerequisite stuff to actually get the program up and running

    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    program = initShaders(gl, "vshader", "fshader");
    gl.useProgram(program);

    // File Manipulations
    //------------------------
    //we need to get the selected file first
    document.getElementById('FileInsertion').onchange = function ()
    {
        // default extents
        var top = [];
        top = 480;
        var bottom = [];
        bottom = 0;
        var left = [];
        left = 0;
        var right = [];
        right = 640;
        var anythingelse = []; // additional extents
        anythingelse = 0;
        var totalLines = [];
        totalLines = -1; // total number of lines
        var entrypoint = [];
        entrypoint = -1;
        var aspr = [];
        aspr = (right-left)/(top-bottom); // aspect ratio
        var file = [];
        file = document.getElementById('FileInsertion').files[0];
        if (file)
        {
            var read = [];
            read = new FileReader(); // read the file
            // when we read, do something
            read.onload = function(e)
            {
                points = []; // no points
                allPoints = []; // no previous points
                currcolor = 'black'; //set the current color back to original
                colors = [];

                gl.clear(gl.COLOR_BUFFER_BIT); // visually clean the screen before doing anything

                //orthographic view is going to make our image constant so there is no overlap
                projMatrix = ortho(left, right, bottom, top, -1.0, 1.0);

                // Retrieve the data from the file
                var data = [];
                data = e.target.result;

                // we need to organize and clean the data before we use it for what we need to
                cleandata = cleanUp(data.split("\n"));

                var startingnum = [];
                startingnum = 0; //starts a count for whats actually meaningful in our file

                // Set up a for loop to go through the header
                for (var i=0; i < cleandata.length; i++)
                {
                    if (cleandata[i].includes('*'))
                    {
                        startingnum = i + 1;
                    }
                }
                //for all other positions
                for (var i = startingnum; i < cleandata.length; i++)
                {
                    placeholder = cleanUp(cleandata[i].split(' '));
                    var allelse = [];
                    allelse = !placeholder.length; // could possibly use this for switch statement

                    // we need to check to see if there are special extents

                    if (placeholder.length == 4)
                    {
                        anythingelse = 1; // Set to true.. now we know there is something else
                        top = parseFloat(placeholder[1]);
                        bottom = parseFloat(placeholder[3]);
                        left = parseFloat(placeholder[0]);
                        right = parseFloat(placeholder[2]);
                        var starter = [];
                        starter = i + 1;
                        projMatrix = ortho(left, right, bottom, top, -1.0, 1.0);
                        aspr = (right-left)/(top-bottom); // set the aspect ratio
                    }

                    else if (placeholder.length == 1)
                    {
                        // No special extents
                        if ((anythingelse == 0) && (i == startingnum))
                        {
                            totalLines = placeholder[0];
                            // Correct the aspect ratio
                            switch (aspr)
                            {
                                case (aspr < 1):
                                    gl.viewport( 0, 0, canvas.height*aspr, canvas.height);
                                    break;
                                case (aspr > 1):
                                    gl.viewport( 0, 0, canvas.width, canvas.width*(1/aspr));
                                    break;
                            }
                                gl.viewport( 0, 0, canvas.width, canvas.height);
                        }
                        // if there is a special extent - repeat
                        else if ((anythingelse == 1) && (i == startingnum+1))
                        {
                            totalLines = placeholder[0];

                            if (aspr < 1)
                            {
                                gl.viewport( 0, 0, canvas.height*aspr, canvas.height);
                            }
                            if (aspr > 1)
                            {
                                gl.viewport( 0, 0, canvas.width, canvas.width*(1/aspr));
                            }
                            else
                            {
                                gl.viewport( 0, 0, canvas.width, canvas.height);
                            }
                        }
                        // start a new line
                        else
                        {
                            // Disregard the first set of coordinates
                            if (entrypoint != -1)
                            {
                                allPoints.push(points); // Before resetting, add to history
                                points = []; // Reset the set of points
                            }
                            entrypoint = placeholder[0];
                        }
                    }

                    else
                        {
                            var x = [];
                            x = placeholder[0];
                            var y = [];
                            y = placeholder[1];
                            colors.push(vec4(0.0, 0.0, 0.0, 1.0)); // black
                            points.push(vec4(parseFloat(x), parseFloat(y), 0.0, 1.0));
                        }
                    }
                allPoints.push(points);
                drawit(projMatrix); // and now we can finally draw them
            }
            read.readAsText(file);
        }
    };

    // We need to configure what happens when there is a keypress that happens in file mode
    window.onkeypress = function(event)
    {
        var keystroke = [];
        keystroke = event.key; // reads what key is pressed

        if(keystroke=='d')
        {
            if (fileM == 1)
            {
                fileM = 0; // not in file mode anymore
                drawM = 1; // in draw mode
                //HTML modification
                var hideme;
                hideme = document.getElementById('FileInsertion');
                hideme.style.display = "none"; // hide button if in draw mode
                this.document.getElementById("titleslot").innerHTML = "Draw Mode";

                gl.clear(gl.COLOR_BUFFER_BIT);


                firstTime = 1; // we must set first time to one because were starting from scratch again
                points = [];
                allPoints = [];
                colors = [];
                currcolor = 'black';
                projMatrix = ortho(0, 400, 0, 400, -1.0, 1.0);
                gl.viewport( 0, 0, canvas.width, canvas.height);
            }

        }
        else if (keystroke == 'f')
        {
            if (drawM == 1)
            {
                fileM = 1; // in file mode
                drawM = 0; // not draw mode
                //Modify HTML
                var hideme;
                hideme = document.getElementById('FileInsertion');
                hideme.style.display = "block"; // show button if in file mode
                this.document.getElementById("titleslot").innerHTML = "File Mode";
                //Clear the screen from any previous canvas modifications
                gl.clear(gl.COLOR_BUFFER_BIT);

                points = [];
                allPoints = [];
                currcolor = 'black';
                colors = [];
            }
        }
        else if (keystroke == 'c')
        {
            var placeholder = [];

            // black to red, red to blue, blue to green, green back to black

            switch (currcolor)
            {
                case 'black': this.currcolor = 'red';
                    placeholder = vec4(1.0, 0.0, 0.0, 1.0);
                    break;
                case 'red': this.currcolor = 'green';
                    placeholder = vec4(0.0, 1.0, 0.0, 1.0);
                    break;
                case 'green':  this.currcolor = 'blue';
                    placeholder = vec4(0.0, 0.0, 1.0, 1.0);
                    break;
                case 'blue': this.currcolor = 'black';
                    placeholder = vec4(0.0, 0.0, 0.0, 1.0);
            }
            for (k=0; k < colors.length; k++)
            {
                colors[k] = placeholder;
            }
            drawit(canvas);
        }
        else if(keystroke == 'x')
            {
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.clearColor(1.0, 1.0, 1.0, 1.0);

            }
    }
    //Draw Mode Configurations
    //This is where we will set our drawmode keystrokes, clicks, etc.
    // This will consist of
    // B-Pressing for new continuation
    // color changes for lining
    // mouse clicks
    // line storage

    // first we need to configure a key press that will handle modes
    // onkeypress will not work here.. unless doing it wrong, search.
    window.onkeydown = function(e)
    {
        if (e.key == 'b')
        {
            bPress = true; // once the b button is pressed, we will set to true
        }
    }
    // b key released
    window.onkeyup = function(e)
    {
        if (e.key == 'b')
        {
            bPress = false; //once the b button is released, we will set to false
        }
    }

    // Click functionality with eventlisteners

    canvas.addEventListener('mousedown', function(e)
    {
        if (drawM) //if we are in drawmode
        {
            //once we are in draw mode we need to find the clicked coordinates
            const rectangle = canvas.getBoundingClientRect();
            const xcoord = event.clientX - rectangle.left; // finds the clicked on x coord
            const ycoord = rectangle.bottom - event.clientY; // finds the clicked on y coord

            // now we have a separate condition if this is the first click
            // attack in order: first click, then if we hold b, then if we have remaining clicks
            if (firstTime) // if its our first time
            {
                points.push(vec4(parseFloat(xcoord), parseFloat(ycoord), 0.0, 1.0)); //current point
                allPoints.push(points); //keeps a record of all previous points
                remainingclicks = maxclicks; //on the first one, there are no registered clicks so remaining still equals the max
            }

            else if (bPress) // if we press the b button
            {
                allPoints.push(points); //keep all points
                points = []; //start a new set of points
                points.push(vec4(parseFloat(xcoord), parseFloat(ycoord), 0.0, 1.0));
                allPoints.push(points);
                remainingclicks = maxclicks; // remaining clicks are set back to max
            }
            else // if its not our first time
            {

                if (remainingclicks != 0) //if we still have clicks to go
                {
                    // We need to get the last entry and add onto it
                    allPoints[allPoints.length - 1].push(vec4(parseFloat(xcoord), parseFloat(ycoord), 0.0, 1.0));
                    remainingclicks = remainingclicks-1;
                }
                else // we do not have remaining clicks... create a new chain
                {

                    points = []; // new set of data at this point
                    points.push(vec4(parseFloat(xcoord), parseFloat(ycoord), 0.0, 1.0));
                    allPoints.push(points);
                    remainingclicks = maxclicks; //remaining is equal to max clicks
                }
            }

            // Color Manipulation - order of vec4 is red, green, blue, opacity

            switch (currcolor)
            {
                case 'red': colors.push(vec4(1.0, 0.0, 0.0, 1.0)); // red
                    break;
                case 'green': colors.push(vec4(0.0, 1.0, 0.0, 1.0)); // green
                    break;
                case 'blue': colors.push(vec4(0.0, 0.0, 1.0, 1.0)); // blue
                    break;
                case 'black': colors.push(vec4(0.0, 0.0, 0.0, 1.0)); // black
                    break;
            }
            drawit(canvas); // draw to the canvas
        }
    })

}


function getMousePos(canvas, event) // come back to this if cant directly implement
{
    var rect;
    rect = canvas.getBoundingClientRect();
    return
    {
        x: event.clientX - rect.left;
        y: event.clientY - rect.top
    };

}


//draws all of the points
function drawit(canvas)
{


    for (i=0; i < allPoints.length; i++)
    {
        //buffer stuff :)
        var pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(allPoints[i]), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

        var vPointSize = gl.getUniformLocation(program, "vPointSize");
        gl.uniform1f(vPointSize, 1.0);

        // Set clear color
        gl.clearColor(1.0, 1.0, 1.0, 1.0);

        var projMatrixLoc = gl.getUniformLocation(program, "projMatrix");
        gl.uniformMatrix4fv(projMatrixLoc, false, flatten(projMatrix));

        // Special conditions for first time drawing - need to keep track
        if (firstTime == 1)
        {
            gl.drawArrays(gl.POINTS, 0, allPoints[i].length);
            firstTime = 0;
        }
        else
        {
            gl.drawArrays(gl.LINE_STRIP, 0, allPoints[i].length);
        }
    }
}
//Cleans the data from the file
function cleanUp(targetarray)
{
    var freshcollection;
    freshcollection = [];
    for (i =0; i<targetarray.length; i++)
    {
        if (targetarray[i].length != 0)
        {
            freshcollection.push(targetarray[i]);
        }
    }
    return freshcollection;
}


