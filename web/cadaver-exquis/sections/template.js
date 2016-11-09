// The name of this variable must match the name of your file to work.
// e.g. if your file is "wobble.js", the variable should be named "wobble".
var template = (function() {
    // Define a function that creates your section.
    // This function will return an object that has an "update" and "draw" function.
    function create (frame) {
        // Set up some parameters for your drawing.
        var x = 50; // util.random(frame.gauche, frame.droit);
        var y = 50; // util.random(frame.haut, frame.bas);
        var angle = 0;
        var forme = new Path2D();
        forme.rect(-50, -50, 100, 100);

        // use this function to change your drawing's variables to respond to the previous drawing
        function update(input, temps, dt) {
            angle = temps;
            return input;
        }

        // use this function to draw your section to screen
        // you can draw in the area [[0, 0], [width, height]]
        function draw(ctx) {
            ctx.clearRect(frame.gauche, frame.haut, frame.largeur, frame.hauteur);

            console.log("angle", angle);
            ctx.fillStyle = util.rgba(255, 255, 0, 1.0);
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fill(forme);
        }

        return {
            title: "Template",
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
