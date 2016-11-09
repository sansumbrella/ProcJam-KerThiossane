// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var circle = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        var radius = util.random(5, frame.width);
        var y = 0;
        var targetY = 0;
        var leftY = 0;

        // use this function to change your section to respond to the previous drawing
        // you can also use this for animation
        // it must return an output x to be used as input for the next frame
        function update(input, time) {
            targetY = input;
            var oldY = y;
            y = util.mix(y, targetY, 0.01);

            // return a value to be used as the frame.inputX for your neighboring frame.
            return oldY;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx) {
            ctx.clearRect(frame.left, frame.top, frame.width, frame.height);
            ctx.beginPath();
            ctx.arc(util.mix(frame.left, frame.right, 0.5), y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        return {
            name: "floating circle",
            author: "David Wicks",
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
