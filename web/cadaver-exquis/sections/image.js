// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var image = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        // Set up some parameters for our drawing.
        var y = frame.hauteur / 2;
        var rotation = 0;
        var rotationSpeed = util.random(0.5, 1.5);
        var img = new Image();
        img.src = "images/butterfly.png";

        // use this function to change your drawing's variables to respond to the previous drawing
        function update(input, temps, dt) {
            y = util.mix(y, input, 0.1);
            rotation += rotationSpeed * dt;
            return y;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx) {
            ctx.translate(frame.width / 2, y);
            ctx.rotate(rotation);
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        }

        return {
            title: "Butterfly",
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
