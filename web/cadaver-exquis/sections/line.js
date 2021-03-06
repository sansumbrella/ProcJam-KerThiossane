// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var line = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        var lineWidth = util.random(10, 50);
        var lineRange = util.random(frame.hauteur * 0.15, frame.hauteur * 0.5);
        var speed = util.random(0.5, 1.5);
        var rightY = frame.hauteur / 2;
        var leftY = frame.hauteur / 2;

        // use this function to change your section to respond to the previous drawing
        // you can also use this for animation
        // it must return an output x to be used as input for the next frame
        function update(input, time) {
            leftY = input;
            rightY = leftY + util.mix(-lineRange, lineRange, (Math.cos(time * speed) + 1) / 2);

            // return a value to be used as the `input` for your neighboring frame.
            return rightY;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx) {
            // ctx.clearRect(frame.left, frame.top, frame.right, frame.bottom);
            ctx.beginPath();
            ctx.fillStyle = util.hsva(0.5, 1.0, 1.0, 0.01);
            ctx.rect(0, 0, frame.width + 1, frame.height);
            ctx.fill();

            ctx.lineWidth = lineWidth;
            ctx.lineCap = "square";
            ctx.strokeStyle = "#F90";

            ctx.beginPath();
            ctx.moveTo(frame.left - 5, leftY);
            ctx.lineTo(frame.right + 5, rightY);
            ctx.stroke();
        }

        // This is the result of your object creation function.
        // It should have "update" and "draw" members.
        return {
            title: "Soft Line",
            author: "David Wicks",
            update: update,
            draw: draw,
        };
    }

    // This is the value of the top-level "line" variable.
    // it should have one member named "create" that refers to your
    // object creation function.
    return {
        create: create
    };
}());
