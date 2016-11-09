function createScene(width, height, inputX, time) {
    var scene = {
        width: 640,
        height: 100,
        get top () { return 0; },
        get bottom () { return height; },
        get left () { return 0; },
        get right () { return width; },
        inputX: 0,
        time: 0
    };

    return scene;
}

function defaultScene() {
    return createScene(640, 100, 320, 0);
}

function color(r, g, b) {
    var r = r || 255,
        g = g || r,
        b = b || r;
    return "color(" + r + ", " + g + ", " + b + ")";
}

// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var line = (function() {
    var scene = defaultScene();
    var lineWidth = 10;
    var speed = 1.0;
    var bottomX = 0;

    // use this function to change up how your section is drawn
    function randomize(scene) {
        lineWidth = util.random(5, 50);
        speed = util.random(0.5, 1.5);
    }

    // use this function to change your section to respond to the previous drawing
    // you can also use this for animation
    // it must return an output x to be used as input for the next scene
    function update(scene) {
        bottomX = util.mix(scene.left, scene.right, (Math.cos(scene.time) + 1) / 2);

        // return a value to be used as the scene.inputX for your neighboring scene.
        return bottomX;
    }

    // use this function to draw your section to screen
    // you can draw in the area [[0, 0], [width, height]]
    function draw(ctx, scene) {
        ctx.clearRect(scene.left, scene.top, scene.right, scene.bottom);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color(127);

        ctx.moveTo(scene.inputX, scene.top);
        ctx.lineTo(bottomX, scene.bottom);
        ctx.stroke();
    }

    return {
        name: "line object",
        randomize: randomize,
        draw: draw,
        update: update
    };
}());
