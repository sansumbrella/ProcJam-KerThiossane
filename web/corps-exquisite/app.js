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

function allLoaded() {
    console.log("Everyone is loaded, see:");
    console.log(window[sections[0]], window["curve"], window["line"]);
}

console.log("Finished loading sections?");
