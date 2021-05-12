// Global variables for easy function access - accessible everywhere
// could take the approach of making all variables holding numerical values
// single arrays, just in case (better safe than sorry)
var canvas,gl,program;
var keystroke;
keystroke = [];
var projMatrix;
var colors;
colors = [];
var vertices;
vertices = [];
var instructs;
instructs = [];
var mesh;
mesh = [];
var vecNormals;
vecNormals = [];
var normVecs;
normVecs = [];
var pulseEffect, isitPulsing, breatheIn;
pulseEffect = [];
pulseEffect = 0;
isitPulsing = [];
isitPulsing = 0;
breatheIn = [];
breatheIn = 0;
var cleanData;
cleanData = [];
var cleantheData;
cleantheData = [];
var placeHolder;
placeHolder = [];
var temp;
temp = [];
var storeithere;
storeithere = [];
var vertCount, polyCount;
vertCount = [];
polyCount = [];
var xCoordinates, yCoordinates, zCoordinates;
xCoordinates = [];
yCoordinates = [];
zCoordinates = [];
var xs,ys,zs;
xs = [];
ys = [];
zs = [];
var maxx,maxy,maxz;
maxx = [];
maxy = [];
maxz = [];
var minx,miny,minz;
minx = [];
miny = [];
minz = [];
var centralX, centralY, centralZ;
centralX = [];
centralY = [];
centralZ = [];
var vertex;
vertex = [];
var firstVertex, secondVertex, thirdVertex;
firstVertex = [];
secondVertex = [];
thirdVertex = [];
var xNorm, yNorm, zNorm;
xNorm = [];
yNorm = [];
zNorm = [];
var mWidth, mHeight, mThickness;
mWidth = [];
mHeight = [];
mThickness = [];
var opx, opy, opz;
opx = [];
opy = [];
opz = [];
var xDist, yDist, zDist;
xDist = [];
yDist = [];
zDist = [];
var eyeZ;
eyeZ = [];
var theta;
theta = [];
var movementX, movementY, movementZ;
movementX = [];
movementY = [];
movementZ = [];
var speed;
speed = [];
var posx, posy, posz;
posx = [];
posy = [];
posz = [];
var negx, negy, negz;
negx = [];
negy = [];
negz = [];
var isitRotating;
isitRotating = 0;
var stack;
stack = [];
var stacktest;
stacktest = [];
var rotationM;
rotationM = [];
var translateM;
translateM = [];
var tOriginM;
tOriginM = [];
var tMeshM;
tMeshM = [];
var rOriginM;
rOriginM = [];
var rMeshM;
rMeshM = [];
var combine;
combine = [];
var combineM;
combineM = [];
var eye;
eye = [];
var at;
at = [];
var up;
up = [];
var viewMatrix;
viewMatrix = [];
var anotherstore;
anotherstore = [];
centralX = 0;
centralY = 0;
centralZ = 0;
posx = 0;
posy = 0;
posz = 0;
negx = 0;
negy = 0;
negz = 0;


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
    //viewport setting
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Here we will set the background color for our space
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    //gl.clearColor(1.0, 1.0, 1.0, 1.0); // White background could provide nice contrast

    gl.clear(gl.COLOR_BUFFER_BIT); // clear the buffers before we progress
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST); // we will be using depth testing

    // Button Manipulations
    // this will consist of:
    // X - translate wireframe in positive x direction
    // C - translate wireframe in negative x direction
    // Y - translate wireframe in positive y direction
    // U - translate wireframe in negative y direction
    // Z - translate wireframe in positive z direction
    // A - translate wireframe in negative z direction
    // R - rotate wireframe in an x-roll about its current position
    // B - toggles pulsing

    window.onkeypress = function (event)
    {

        keystroke = event.key; // finds the key that was pressed

        /*switch (keystroke)
        {
            case 'x':
            case 'c':
            case 'y':
            case 'u':
            case 'z':
            case 'a':
            case 'r':
            case 'b':
           could use switch statement here - come back to this
        }*/

        if (keystroke == 'x') // responsible for translating in pos x direction
        {

            if (posnegTester() == 1) //tests for positive or negative direction, returns 1 all = 0
            {
                noTransformations();
            }
            else if (this.posx == 0) //if were not moving in pos x direc already
            {
                turnOff();
                this.posx = 1; //then we should move in the pos x direc after x press
            }
            else
            {
                this.posx = 0; //keep movement off
            }
        }

        if (keystroke == 'c') // responsible for translating in neg y direction
        {

            if (posnegTester() == 1) // if all are off
            {
                noTransformations(); //keep them that way
            }
            else if (this.negx == 0) // however if we press this key
            {
                turnOff();
                this.negx = 1; //trigger movement in neg x direction
            }
            else
            {
                this.negx = 0; // no neg x direc movement
            }
        }

        if (keystroke == 'y') // responsible for translating in pos y direc
        {

            if (posnegTester() == 1) // if all are = 0
            {
                noTransformations(); // keep them that way
            }
            else if (this.posy == 0) // however, if we make this keypress
            {
                turnOff();
                this.posy = 1; // we want to move in the positive y direction
            }
            else
            {
                this.posy = 0; // all other cases will keep this off
            }
        }

        if (keystroke == 'u') // responsible for translation in negative y direction
        {
            if (posnegTester() == 1) // if all = 0
            {
                noTransformations(); // keep it that way
            }
            else if (this.negy == 0) // however, if we make the following key press
            {
                turnOff();
                this.negy = 1; // we want to trigger movement to the negative y direction
            }
            else
            {
                this.negy = 0; // keep negative y movement off
            }
        }

        if (keystroke == 'z') // responsible for translation in positive z direction
        {
            if (posnegTester() == 1) // if all = 0
            {
                noTransformations(); // keep it that way
            }
            else if (this.posz == 0) // however if we press this key
            {
                turnOff();
                this.posz = 1; // trigger movement in the positive z direction
            }
            else
            {
                this.posz = 0; // keep positive z movement off
            }
        }

        if (keystroke == 'a') // responsible for translation in negative z direction
        {
            if (posnegTester() == 1) // if all = 0
            {
                noTransformations(); // keep it that way
            }
            else if (this.negz == 0) // however, if we press this key
            {
                turnOff();
                this.negz = 1; // we want to trigger movement in the negative z direction
            }
            else
            {
                this.negz = 0; // keep negative z movement off
            }
        }

        if (keystroke == 'r') // responsible for xroll rotation about current position
        {
            if (posnegTester() == 1) // if all = 0
            {
                noTransformations(); // keep it that way
            }
            else if (this.isitRotating == 0) // however, if we press the r key
            {
                turnOff();
                this.isitRotating = 1; // we want to trigger a rotation
            }
            else
            {
                this.isitRotating = 0; // keep rotation off
            }
        }

        if (keystroke == 'b') // responsible for mesh pulsing
        {
            if (this.isitPulsing == 0) // if we arent already pulsing...
            {
                this.isitPulsing = 1; // then pulse!
                if (keystroke == 'r') // if we press r inside of this 'mode'
                {
                    isitRotating = 1; // trigger rotation also
                    if (keystroke == 'x')
                    {
                        turnOff();
                        this.posx = 1;
                    }
                    else if (keystroke == 'c')
                    {
                        turnOff();
                        this.negx = 1;
                    }
                    else if (keystroke == 'y')
                    {
                        turnOff();
                        this.posy = 1;
                    }
                    else if (keystroke == 'u')
                    {
                        turnOff();
                        this.negy = 1;
                    }
                    else if (keystroke == 'z')
                    {
                        turnOff();
                        this.posz = 1;
                    }
                    else if (keystroke == 'a')
                    {
                        turnOff();
                        this.negz = 1;
                    }
                }
                else
                {
                    isitRotating = 0; // if not then just keep it off
                }
            }
            else
            {
                this.isitPulsing = 0; // keep pulsing off
            }
        }
    }

    // File Mode Manipulations - very similar to P1

    document.getElementById('FileInsertion').onchange = function ()
    {

        var file = document.getElementById('FileInsertion').files[0]; // gets our file

        if (file) // if our file exists and is obtained - we want to read it correctly
        {

            var read = new FileReader();

            // Called when file is selected
            read.onload = function (e)
            {

                defaultSetter(); // set some defaults
                // we could technically do it here, but it'll free up main space

                noTransformations(); // set some transformation defaults
                isitPulsing = 0;
                breatheIn = 0;

                gl.clear(gl.COLOR_BUFFER_BIT); // clear our color buffer

                var data = e.target.result; // takes in the data from our file


                cleanData = cleanUp(data.split("\n")); // split the file contents

                var startingnum = 0; //starts a count for whats actually meaningful in our file

                // Set up a for loop to go through the header
                for (var i = 0; i < cleanData.length; i++) // i will represent the number of vertices
                {
                    storeithere = cleanData.length;

                    placeHolder = cleanUp(cleanData[i].split(' '));
                    switch (i) // switch to if statements if this doesnt work
                    {
                        case 6:
                            if (placeHolder.length == 3)
                            {
                                polyCount = parseFloat(placeHolder[2]);
                            }
                            else
                            {

                            }
                        case 2:
                            if (placeHolder.length == 3)
                            {
                                vertCount = parseFloat(placeHolder[2]);
                            }
                            else
                            {

                            }
                        case 0:
                            if (cleanData[i].includes("ply"))
                            {
                                continue;
                            }
                            else
                            {
                                // could make an alert here saying its not valid
                                // I personally don't really care for them
                            }
                    }
                    anotherstore = i * 8; //tester
                    if (cleanData[i].includes('property') ||
                        cleanData[i].includes('format'))
                    {
                        // we want to skip through property
                    }
                    else if (cleanData[i].includes('end_header'))
                    {
                        startingnum = i + 1;
                        break;
                    }
                }

                coordinateClean(); // resets x,y, and z coordinates

                for (var i = startingnum; i < cleanData.length; i++)
                {

                    placeHolder = cleanUp(cleanData[i].split(" ")); // eliminate spaces to concatenate

                    if (placeHolder.length == 3)
                    {
                        xs = parseFloat(placeHolder[0]);
                        ys = parseFloat(placeHolder[1]);
                        zs = parseFloat(placeHolder[2]);

                        xCoordinates.push(xs);
                        yCoordinates.push(ys);
                        zCoordinates.push(zs);

                        vertices.push(vec4(xs, ys, zs, 1.0));
                    }

                    else
                    {
                        instructs.push(placeHolder.slice(1, 4));
                    }
                }

                maxANDmin(); // finds the max and min x,y,z coordinates
                meshCenter(); // calculates the center of the mesh

                for (var i = 0; i < instructs.length; i++) // this is where we will load the mesh
                {
                    for (var j = 0; j < instructs[i].length; j++)
                    {
                        vertex = vertices[parseInt(instructs[i][j])];
                        mesh.push(vertex);
                        colors.push(vec4(1.0, 1.0, 1.0, 1.0)); // Color of the mesh - white in demo
                        //colors.push(vec4(1.0, 0.0, 0.0, 0.0)); // I like the idea of having it be red or blue
                        if (j == 0)
                        {
                            firstVertex = vertex;
                        }
                        else if (j == 1)
                        {
                            secondVertex = vertex;
                        }
                        else
                        {
                            thirdVertex = vertex;
                        }
                    }
                    newellMethod(); // this is where the newell magic happens
                }

                howFar(); // this function will handle the distance from the mesh

                projMatrix = perspective(30, 1, 0.1, eyeZ + mHeight + mThickness);

                bufferItOut(); // this function removes all the buffer clutter that hangs around in the code

                transformationSetter(); //sets the transormation variables for the animation

                render(); // this is where the animation will happen
            }
            read.readAsText(file);

        }
        else
        {
            // again... there can be an alert here... i just dont really care for them
            // more-so helpful as a diagnosis tool
        }
    };

}

// This function checks to see if the positive and negative x,y, and z toggles are = 0
function posnegTester()
{
    if (this.posx || this.negx || this.posy || this.negy ||
        this.posz || this.negz || this.isitRotating)
    {
        return 1; // if they are then we return a random value that we can address within our if statements
    }
    else
    {
        return 0;
    }
}

// This function turns off all transformations
function noTransformations()
{
    this.posx = 0;
    this.negx = 0;
    this.posy = 0;
    this.negy = 0;
    this.posz = 0;
    this.negz = 0;
    this.isitRotating = 0;
}

// This function will turn off all fields that trigger movement
function turnOff()
{
    this.posx = 0;
    this.negx = 0;
    this.posy = 0;
    this.negy = 0;
    this.posz = 0;
    this.negz = 0;
    this.isitRotating = 0;
}

// this function sets some defaults for various fields that might require empty arrays
// we dont want these fields to be populated every time we select a new file
function defaultSetter()
{
    colors = [];
    vertices = [];
    instructs = [];
    mesh = [];
    vecNormals = [];
    pulseEffect = 0;
}

//Cleans the data from the file
function cleanUp(targetarray)
{
    var freshcollection;
    freshcollection = [];
    for (i =0; i<targetarray.length; i++)
    {
        if ((targetarray[i].length != 0) && (targetarray[i] != '\r'))
        {
            freshcollection.push(targetarray[i]);
        }
    }
    return freshcollection;
}

//This function cleans the x,y, and z coordinates - a restart if you will
function coordinateClean()
{
    xCoordinates = [];
    yCoordinates = [];
    zCoordinates = [];
}

//This function calculates the max and min of the given coordinates
function maxANDmin()
{
    maxx = Math.max(...xCoordinates);
    minx = Math.min(...xCoordinates);
    maxy = Math.max(...yCoordinates);
    miny = Math.min(...yCoordinates);
    maxz = Math.max(...zCoordinates);
    minz = Math.min(...zCoordinates);
}

// This function calculates the center of our mesh
function meshCenter()
{

    centralX = (maxx + minx) / 2;
    centralY = (maxy + miny) / 2;
    centralZ = (maxz + minz) / 2;
}

// This function calculates normals using the Newell Method
function newellMethod()
{
    xNorm = (firstVertex[1] - secondVertex[1]) * (firstVertex[2] + secondVertex[2])
        + (secondVertex[1] - thirdVertex[1]) * (secondVertex[2] + thirdVertex[2])
        + (thirdVertex[1] - firstVertex[1]) * (thirdVertex[2] + firstVertex[2]);

    yNorm = (firstVertex[2] - secondVertex[2]) * (firstVertex[0] + secondVertex[0])
        + (secondVertex[2] - thirdVertex[2]) * (secondVertex[0] + thirdVertex[0])
        + (thirdVertex[2] - firstVertex[2]) * (thirdVertex[0] + firstVertex[0]);

    zNorm = (firstVertex[0] - secondVertex[0]) * (firstVertex[1] + secondVertex[1])
        + (secondVertex[0] - thirdVertex[0]) * (secondVertex[1] + thirdVertex[1])
        + (thirdVertex[0] - firstVertex[0]) * (thirdVertex[1] + firstVertex[1]);

    vecNormals.push(normalize(vec4(xNorm, yNorm, zNorm, 1.0)));
}

function newellM(arr)
{

    arr.push(arr[0]);
    for(var i = 0; i < arr.length-1; i++){
        xNorm += (arr[i][1] - arr[i+1][1]) * (arr[i][2] + arr[i+1][2]);
        yNorm += (arr[i][2] - arr[i+1][2]) * (arr[i][0] + arr[i+1][0]);
        zNorm += (arr[i][0] - arr[i+1][0]) * (arr[i][1] + arr[i+1][1]);
        vecNormals.push(normalize(vec4(xNorm, yNorm, zNorm, 1.0)));
        //not working - potentially come back to
    }
}

// This function calculates the distance from the mesh
function howFar()
{
    var tester = 1.0;
    mHeight = maxy - miny;
    mWidth = maxx - minx;
    mThickness = maxz - minz;
    opx = Math.abs(mWidth / 2);
    opy = Math.abs(mHeight / 2);
    opz = Math.abs(mThickness * tester / 2); // this will not be needed
    xDist = opx / (Math.tan(Math.PI / 16));
    yDist = opy / (Math.tan(Math.PI / 16));
    zDist = Math.abs(mThickness * 3);
    eyeZ = ((maxz +tester) - tester) + Math.max(xDist, yDist, zDist);
}

//This function controls the annoyance of buffering
function bufferItOut()
{
    var pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mesh), gl.STATIC_DRAW);

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
    gl.uniform1f(vPointSize, 2.0);

    var projMatrixLoc = gl.getUniformLocation(program, "projMatrix");
    gl.uniformMatrix4fv(projMatrixLoc, false, flatten(projMatrix));
}

//This function sets all of the transformation variables to their default values
function transformationSetter()
{

    theta = 0;
    movementX = 0;
    movementY = 0;
    movementZ = 0;
    speed = mWidth / 300; // can play with this speed a little also
}

function render()
{
    switch (posx) // moving in positive x direction
    {
        case 1:
            theta = theta; // theta will stay the same
            movementX = movementX + (speed*4); // can play with the speed a little bit more
            movementY = movementY; // y will also stay the same
            movementZ = movementZ; // neither is z
    }
    switch (negx) // moving in negative x direction
    {
        case 1:
            theta = theta; // theta remains the same
            movementX = movementX - (speed*4); // same here.. speed can be adjusted
            movementY = movementY; // y is not going to change
            movementZ = movementZ; // neither is z
    }
    switch (posy) // moving in positive y direction
    {
        case 1:
            theta = theta;
            movementX = movementX;
            movementY = movementY + speed; // we could make all speeds equivalent here
            movementZ = movementZ;

    }
    switch (negy) // moving in negative y direction
    {
        case 1:
            theta = theta;
            movementX = movementX;
            movementY = movementY - speed;
            movementZ = movementZ;
    }
    switch (posz) // moving in positive z direction
    {
        case 1:
            theta = theta;
            movementX = movementX;
            movementY = movementY;
            movementZ = movementZ + speed; // speed can be manipulated here also
    }
    switch (negz) // moving in negative z direction
    {
        case 1:
            theta = theta;
            movementX = movementX;
            movementY = movementY;
            movementZ = movementZ - speed;
    }
    switch (isitRotating) // rotation cues
    {
        case 1:
            theta = theta + 0.9; // this will facilitate the quickness of the rotation we would like
            movementX = movementX;
            movementY = movementY;
            movementZ = movementZ;
    }
    // if none of the above, then everything will stay the same.
    theta = theta;
    movementX = movementX;
    movementY = movementY;
    movementZ = movementZ;


    translateM = translate(movementX, movementY, movementZ);
    tOriginM = translate(-centralX, -centralY, -centralZ);
    tMeshM = translate(centralX, centralY, centralZ);
    rotationM = rotate(theta, vec3(1, 0, 0));


    rOriginM = mult(rotationM, tOriginM); // rotate at the origin
    rMeshM = mult(tMeshM, rOriginM);
    combine = mult(translateM, rMeshM);

    // Calls on function for camera setup
    lightscameraACTION();

    var viewMatrixLoc = gl.getUniformLocation(program, 'viewMatrix');
    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);

    pulseControl();

    // function to control the drawing
    drawIt();

    id = requestAnimationFrame(render);
}

//This function sets the camera
function lightscameraACTION()
{
    up = vec3(0.0, 1.0, 0.0);
    at = vec3(centralX, centralY, centralZ);
    eye = vec3(centralX, centralY, eyeZ);
    viewMatrix = lookAt(eye, at, up);
}

// This function controls our pulses
function pulseControl()
{
    //Controlling the Pulse
    if (isitPulsing) // if it is pulsing
    {
        // Set our pulsing in attributes
        if (breatheIn)
        {
            if (pulseEffect <= 0)
            {
                breatheIn = 0;
            }
            pulseEffect = pulseEffect - mWidth / 200; // we can play with the numbers here a little bit
        }
        // Set our pulsing out attributes
        else
        {
            if (pulseEffect >= mWidth / 8)
            {
                breatheIn = 1;
            }
            pulseEffect = pulseEffect + mWidth / 200; // we can play with the numbers here a little bit
        }
    }
}

// This function will draw our mesh in triangles
function drawIt()
{
    for (var x = 0; x < mesh.length; x += 3)
    {
        var pulsingTranslateMatrix = translate(vecNormals[x / 3][0] * pulseEffect, vecNormals[x / 3][1] * pulseEffect, vecNormals[x / 3][2] * pulseEffect);
        stack.push(combine); // store the old matrix
        combine = mult(combine, pulsingTranslateMatrix);

        var ctMatrixLoc = gl.getUniformLocation(program, "modelMatrix");
        gl.uniformMatrix4fv(ctMatrixLoc, false, flatten(combine));

        gl.drawArrays(gl.LINE_LOOP, x, 3); // this draws for every 3 vertices

        combine = stack.pop(combine); //restore
    }
}
