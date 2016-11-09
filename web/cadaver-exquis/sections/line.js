// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var line = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        var frame = frame;
        var lineWidth = util.random(5, 50);
        var speed = util.random(0.5, 1.5);
        var rightX = 0;

        // use this function to change your section to respond to the previous drawing
        // you can also use this for animation
        // it must return an output x to be used as input for the next frame
        function update(frame) {
            rightX = util.mix(frame.top, frame.bottom, (Math.cos(frame.time) + 1) / 2);

            // return a value to be used as the frame.inputX for your neighboring frame.
            return rightX;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx, frame) {
            ctx.clearRect(frame.left, frame.top, frame.right, frame.bottom);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = util.color(127);

            ctx.moveTo(frame.top, frame.input);
            ctx.lineTo(frame.right, rightX);
            ctx.stroke();
        }

        return {
            name: "line object",
            update: update,
            draw: draw,
        };
    }

    // This is the value of the top-level "line" variable.
    // it should have one member named "create" that creates your object.
    return {
        create: create
    };
}());
