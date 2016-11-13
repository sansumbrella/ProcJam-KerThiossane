// Le nom de cette variable ci est la même de ce fichier.
// e.g. pour un fichier "wobble.js", cette variable est appelé "wobble".
var exemple = (function() {
    // Cet function crée un objet javascript avec functions "update" et "draw".
    function create (frame) {
        // Mettez les parametres de votre animation.
        var x = util.random(frame.gauche, frame.droit);
        var y = util.random(frame.haut, frame.bas);
        var angle = 0;
        var forme = new Path2D();
        forme.rect(110, 70, 10, 10);
        forme.rect(100, 80, 10, 10);
        forme.rect(210, 70, 10, 10);
        forme.rect(200, 80, 10, 10);
        var lineWidth = 1;
        var text;

        // Cet function va etre appelé dans tous les frame de l'animation.
        // Utilisez pour changer vos variables.
        // Le parametre `input` peut être utilisé comme un relation de l'animation a son gauche.
        function update(input, temps, dt) {
            angle = temps;
            var vitesse = 1.0;
            var coef = ((Math.cos(temps*vitesse)+1)/2);
            lineWidth = util.mix(10.0, 30.0, coef);


            // Le `return value` est utilisé comme `input` pour l'animation a son droit.
            return input;
        }

        // Cet function va etre appelé dans tous les frame de l'animation.
        // Utilisez pour dessiner vos formes.
        // Pour l'information de dessiner avec javascript, voir https://developer.mozilla.org/fr/docs/Tutoriel_canvas
        function draw(ctx) {
            // Effacer le dessin dernier.
            ctx.clearRect(frame.gauche, frame.haut, frame.largeur, frame.hauteur);

            // Dessiner "fills" avec le couleur rgba(rouge, vert, bleu, transparent)
            ctx.fillStyle = util.rgba(255, 255, 0, 1.0);
            ctx.fill(forme);
            
            // Dessiner une form a la position (x, y)
            

            // Dessiner "strokes" avec le couleur hsva(teinte, saturation, éclat, transparent)
            
            ctx.strokeStyle = util.hsva(util.random(0, 1.0), 0.3, 1.0, 1.0, 1.0);
            ctx.strokeStyle = util.hsva(util.random(1.0, 0), 0.5, 1.0, 1.0, 1.0);
            ctx.lineWidth = lineWidth;
            function horizontalLine(vertical) {
            ctx.beginPath();
            ctx.moveTo(frame.gauche, frame.hauteur * vertical)
            ctx.lineTo(frame.droit, frame.hauteur * vertical)
            ctx.stroke()
            }

            function mytext(text) {
                ctx.font = "65px arial";
                ctx.fillText(text, lineWidth * 2.5, 100);
            }

            

            horizontalLine(0.3);
            mytext("Procjam");
            horizontalLine(0.9);

            // Dessiner une forme a la position (mouseX, mouseY)
            
        }

        // Ici, nous créons un objet avec functions "update" et "draw", qui utilise
        // ces functions que nous avons défini au-dessus.
        return {
            title: "exemple",
            author: "ecqm19",
            update: update,
            draw: draw,
        };
    }

    // Ici, nous créons un object avec function "create", qui crée notre objet
    // que nous avons défini au-dessus.
    return {
        create: create
    };
}());
