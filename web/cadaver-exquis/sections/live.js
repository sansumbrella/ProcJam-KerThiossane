// Le nom de cette variable ci est la même de ce fichier.
// e.g. pour un fichier "wobble.js", cette variable est appelé "wobble".
var live = (function() {
    // Cet function crée un objet javascript avec functions "update" et "draw".
    function create (frame) {
        // Mettez les parametres de votre animation.
        var x = util.random(frame.gauche, frame.droit);
        var y = util.random(frame.haut, frame.bas);
        var angle = 0;
        var forme = new Path2D();
        forme.rect(-50, -50, 100, 100);
        var lineWidth = 1;

        // Cet function va etre appelé dans tous les frame de l'animation.
        // Utilisez pour changer vos variables.
        // Le parametre `input` peut être utilisé comme un relation de l'animation a son gauche.
        function update(input, temps, dt) {
            angle = temps;
            var vitesse = 10;
          
             var wobble = ((Math.cos(temps*vitesse)+1)/2);
            lineWidth = util.mix(10.0, 30.0, wobble);
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
            ctx.fillStyle = util.rgba(0, 255, 0, 1.0);

            // Dessiner une form a la position (x, y)
           /* ctx.save();
            ctx.fill(forme);
            ctx.restore();*/

            // Dessiner "strokes" avec le couleur hsva(teinte, saturation, éclat, transparent)
            function horizontalLine(vertical){
            ctx.lineWidth = lineWidth;
        

            ctx.strokeStyle = util.hsva(8.0,0.5, 1.0, 6.0, 1.0);
            ctx.beginPath();
            ctx.moveTo(frame.gauche-10, frame.hauteur * 0.5);
            ctx.lineTo(frame.droit+10, frame.hauteur * vertical);
            ctx.stroke();
            }

           /* ctx.strokeStyle = util.hsva(0.5,0.5, 1.0, 1.0, 1.0);
            ctx.beginPath();
            ctx.moveTo(frame.gauche, frame.hauteur * 0.7);
            ctx.lineTo(frame.droit, frame.hauteur * 0.7);
            ctx.stroke();*/
            horizontalLine(0.1);
            horizontalLine(0.3);
            horizontalLine(0.9);
            horizontalLine(0.5);
            horizontalLine(0.7);
            horizontalLine(0.9);
        
            /* Dessiner une forme a la position (mouseX, mouseY)
            ctx.save();
            ctx.translate(util.mouseX, util.mouseY);
            ctx.stroke(forme);
            ctx.restore(); */
        }

        // Ici, nous créons un objet avec functions "update" et "draw", qui utilise
        // ces functions que nous avons défini au-dessus.
        return {
            title: "live",
            author: "Demba Diop",
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