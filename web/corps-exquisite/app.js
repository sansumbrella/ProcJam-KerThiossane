// utilities
var util = (function () {

    function mix(a, b, t) {
        return a + (b - a) * t;
    }

    function random(low, high) {
        return mix(low, high, Math.random());
    }

    // create a k-sided die (values from 1—k)
    function roll_die(k) {
        function fn () {
            return Math.floor(Math.random() * k) + 1;
        }
        fn.range = { low: 1, high: k };
        return fn;
    }

    // roll n k-sided dice
    function roll_n_dice(n, die){
        return function () {
            var sum = 0;
            for (var i = 0; i < n; i += 1) {
                sum += die();
            }
            return sum;
        }
    }

    function roll_n_dice_normalized(n, die) {
        var low = die.range.low * n;
        var high = die.range.high * n;
        var roll = roll_n_dice(n, die);
        return function () {
            return (roll() - low) / (high - low);
        }
    }

    var d6 = roll_die(6);
    var roll_3d6 = roll_n_dice(3, d6);
    var roll_3d6_normal = roll_n_dice_normalized(3, d6);

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

    return {
        mix: mix,
        random: random,
        hsv_to_rgb: hsv_to_rgb,
        roll_die: roll_die,
        roll_3d6: roll_3d6,
        roll_3d6_normal: roll_3d6_normal
    }
}());

(function () {
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
        console.log("Everyone is loaded, see:");
        console.log(window[sections[0]], window["curve"], window["line"]);
    }

    loadSections();
}());
