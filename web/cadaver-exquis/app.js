// utilities
var util = (function () {

    function mix(a, b, t) {
        return a + (b - a) * t;
    }

    function random(low, high) {
        return mix(low, high, Math.random());
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

    function createFrame(width, height, input, time) {
        var frame = {
            width: width,
            height: height,
            get top () { return 0; },
            get bottom () { return height; },
            get left () { return 0; },
            get right () { return width; },
            input: input,
            time: time
        };

        return frame;
    }

    function defaultFrame() {
        return createFrame(640, 100, 320, 0);
    }

    function color(r, g, b) {
        var r = r || 255,
            g = g || r,
            b = b || r;
        return "color(" + r + ", " + g + ", " + b + ")";
    }

    return {
        mix: mix,
        random: random,
        hsv_to_rgb: hsv_to_rgb,
        createFrame: createFrame,
        defaultFrame: defaultFrame,
        color: color
    }
}());

// Initialize and run the application
var app = (function () {
    var app = {
        ready: false,
        running: true
    };

    function loadSections() {
        var queue = [];

        for (var section of sections) {
            queue.push(section);
            var code = document.createElement("script");
            code.src = "sections/" + section + ".js";
            document.body.appendChild(code);
            code.onload = (function (section) {
                return function () {
                    console.log("Loaded section:", section);
                    var index = queue.indexOf(section);
                    if (index >= 0) {
                        queue.splice(index, 1);
                    }
                    if (queue.length === 0) {
                        allLoaded();
                    }

                    if (window.hasOwnProperty(section)) {

                    }
                    else {
                        console.error("The section file '" + section + ".js' didn't create a variable named '" + section + "'.");
                    }
                }
            }(section));
        }
    }

    function allLoaded() {
        app.ready = true;
        console.log("Everyone is loaded, see:");
        console.log(window[sections[0]], window["curve"], window["line"]);
    }

    function updateSections(time) {

    }

    function drawSections(time) {

    }

    function update() {
        var time = new Date().getTime();
        updateSections(time);
        drawSections(context);

        if (app.running) {
            window.requestAnimationFrame(update);
        }
    }

    loadSections();

    return app;
}());
