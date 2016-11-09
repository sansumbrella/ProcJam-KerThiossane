// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var image = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        var img = new Image();
        img.src = "images/butterfly.png";
        var y = 0;
        var rotation = 0;
        var rotationSpeed = util.random(0.5, 1.5) * 0.001;

        // use this function to change your drawing's variables to respond to the previous drawing
        function update(input, time) {
            y = input;
            rotation += rotationSpeed;
            return input;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx) {
            ctx.translate(frame.width / 2, y);
            ctx.rotate(rotation);
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        }

        return {
            name: "image",
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
