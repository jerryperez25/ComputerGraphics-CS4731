var canvas;
var gl;
var projMatrix;
var viewMatrix;
var modelView;
var fovy = [];
fovy = 35;
var aspect;
aspect = [];
var theta = [];
theta = 0;
var scale;
scale = [];
var testFactor = [];
testFactor = 0;
var directionrot;
directionrot = [];
var deltx;
deltx= [];
var delty;
delty = [];
var deltz;
deltz = [];
var placeholder;
placeholder = [];
var coordinatesx;
coordinatesx = [];
var shadowS;
shadowS = [];
var emptyQ;
emptyQ = [];
var extentsofQ;
extentsofQ = [];
var Qnormals;
Qnormals = [];
var qtexcoords;
qtexcoords = [];
var emptySph;
emptySph = [];
var extentsofSph;
extentsofSph = [];
var sphnormals;
sphnormals = [];
var sphtexcoords;
sphtexcoords = [];
var id;
id = [];
var shadowmath;
shadowmath = [];
var diffuseP;
diffuseP = [];
var specularP;
specularP = [];
var ambientP;
ambientP = [];
var eye;
eye = [];
var at;
at = [];
var up;
up = [];
var nheight;
nheight = [];
var texture;
texture = [];
var texturecoords;
texturecoords = [];
var left;
left = [];
var right;
right = [];
var cubeConfig;
cubeConfig = [];
var xExtents;
xExtents = [];
var yExtents;
yExtents = [];
var zExtents;
zExtents = [];

var lightPos = [];
lightPos = vec4(0.0, 1.0, 1.0, 1.0);
var lightAmb = [];
lightAmb = vec4(0.2, 0.2, 0.2, 1.0);
var lightDiff = [];
lightDiff = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpec = [];
lightSpec = vec4(1.0, 1.0, 1.0, 1.0);
var materialAmb = [];
materialAmb = vec4(0.5, 0.5, 1.0, 1.0);
var materialDiff = [];
materialDiff = vec4(0.4, 0.4, 0.4, 1.0);
var materialSpec = [];
materialSpec = vec4(0.2, 0.2, 0.2, 1.0);
var shine = [];
shine = 10.0;
var points;
points = [];
var increment = [];
incrmement = 0;
var first = [];
first = vec4(0.0, 0.0, -1.0, 1);
var second = [];
second = vec4(0.0, 0.942809, 0.333333, 1);
var third = [];
third = vec4(-0.816497, -0.471405, 0.333333, 1);
var fourth = [];
fourth = vec4(0.816497, -0.471405, 0.333333, 1);
var divideby = [];
divideby = 5;
var spotlightang = [];
spotlightang = 0;
var lightpos = [];
lightpos = vec4(1.0, 1.0, 1.0, 1.0 );
var howfar = [];
howfar = 4;
var parentNode;
parentNode = [];
var stack;
stack = [];
var spotlight = [];
spotlight = 0.80; //could be modified a bit
var mintex = [];
mintex = 0.0;
var maxtex = [];
maxtex = 4;
var texCoord = [
    vec2(mintex, mintex),
    vec2(mintex, maxtex),
    vec2(maxtex, maxtex),
    vec2(maxtex, mintex)
];
var textures = {
    //will do for project 4
};
var loadedTextures = {};
var colors =
    {
        "red": vec4(1.0, 0.0, 0.0, 1),
        "light-red": vec4(1.0, 0.0, 0.0, 0.5),
        "green": vec4(0.0, .5, 0.0, 1),
        "light-green": vec4(0.0, .5, 0.0, 0.5),
        "blue": vec4(0.0, 0.0, 1.0, 1),
        "light-blue": vec4(0.0, 0.0, 1.0, 0.5),
        "wall-blue": vec4(0.2, 0.2, 1.0, 1),
        "yellow": vec4(1, 1, 0.0, 1),
        "light-yellow": vec4(1, 1, 0.0, 0.5),
        "cyan": vec4(0.0, 1, 1, 1),
        "cyan2": vec4(0.0, 1, 1, 0.5),
        "magenta": vec4(1.0, 0.0, 1.0, 1),
        "magenta2": vec4(1.0, 0.0, 1.0, 0.5),
        "white": vec4(1.0, 1.0, 1.0, 1.0),
        "floor-grey": vec4(.7, .7, .7, 1.0),
        "gray":  vec4(.7, .7, .7, 0.5)
    };
var environment;
environment = [];
var environmentNorms;
environmentNorms = [];
var environmentCoords;
environmentCoords = [];
var isittextd = [];
isittextd = true;
var isitrefrac = [];
isitrefrac = false;
var isitreflect = [];
isitreflect = false;
var arethereshadows = [];
arethereshadows = false;
var nulltest;
nulltest = null;
var undefinedtest;
undefinedtest = undefined;


//Here we will make an attempt to create a class that will allow us to create nodes that have vertices, normals, texture coordinates
// color, right children, left children, and of course... extents. This will allow us to hierarchically create our model.

class node
{
    constructor(vertices, normals, textureCoor, color, right, left, extents)
    {
        this.vertices = [];
        this.vertices = vertices;
        this.normals = [];
        this.normals = normals;
        this.textureCoor = [];
        this.textureCoor = textureCoor;
        this.color = [];
        this.color = color;
        this.right = [];
        this.right = right;
        this.left = [];
        this.left = left;
        this.parent = [];
        this.parent = nulltest;
        this.extents = [];
        this.extents = extents;
        this.width = this.extents[0][1] - this.extents[0][0]; //finds width
        this.height = this.extents[1][1] - this.extents[1][0]; //finds height
        this.centerX = (this.extents[0][1] + this.extents[0][0])/2; //calculates center of x
        this.centerY = (this.extents[1][1] + this.extents[1][0])/2; // calculates center of y
    }

    //Here, we must insert the child into our model (from left to right)
    insert(x)
    {
        scale = Math.max((x.extents[0][1] - x.extents[0][0])/(parentNode.extents[0][1] - parentNode.extents[0][0]), (x.extents[1][1] - x.extents[1][0])/(parentNode.extents[1][1] - parentNode.extents[1][0]), (x.extents[2][1] - (testFactor + x.extents[2][0]))/(parentNode.extents[2][1] - (testFactor + parentNode.extents[2][0])));
        var lengthofxverts = x.vertices.length;

        for(var i = 0; i < lengthofxverts; i++)
        {
            x.vertices[i][3] = scale;
        }


        if(this.left == nulltest) // if the left side is empty
        {
            this.left = testFactor;
            //alert ("this is working");
            this.left = x;

            if (testFactor == 0)
            {
                //alert ("this is working now");
                this.left.parent = this;
            }
        }
        else if(this.right == nulltest) // if the right side is empty
        {
            if(testFactor != 1)
            {
                //alert ("this is working");
                this.right = x;
                this.right.parent = this;
            }
        }
        else
        {
            if (testFactor == 0)
            {
                //alert ("this is working too");
                if(numofNodes(this.right) > numofNodes(this.left))
                {
                    this.left.insert(x);
                }
                else
                {
                    this.right.insert(x);
                }
            }
        }
    }

    //draws all of the models
    drawModels()
    {
        gl.uniform1f(gl.getUniformLocation(program, "isShadow"), 0.0);

        directionrot = Math.pow(-1, howFar(this) + 1); // rotate in the opposite direction of the one below
        var drawncols = [];
        var vertlength = (testFactor + 1) * this.vertices.length;

        for (var i = 0; i < vertlength; i++)
        {
            drawncols.push(this.color);
        }

        // Buffering
        var vNormal = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vNormal);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), gl.STATIC_DRAW);

        var vNormalPosition = gl.getAttribLocation(program, "vNormal");
        gl.vertexAttribPointer(vNormalPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormalPosition);

        var pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(drawncols), gl.STATIC_DRAW);

        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

        var tBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.textureCoor), gl.STATIC_DRAW);

        var tPosition = gl.getAttribLocation(program, "vTexCoord");
        gl.vertexAttribPointer(tPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(tPosition);

        //Rotate the model about the y axis
        viewMatrix = mult(viewMatrix, rotateY(theta * Math.pow(2, howFar(this) / 3)));
        gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);

        stack.push(viewMatrix);

        //This is for shadow rendering which still isnt working just yet
        switch (arethereshadows)
        {
            case true:
            {
                gl.uniform1f(gl.getUniformLocation(program, "isShadow"), 1.0);
                placeholder = mult(viewMatrix, vec4(0.0, 0.0, 0.0, 1.0));
                coordinatesx = placeholder[0];
                delty = placeholder[1];
                shadowS = 30.0; // shadow control, we can toy with this later


                switch (coordinatesx)
                {
                    case (coordinatesx == 0):
                    {
                        deltz = -shadowS;
                        deltx = 0;
                    }
                    case (coordinatesx < 0):
                    {
                        deltz = (shadowS + coordinatesx) / ((coordinatesx / lightPos[2]) - 1);
                        deltx = -1 * deltz - shadowS;
                    }
                }
                deltz = testFactor +((coordinatesx - shadowS) / ((coordinatesx / lightPos[2]) + 1));
                deltx = (testFactor*deltz) + shadowS;
                translateIt();
            }
        }

        viewMatrix = stack.pop();
        gl.uniform1f(gl.getUniformLocation(program, "isShadow"), 0.0);

        var numabove = howFar(this); // this will give us the nodes that are above us

        //rotate
        viewMatrix = mult(viewMatrix, rotateY(directionrot * theta * Math.pow(4, howFar(this))));
        //rotate the children
        var childrot = (theta * Math.pow(3, howFar(this)));
        stack.push(viewMatrix);


        if ((testFactor -1) == -1)
        {
            //alert ("this is working");
            if(this.left != nulltest)
            {
                viewMatrix = mult(viewMatrix, translate(parentNode.width * -howfar/numabove, -howfar * parentNode.width, 0));
                viewMatrix = mult(viewMatrix, rotateY(childrot));
                gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));
                this.left.drawModels();
            }
            viewMatrix = stack.pop();
            stack.push(viewMatrix);

            //do the same thing to the right as we did on the left
            if(this.right != nulltest)
            {
                viewMatrix = mult(viewMatrix, translate(parentNode.width * howfar/numabove, -howfar * parentNode.width, 0));
                viewMatrix = mult(viewMatrix, rotateY(childrot));
                gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));
                this.right.drawModels();
            }
            viewMatrix = stack.pop();
            this.lineDraw(); // draws the connecting lines
        }

    }

    lineDraw()
    {
        var lines = [];
        var lineColors = [];
        var numabove = howFar(this);
        createTex(colors.white);

        if (testFactor == 0)
        {
            //alert ("this is working");
            if(this.left != nulltest) // we are only gunna draw the lines if we have something to connect it to
            {
                lines.push(vec4(this.centerX, this.centerY, 0.0, 1.0), vec4(this.centerX, -howfar/2, 0.0, 1.0), vec4(this.centerX, -howfar/2, 0.0, 1.0), vec4(-parentNode.width*howfar/numabove, -howfar/2, 0.0, 1.0), vec4(-parentNode.width*howfar/numabove, -howfar/2, 0.0, 1.0), vec4(-parentNode.width*howfar/numabove, -parentNode.height*howfar, 0.0, 1.0));
                lineColors.push(colors.white, colors.white, colors.white, colors.white, colors.white, colors.white);
            }
            if(this.right != nulltest) // same goes for the right hand side
            {
                lines.push(vec4(this.centerX, this.centerY, 0.0, 1.0), vec4(this.centerX, -howfar/2, 0.0, 1.0), vec4(this.centerX, -howfar/2, 0.0, 1.0), vec4(parentNode.width*howfar/numabove, -howfar/2, 0.0, 1.0), vec4(parentNode.width*howfar/numabove, -howfar/2, 0.0, 1.0), vec4(parentNode.width*howfar/numabove, -parentNode.height*howfar, 0.0, 1.0));
                lineColors.push(colors.white, colors.white, colors.white, colors.white, colors.white, colors.white);
            }
        }

        //Now we actually have to put the lines to the screen using buffers
        var pBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(lines), gl.DYNAMIC_DRAW);

        var vPosition = gl.getAttribLocation(program,  "vPosition");
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(lineColors), gl.DYNAMIC_DRAW);

        var vColor= gl.getAttribLocation(program,  "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

        gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));

        gl.drawArrays(gl.LINES, 0, lines.length);
    }


    //This will call the gouraud normals for the models that we have
    gouraudShade()
    {
        this.normals = gouraudNorms(this.vertices);

        if(testFactor == 0)
        {
            //alert ("we are in the gouraud portion of our code");
            if(this.left != nulltest) // if we have stuff in the left then get those normals
            {
                this.left.gouraudShade();
            }
            if(this.right != nulltest) // if we have stuff in the right then get those normals
            {
                this.right.gouraudShade();
            }
        }
    }

    //This will call the normals that are needed in order to perform flat shading
    flatShade()
    {
        this.normals = getNormals(this.vertices);

        if (testFactor == 0)
        {
            //alert ("we are in the flat shading portion of our code");
            if(this.left != nulltest) // if we have stuff in the left then get those normals
            {
                this.left.flatShade();
            }
            if(this.right != nulltest) // if we have stuff in the right then get those normals
            {
                this.right.flatShade();
            }
        }

    }
}

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

    //Sets the aspect ratio
    aspect = canvas.width / canvas.height;

    // Here we will set the background color for our space
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background

    gl.clear(gl.COLOR_BUFFER_BIT); // clear the buffers before we progress
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST); // we will be using depth testing
    gl.enable(gl.CULL_FACE);

    //Button Manipulations
    // this is where we will set up our m,n,p, and i presses
    // m will trigger flat shading
    // n will trigger gouraud shading
    // p will increase spotlight angle
    // i will decrease spotlight angle


    window.onkeydown = function(event)
    {
        var keypress = event.key

        //implemented functionality on all keypresses whether it be lowercase or upper
        if (keypress == 'm')
        {
            //parentNode.flatShade();
            parentNode.gouraudShade();
        }
        else if(keypress == 'M')
        {
            parentNode.flatShade();
            //parentNode.flatShade();
        }
        else if(keypress == 'n')
        {
            //parentNode.gouraudShade();
            parentNode.flatShade();
        }
        else if (keypress == 'p')
        {
            this.spotlightang += 1;
            lightpos = vec4(1.0, 1.0,this.spotlightang, 1.0 );
            gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightpos));
        }
        else if (keypress == 'P')
        {
            this.spotlightang -= 1;
            lightpos = vec4(1.0, 1.0,this.spotlightang, 1.0 );
            gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightpos));
        }
        else if (keypress == 'i')
        {
            this.spotlightang -= 1;
            lightpos = vec4(1.0, 1.0,this.spotlightang, 1.0 );
            gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightpos));
        }
    }

    if(testFactor == 0)
    {
        //alert ("this is working");
        emptyQ = cube(); //creates a blank cube
        extentsofQ = extents(emptyQ); // sets the cube with extents
        Qnormals = gouraudNorms(emptyQ); //obtain normals
        qtexcoords = texturecoords; //get texture
    }


    emptySph = sphereMod(); //blank sphere
    extentsofSph = extents(emptySph); // set sphere with extents
    sphnormals = gouraudNorms(emptySph); // obtain normals
    sphtexcoords = texturecoords; // get texture


    //Environmental Setup

    environment.push(quad(2, 3, 7, 6), quad(5, 4, 7, 6), quad(0, 3, 7, 4));
    environmentNorms.push(gouraudNorms(quad(2, 3, 7, 6)), gouraudNorms(quad(5, 4, 7, 6)), gouraudNorms(quad(0, 3, 7, 4)));
    environmentCoords.push(quadTex(), quadTex(), quadTex());

    //Scale the walls
    for(var i = 0; i < environment[0].length; i++)
    {
        if (testFactor == 0)
        {
            //alert("we are in the for loop to scale the walls");
            environment[0][i][3] = .03;
        }
    }

    for(var i = 0; i < environment[0].length; i++)
    {
        environment[1][i][3] = .03;
    }

    //This is where we will create our hierarchical model

    parentNode = (new node(emptySph, sphnormals, sphtexcoords, colors.blue, nulltest, nulltest, extentsofQ));
    if (parentNode != null)
    {
        parentNode.insert(new node(emptyQ, Qnormals, qtexcoords, colors.green, nulltest, nulltest, extentsofQ));
        parentNode.insert(new node(emptySph, sphnormals, sphtexcoords, colors.cyan, nulltest, nulltest, extentsofSph));
        parentNode.insert(new node(emptySph, sphnormals, sphtexcoords, colors.magenta, nulltest, nulltest, extentsofSph));
        parentNode.insert(new node(emptyQ, Qnormals, qtexcoords, colors.red, nulltest, nulltest, extentsofQ));
        parentNode.insert(new node(emptySph, sphnormals, sphtexcoords, colors.gray, nulltest, nulltest, extentsofSph));
        parentNode.insert(new node(emptyQ, Qnormals, qtexcoords, colors.yellow, nulltest, nulltest, extentsofQ));
    }


    //This will be used for project 4 - image loading - need to define the textures
    loadedTextures["grass"] = loadImage(textures.grass);
    loadedTextures["stone"] = loadImage(textures.stone);
    loadedTextures["environmentPX"] = loadImage(textures.environmentPX);
    loadedTextures["environmentNX"] = loadImage(textures.environmentNX);
    loadedTextures["environmentPY"] = loadImage(textures.environmentPY);
    loadedTextures["environmentNY"] = loadImage(textures.environmentNY);
    loadedTextures["environmentPZ"] = loadImage(textures.environmentPZ);
    loadedTextures["environmentNZ"] = loadImage(textures.environmentNZ);


    var thisPers = perspective(fovy, aspect, 0.1, 10000); //sets the perspective of our project
    var projMatrix = gl.getUniformLocation(program, 'projMatrix');
    gl.uniformMatrix4fv(projMatrix, false, flatten(thisPers));

    var loc = gl.getUniformLocation(program, "vPointSize");
    gl.uniform1f(loc, 10.0);

    productMath();

    //uses the products to send into our vertex shader
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseP));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularP));
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientP));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPos));
    gl.uniform1f(gl.getUniformLocation(program, "shininess"), shine);
    gl.uniform1f(gl.getUniformLocation(program, "spotlightSize"), spotlight);

    gl.uniform1f(gl.getUniformLocation(program, "isReflect"), 0.0);
    gl.uniform1f(gl.getUniformLocation(program, "isRefract"), 0.0);
    gl.uniform1f(gl.getUniformLocation(program, "isShadow"), 0.0);


    shadowCalc(); // this will calculate the shadow

    render(); //renders our hierarchical structure
}


function render()
{

    cancelAnimationFrame(id);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //clear buffers

    //Center the view
    var nheight = getNodeHeight(parentNode);
    var width = parentNode.width;

    //Configure eye, at, and up for out lookAt() function
    eye = vec3(0, -nheight, howfar * width * nheight);
    at = vec3(0, -nheight, 0);
    up = vec3(0.0, 1.0, 0.0);

    viewMatrix = lookAt(eye, at, up);

    //Send that to vertex shader
    var viewMatrixLoc = gl.getUniformLocation(program, 'viewMatrix');
    gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix));

    modelView = gl.getUniformLocation(program, "modelMatrix");

    gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));

    cubeConfig = gl.createTexture();

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeConfig);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    //Cube textures - this will be used for project 4
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedTextures.environmentPX);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedTextures.environmentNX);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedTextures.environmentPY);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedTextures.environmentNY);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedTextures.environmentPZ);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, loadedTextures.environmentNZ);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "textureMap"), 2);


    drawEnv(); // this function will be used to draw the walls and the floors
    viewMatrix = stack.pop();

    theta+=.45; // this is what determines the speed of our rotation

    gl.uniform1f(gl.getUniformLocation(program, "isTextured"), 0.0);
    parentNode.drawModels();

    id = requestAnimationFrame(render); //animate
}


function drawEnv() //this will also be used for project 4
{
    stack.push(viewMatrix);
    nheight = getNodeHeight(parentNode);

    //sets the color for the walls
    var drawncols = [];
    //drawncols.push(colors["wall-blue"], colors["wall-blue"], colors["wall-blue"], colors["wall-blue"], colors["wall-blue"], colors["wall-blue"]);


    gl.uniform1f(gl.getUniformLocation(program, "isTextured"), 1.0); //First wall

    var envNorms = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, envNorms);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(environmentNorms[0]), gl.STATIC_DRAW);

    var normPosition = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(normPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normPosition);

    var pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(environment[0]), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program,  "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(drawncols), gl.STATIC_DRAW);

    var vColor= gl.getAttribLocation(program,  "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    createTex(colors["wall-blue"]); // wall texture/color

    if(isittextd && (nulltest == null)) // if we have a texture on the wall then make it a texture
    {
        configureTex(loadedTextures.stone);
    }

    // if not then just make it a solid color
    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(environmentCoords[0]), gl.STATIC_DRAW);

    var tPosition = gl.getAttribLocation(program, "vTexCoord");
    gl.vertexAttribPointer(tPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tPosition);


    //set the view matrix
    viewMatrix = mult(viewMatrix, translate(-20, -nheight+3, -30));
    viewMatrix = mult(viewMatrix, rotateY(-45));
    gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, environment[0].length);

    //Now we move on to the second wall
    viewMatrix = stack.pop();
    stack.push(viewMatrix);

    pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(environment[1]), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program,  "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    viewMatrix = mult(viewMatrix, translate(0, -nheight+3, -10));
    viewMatrix = mult(viewMatrix, rotateY(-45));
    gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, environment[1].length);

    //Then finally.. the floor
    viewMatrix = lookAt(eye, at, up);

    pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(environment[1]), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program,  "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(drawncols), gl.STATIC_DRAW);

    vColor= gl.getAttribLocation(program,  "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    createTex(colors["floor-grey"]);

    if(isittextd && (nulltest == null)) // as above if we have a texture, then we will apply that texture
    {
        configureTex(loadedTextures.grass);
    }

    viewMat(); // configure view matrix

    gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, environment[2].length);
}


function createTex(x) // this is for project 4 also
{

    var r = parseInt(x[0] * 255);
    var g = parseInt(x[1] * 255);
    var b = parseInt(x[2] * 255);

    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([r, g, b, 255, r, g, b, 255, r, g, b, 255, r, g, b, 255])
    );

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 1);
}

//This will take an image and turn it into a texture (project 4)
function configureTex(image)
{

    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}

function loadImage(url)
{
    var image = new Image();
    image.crossOrigin = "";
    image.src = url;
    image.onload = function()
    {
        return image;
    };
    return image.onload();
}

//Texture Func
function turnOnTexture()
{
    isittextd = !isittextd;
}

//Shadow Func
function turnOnShadow()
{
    arethereshadows = !arethereshadows;
}

//Refraction Func
function turnOnRefract()
{
    isitrefrac = !isitrefrac;

    if(isitrefrac)
        gl.uniform1f(gl.getUniformLocation(program, "isRefract"), 1.0);
    else
        gl.uniform1f(gl.getUniformLocation(program, "isRefract"), 0.0);
}

//Reflection func
function turnOnReflect()
{
    isitreflect = !isitreflect;

    if(isitreflect)
        gl.uniform1f(gl.getUniformLocation(program, "isReflect"), 1.0);
    else
        gl.uniform1f(gl.getUniformLocation(program, "isReflect"), 0.0);
}

//Creates textures for quad
function quadTex()
{
    var coords = [];
    texturecoords.push(texCoord[0]);
    texturecoords.push(texCoord[1]);
    texturecoords.push(texCoord[2]);
    texturecoords.push(texCoord[0]);
    texturecoords.push(texCoord[2]);
    texturecoords.push(texCoord[3]);

    coords.push(texCoord[0]);
    coords.push(texCoord[1]);
    coords.push(texCoord[2]);
    coords.push(texCoord[0]);
    coords.push(texCoord[2]);
    coords.push(texCoord[3]);
    return coords;
}


//Creates a cube model and returns all of its vertices
function cube()
{
    var verts = [];
    texturecoords = [];
    verts = verts.concat(quad(1, 0, 3, 2));
    verts = verts.concat(quad(2, 3, 7, 6));
    verts = verts.concat(quad(3, 0, 4, 7));
    verts = verts.concat(quad(6, 5, 1, 2));
    verts = verts.concat(quad(4, 5, 6, 7));
    verts = verts.concat(quad(5, 4, 0, 1));
    return verts;
}

//Helper function to the creation of a cube
function quad(a, b, c, d)
{
    var verts = [];

    var vertices = [
        vec4(-0.5, -0.5,  0.5, 1.0),
        vec4(-0.5,  0.5,  0.5, 1.0),
        vec4(0.5,  0.5,  0.5, 1.0),
        vec4(0.5, -0.5,  0.5, 1.0),
        vec4(-0.5, -0.5, -0.5, 1.0),
        vec4(-0.5,  0.5, -0.5, 1.0),
        vec4(0.5,  0.5, -0.5, 1.0),
        vec4(0.5, -0.5, -0.5, 1.0)
    ];

    var indi = [ a, b, c, a, c, d ];
    var indiclength = indi.length;

    for (var i = 0; i < indiclength; ++i)
    {
        verts.push(vertices[indi[i]]);
    }
    quadTex();
    return verts;
}

//Creates a sphere model and returns all of the vertices
function sphereMod()
{
    texturecoords = [];
    points = [];
    tetrahedron(first, second, third, fourth, divideby);
    return points;
}

//This will help us create the sphere
function triangleHelp(a, b, c)
{
    points.push(c);
    points.push(b);
    points.push(a);
    //Below 3 lines gets the coordinates for triangle
    texturecoords.push(texCoord[0]);
    texturecoords.push(texCoord[1]);
    texturecoords.push(texCoord[2]);
    increment += 3;
}

//assists in the creation of our sphere
function divideTriangle(a, b, c, count)
{
    if (parentNode != null)
    {
        if (count > 0)
        {

            var ab = mix(a, b, 0.5);
            var ac = mix(a, c, 0.5);
            var bc = mix(b, c, 0.5);

            ab = normalize(ab, true);
            ac = normalize(ac, true);
            bc = normalize(bc, true);

            divideTriangle(a, ab, ac, count - 1);
            divideTriangle(ab, b, bc, count - 1);
            divideTriangle(bc, c, ac, count - 1);
            divideTriangle(ab, bc, ac, count - 1);
        }
        else
        {
            triangleHelp(a, b, c);
        }
    }

}

//Also assists in the creation of our sphere
function tetrahedron(a, b, c, d, n)
{
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}

//This will return the height of the node
function getNodeHeight(whichN)
{
    if (parentNode != nulltest)
    {
        //alert("we still have models");
        if(whichN == nulltest || whichN == undefinedtest)
        {
            return 0;
        }
    }

    var left = getNodeHeight(whichN.left);
    var right = getNodeHeight(whichN.right);
    return 1 + Math.max(left, right);
}

//Gets the number of nodes
function numofNodes(aNode)
{
    if(testFactor != 1)
    {
        //alert ("making sure we are in the nodesize function");
        if(aNode == nulltest || aNode == undefinedtest)
        {
            return 0;
        }
        else
        {
            left = getNodeHeight(aNode.left);
            right = getNodeHeight(aNode.right);
        }

    }

    return 1 + left + right;
}

//This function will determine how far the current node is from the parent
function howFar(whichN)
{
    if(whichN == nulltest || whichN.parent == nulltest)
    {
        return 1;
    }
    return 1 + howFar(whichN.parent);
}

//Obtains the extents for the given object
function extents(x)
{

    xExtents = [x[0][0], x[0][0]];
    yExtents = [x[0][1], x[0][1]];
    zExtents = [x[0][2], x[0][2]];
    var modellength = x.length;

    for(var i = 0; i < modellength; i++)
    {
        if(xExtents!=nulltest)
        {
            //alert ("we are in the for loop that controls our extents");
            if(xExtents[0] > x[i][0])
            {
                xExtents[0] = x[i][0];
            }
            else if(xExtents[1] < x[i][0])
            {
                xExtents[1] = x[i][0];
            }
            else if(yExtents[0] > x[i][1])
            {
                yExtents[0] = x[i][1];
            }
            else if(yExtents[1] < x[i][1])
            {
                yExtents[1] = x[i][1];
            }

            else if(zExtents[0] > x[i][1])
            {
                zExtents[0] = x[i][1];
            }
            else if(zExtents[1] < x[i][1])
            {
                zExtents[1] = x[i][1];
            }
        }

    }
    var allExtents = [];
    allExtents.push(xExtents, yExtents, zExtents);
    return allExtents;
}

//Obtains normals
function getNormals(which)
{
    var normals = [];
    var modelllength = which.length;

    for(var i = 0; i < modelllength; i= i + 3)
    {
        var a = which[i];
        var b = which[i+1];
        var c = which[i+2];

        var normalX = (a[1] - b[1]) * (a[2] + b[2]) + (b[1] - c[1]) * (b[2] + c[2]) + (c[1] - a[1]) * (c[2] + a[2]);
        var normalY = (a[2] - b[2]) * (a[0] + b[0]) + (b[2] - c[2]) * (b[0] + c[0]) + (c[2] - a[2]) * (c[0] + a[0]);
        var normalZ = (a[0] - b[0]) * (a[1] + b[1]) + (b[0] - c[0]) * (b[1] + c[1]) + (c[0] - a[0]) * (c[1] + a[1]);
        var normal = normalize(vec4(normalX, normalY, normalZ, 0));
        normals.push(normal, normal, normal);
    }
    return normals;
}

//Obtains the gouraud normals
function gouraudNorms(which)
{
    var normals = [];
    which.map(([x, y, z]) =>
    {
        normals.push(normalize(vec4(x, y, z, 0)));
    });
    return normals;
}


function draw(cube, color)
{
    var fragColors = [];

    for(var i = 0; i < cube.length; i++)
    {
        fragColors.push(color);
    }

    var pBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cube), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program,  "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(fragColors), gl.STATIC_DRAW);

    var vColor= gl.getAttribLocation(program,  "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

}
function translateIt()
{
    viewMatrix = translate(deltx, delty-lightPos[1], deltz);
    viewMatrix = mult(viewMatrix, translate(lightPos[0], lightPos[1], lightPos[2]));
    viewMatrix = mult(viewMatrix, shadowmath);
    viewMatrix = mult(viewMatrix, translate(-lightPos[0], -lightPos[1], -lightPos[2]));
    viewMatrix = mult(viewMatrix, rotateY(theta));
    gl.uniformMatrix4fv(modelView, false, flatten(viewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
}
function productMath() //Finds the product of diffuse, specular, and ambient
{
    diffuseP = mult(lightDiff, materialDiff);
    specularP = mult(lightSpec, materialSpec);
    ambientP = mult(lightAmb, materialAmb);
}
function shadowCalc()
{
    shadowmath = mat4();
    shadowmath[3][3] = 0;
    shadowmath[3][2] = -1/lightPos[2];
}
function viewMat()
{
    viewMatrix = mult(viewMatrix, translate(2, -nheight+2, -10));
    viewMatrix = mult(viewMatrix, rotateX(-90));
    viewMatrix = mult(viewMatrix, rotateZ(45));
    viewMatrix = mult(viewMatrix, scalem(2, 1, 1));
}


