// Le nom de cette variable ci est la même de ce fichier.
// e.g. pour un fichier "wobble.js", cette variable est appelé "wobble".
var diallo = (function() {
    // Cet function crée un objet javascript avec functions "update" et "draw".
    function create (frame) {
        // Mettez les parametres de votre animation.
        var x = util.random(frame.gauche, frame.droit);
        var y = util.random(frame.haut, frame.bas);
        var angle = 0;
        var forme = new Path2D();
        forme.rect(-20, -20, 60, 90);

        // Cet function va etre appelé dans tous les frame de l'animation.
        // Utilisez pour changer vos variables.
        // Le parametre `input` peut être utilisé comme un relation de l'animation a son gauche.
        function update(input, temps, dt) {
            angle = temps;
            // nummerique 0-1
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
            ctx.fillStyle = util.rgba(23,23,1, 1.0); // pour faire des couleurs aléatoire il faut utuliser Math.floor(util.random(0,255))


        /*    // Dessiner une form a la position (x, y)
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fill(forme);
            ctx.restore(); */


                        // Dessiner "strokes" avec le couleur hsva(teinte, saturation, éclat, transparent)
            ctx.strokeStyle = util.hsva(0.5, 1.0, 1.0, 1.0);
            // Dessiner une forme a la position (mouseX, mouseY)
            ctx.save();
            ctx.translate(util.mouseX, util.mouseY);
            ctx.stroke(forme);
            ctx.restore();

            //dessiner un triangle
            //ctx.strokeStyle =util.hsva(util.rando(0.5, 0));
            ctx.strokeStyle =util.hsva(util.random(1.0 , 0.4),10,10,1.0);
            ctx.linewidth =30;

            ctx.beginPath();
     ctx.moveTo(util.mouseX,util.mouseY);
     ctx.lineTo(frame.gauche, frame.hauteur* 0.1);
     ctx.lineTo(frame.gauche, frame.hauteur* 0.9);
     ctx.fill();

     // Triangle avec contour
     ctx.beginPath();
     ctx.moveTo(125,125);
     ctx.lineTo(125,45);
     ctx.lineTo(45,125);
     ctx.closePath();
     ctx.stroke();

        }

        // Ici, nous créons un objet avec functions "update" et "draw", qui utilise
        // ces functions que nous avons défini au-dessus.
        return {
            title: "live",
            author: "Mr diallo",
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
