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

    function next(array, index) {
        return array[(index + 1) % array.length];
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
        return "rgba(" + r + ", " + g + ", " + b + ", " + a +  ")";
    }

    return {
        mix: mix,
        random: random,
        pick: pick,
        next: next,
        hsv_to_rgb: hsv_to_rgb,
        hsva: hsva,
        rgba: color,
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
            scenes: [],
            seconds_between_flips: 30,
        },
        canvas = document.getElementById("corps"),
        context = canvas.getContext("2d"),
        mouseX = 0,
        mouseY = 0,
        time_since_flip = 0,
        temps_base = new Date().getTime() / 1000,
        temps_dernier = temps_base,
        columnWidth = canvas.width / settings.columns,
        frame = createFrame(columnWidth, canvas.height),
        clipShape;

    function fillScreen() {
        // size to fill on startup
        canvas.width = Math.floor(window.innerWidth);
        canvas.height = Math.floor(window.innerHeight * 0.9) - canvas.offsetTop;
        columnWidth = Math.ceil(context.canvas.width / settings.columns);
        frame = createFrame(columnWidth, canvas.height);
        clipShape = new Path2D();
        clipShape.rect(0, 0, columnWidth, canvas.height);
    }

    fillScreen();
    window.addEventListener("resize", function (event) {
        clearTimeout(app.resizeTimeout);
        app.resizeTimeout = setTimeout(debounce, 100);
        function debounce() {
            fillScreen();
            for (var i = 0; i < app.scenes.length; i += 1) {
                rebuildScene(i);
            }
        }
    });

    util.currentOffset = 0;
    Object.defineProperty(util, "mouseX", {
            get: function () { return mouseX - this.currentOffset; }
        } );
    Object.defineProperty(util, "mouseY", {
            get: function () { return mouseY; }
        } );

    canvas.addEventListener("mousemove", function (event) {
        mouseX = util.clamp(event.clientX - canvas.offsetLeft, 0, canvas.width);
        mouseY = util.clamp(event.clientY - canvas.offsetTop + window.scrollY, 0, canvas.height);
    });

    function sceneIndexFromPosition(x) {
        var t = util.clamp(x / canvas.width, 0, 1);
        return Math.floor(t * app.scenes.length);
    }

    function advanceScene(index) {
        time_since_flip = 0;
        context.save();
        context.clearRect(index * columnWidth, 0, columnWidth, canvas.height);
        context.restore();

        var oldScene = app.scenes[index];
        var offset = index * columnWidth;
        var sceneKey = app.builders.indexOf(oldScene.builder);
        oldScene.destroy();
        app.scenes[index] = buildScene(util.next(app.builders, sceneKey), offset);
    }

    function rebuildScene(index) {
        var oldScene = app.scenes[index];
        var offset = index * columnWidth;
        oldScene.destroy();
        app.scenes[index] = buildScene(oldScene.builder, offset);
    }

    canvas.addEventListener("mouseup", function (event) {
        var index = sceneIndexFromPosition(event.clientX - canvas.offsetLeft);
        advanceScene(index);
    });

    function loadSections() {
        var queue = [];

        for (var section of settings.sections) {
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
            console.log("Loaded all sections.");
        }

        buildScenes(settings.columns, columnWidth);
        app.ready = true;
        update();
    }

    function createLabel(sketch, offset) {
        var label = document.createElement("div");
        var title = document.createElement("h2");
        var author = document.createElement("h3");
        title.textContent = sketch.title;
        author.textContent = " by " + sketch.author;
        label.classList.add("caption");
        label.style.left = offset + "px";
        label.style.width = (columnWidth - 10) + "px";
        label.appendChild(title);
        label.appendChild(author);
        document.body.appendChild(label);

        return {
            destroy: function () {
                delete this.destroy;
                this.destroy = function () {};
                label.parentElement.removeChild(label);
            }
        };
    }

    // Combine a newly created
    function buildScene(builder, offset) {
        var sketch = builder.create(frame);
        var label = createLabel(sketch, offset);

        return {
            sketch: sketch,
            offset: offset,
            destroy: label.destroy,
            builder: builder
        }
    }

    function buildScenes(count, width) {
        for (var i = 0; i < count; i += 1) {
            var scene = buildScene(util.pick(app.builders), i * width);
            app.scenes.push(scene);
        }
    }

    function updateScenes(temps, dt) {
        var input = mouseY;
        var offset = sceneIndexFromPosition(mouseX);
        // offset = mouseX / canvas.width;
        for (var i = 0; i < app.scenes.length; i += 1) {
            var index = (i + offset) % app.scenes.length;
            var scene = app.scenes[index];
            util.currentOffset = scene.offset;
            var output = scene.sketch.update(input, temps, dt);
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
            util.currentOffset = scene.offset;
            context.save();
            context.translate(scene.offset, 0);
            context.clip(clipShape);
            scene.sketch.draw(context);
            context.restore();
        }

        // drawCursor();
    }

    function update() {
        var temps = new Date().getTime() / 1000;
        var dt = temps - temps_dernier;
        temps_dernier = temps;
        time_since_flip += dt;
        if (time_since_flip > app.seconds_between_flips) {
            advanceScene(Math.floor(Math.random() * app.scenes.length));
        }
        updateScenes(temps - temps_base, dt);
        drawScenes(context);

        if (app.running) {
            window.requestAnimationFrame(update);
        }
    }

    loadSections();

    return app;
}());
