// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var circle = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        var radius = util.random(5, frame.width);
        var y = frame.hauteur / 2;
        var targetY = frame.hauteur / 2;

        // use this function to change your drawing's variables to respond to the previous drawing
        function update(input, time) {
            targetY = input;
            var oldY = y;
            y = util.mix(y, targetY, 0.01);

            // return a value to be used as the `input` for your neighboring frame.
            return oldY;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx) {
            ctx.clearRect(frame.gauche, frame.haut, frame.largeur, frame.hauteur);
            ctx.beginPath();
            ctx.arc(util.mix(frame.gauche, frame.droit, 0.5), y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        return {
            title: "Floating Circle " + Math.floor(radius),
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
