// utilities
var util = (function () {

    function mix(a, b, t) {
        return a + (b - a) * t;
    }

    function random(low, high) {
        return mix(low, high, Math.random());
    }

    function pick(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function clamp(value, low, high) {
        if (low > high) {
            var temp = low;
            low = high;
            high = temp;
        }
        return Math.min(Math.max(value, low), high);
    }

    // derived from c++ library glm.
    // input in range 0-1 for each field.
    function hsv_to_rgb(h, s, v) {
        var hsv = {
            x: h * 360,
            y: s,
            z: v
        };
        // start with achromatic version
        var rgbColor = {
            r: hsv.z,
            g: hsv.z,
            b: hsv.z
        };

        if(hsv.y !== 0) {
            var sector = Math.floor(hsv.x / 60);
            var frac = (hsv.x / 60) - sector;
            // factorial part of h
            var o = hsv.z * (1 - hsv.y);
            var p = hsv.z * (1 - hsv.y * frac);
            var q = hsv.z * (1 - hsv.y * (1 - frac));

            switch(Math.round(sector))
            {
            default:
            case 0:
                rgbColor.r = hsv.z;
                rgbColor.g = q;
                rgbColor.b = o;
                break;
            case 1:
                rgbColor.r = p;
                rgbColor.g = hsv.z;
                rgbColor.b = o;
                break;
            case 2:
                rgbColor.r = o;
                rgbColor.g = hsv.z;
                rgbColor.b = q;
                break;
            case 3:
                rgbColor.r = o;
                rgbColor.g = p;
                rgbColor.b = hsv.z;
                break;
            case 4:
                rgbColor.r = q;
                rgbColor.g = o;
                rgbColor.b = hsv.z;
                break;
            case 5:
                rgbColor.r = hsv.z;
                rgbColor.g = o;
                rgbColor.b = p;
                break;
            }
        }

        for (var component in rgbColor) {
            rgbColor[component] = Math.round(rgbColor[component] * 255);
        }

        return rgbColor;
    }

    function hsva(h, s, v, a) {
        var rgb = hsv_to_rgb(h, s, v);
        return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + a + ")";
    }

    function color(r, g, b, a) {
        var r = r || 255,
            g = g || r,
            b = b || r,
            a = a || 1.0;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a +  ")";
    }

    return {
        mix: mix,
        random: random,
        pick: pick,
        hsv_to_rgb: hsv_to_rgb,
        hsva: hsva,
        color: color,
        clamp: clamp,
    }
}());

/// Creates an immutable set of measurements.
function createFrame(width, height) {
    var frame = {
        width: width,
        height: height,
        get top () { return 0; },
        get bottom () { return height; },
        get left () { return 0; },
        get right () { return width; },
        // a Français
        get gauche () { return this.left; },
        get droit () { return this.right; },
        get haut () { return this.top; },
        get bas () { return this.bottom; },
        get largeur () { return this.width; },
        get hauteur () { return this.height; },
    };

    Object.freeze(frame);

    return frame;
}

// Initialize and run the application
var app = (function () {
    var app = {
            ready: false,
            running: true,
            builders: [],
            scenes: []
        },
        canvas = document.getElementById("corps"),
        context = canvas.getContext("2d"),
        mouseX = 0,
        mouseY = 0;
    // size to fill on startup
    canvas.width = Math.floor(window.innerWidth * 0.95);
    canvas.height = Math.floor(window.innerHeight * 0.95) - canvas.offsetTop;

    Object.defineProperty(util, "mouseX", {
            get: function () { return mouseX; }
        } );
    Object.defineProperty(util, "mouseY", {
            get: function () { return mousey; }
        } );

    canvas.addEventListener("mousemove", function (event) {
        mouseX = util.clamp(event.clientX - canvas.offsetLeft, 0, canvas.width);
        mouseY = util.clamp(event.clientY - canvas.offsetTop + window.scrollY, 0, canvas.height);
    });

    function loadSections() {
        var queue = [];

        for (var section of appData.sections) {
            queue.push(section);
            var code = document.createElement("script");
            code.src = "sections/" + section + ".js";
            document.body.appendChild(code);
            code.onload = (function (section) {
                return function () {
                    var loadedObject = window[section];
                    if (loadedObject) {
                        if (loadedObject.hasOwnProperty("create")) {
                            console.log("Pushing", loadedObject, "from '" + section + ".js'");
                            app.builders.push(loadedObject);
                        }
                        else {
                            console.warn("The section '" + section + "' needs to have a 'create' function. See 'line.js' for a working example.");
                        }
                    }
                    else {
                        console.warn("The section file '" + section + ".js' should create a variable named '" + section + "'. See 'line.js' for a working example.");
                    }

                    var index = queue.indexOf(section);
                    if (index >= 0) {
                        queue.splice(index, 1);
                    }
                    if (queue.length === 0) {
                        allLoaded();
                    }
                }
            }(section));
        }
    }

    function allLoaded() {
        if (app.builders.length === 0) {
            console.error("No sections were properly set up.");
        }
        else {
            console.log("Loaded sections.");
        }

        buildScenes(context, appData.columns);
        app.ready = true;
        update();
    }

    function buildScenes(context, count) {
        var width = Math.ceil(context.canvas.width / count);
        var height = context.canvas.height;
        var frame = createFrame(width, height);
        var clipShape = new Path2D();
        clipShape.rect(0, 0, width, height);

        for (var i = 0; i < count; i += 1) {
            var sketch = util.pick(app.builders).create(frame);
            app.scenes.push({
                sketch: sketch,
                offset: i * width,
                frame: frame,
                clip: clipShape
            });
        }
    }

    function updateScenes(time) {
        var input = mouseY;
        var t = mouseX / canvas.width;
        var offset = Math.floor(t * app.scenes.length);
        // offset = mouseX / canvas.width;
        for (var i = 0; i < app.scenes.length; i += 1) {
            var index = (i + offset) % app.scenes.length;
            var scene = app.scenes[index];
            var output = scene.sketch.update(input, time);
            input = output || input; // if no valid output, reuse input
            input = util.clamp(input, 0, canvas.height);
        }
    }

    function drawCursor() {
        context.save();
        context.translate(mouseX, mouseY);
        context.beginPath();
        context.arc(0, 0, 18, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }

    function drawScenes(time) {
        for (var scene of app.scenes) {
            context.save();
            context.translate(scene.offset, 0);
            context.clip(scene.clip);
            scene.sketch.draw(context);
            context.restore();
        }

        // drawCursor();
    }

    function update() {
        var time = new Date().getTime();
        updateScenes(time);
        drawScenes(context);

        if (app.running) {
            window.requestAnimationFrame(update);
        }
    }

    loadSections();

    return app;
}());
