// Le nom de cette variable ci est la même de ce fichier.
// e.g. pour un fichier "wobble.js", cette variable est appelé "wobble".
var ACM = (function() {
    // Cet function crée un objet javascript avec functions "update" et "draw".
    function create (frame) {
        // Mettez les parametres de votre animation.
        var x = util.random(frame.gauche, frame.droit);
        var y = util.random(frame.haut, frame.bas);
        var angle = 0;
        var LineWidth=1;
        var forme = new Path2D();
        forme.rect(-50, -50, 100, 100);

        // Cet function va etre appelé dans tous les frame de l'animation.
        // Utilisez pour changer vos variables.
        // Le parametre `input` peut être utilisé comme un relation de l'animation a son gauche.
        function update(input, temps, dt) {
            angle = temps;
            var vitesse= 2.0
            var wobble=((Math.cos(temps*vitesse) + 1)/2);
            LineWidth= util.mix(10.0, 30.0,wobble);

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
            ctx.fillStyle = util.rgba(Math.floor(util.random(0,250)), Math.floor(util.random(0,250)), 150, 1.0);

            // Dessiner une form a la position (x, y)
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fill(forme);
            ctx.restore();

            // Dessiner "strokes" avec le couleur hsva(teinte, saturation, éclat, transparent)
            ctx.strokeStyle = util.hsva(util.random(1.0,0.5 ),1.0, 1.0, 1.0, 1.0);
            // Dessiner une forme a la position (mouseX, mouseY)
            function horizontalline(vertical) {         
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(frame.gauchehe, frame.hauteur *vertical);
                ctx.lineTo(frame.droit, frame.hauteur *vertical);
                ctx.lineTo(frame.gauche, frame.hauteur *vertical);
                ctx.stroke();
                ctx.restore();
            }
            ctx.strokeStyle = util.hsva(0.4, 1.0, 1.0, 1.0);
            ctx.LineWidth=LineWidth;
            horizontalline(0.3);
            horizontalline(0.4);
            horizontalline(0.7);
            horizontalline(0.9);
          
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fill();
            
            
            ctx.beginPath();
            ctx.arc(75,75,50,0,Math.PI*2,true); // Cercle exterieur
            ctx.moveTo(110,75);
            ctx.arc(75,75,35,0,Math.PI,false);   // Bouche (sens horaire)
            ctx.moveTo(65,65);
            ctx.arc(60,65,5,0,Math.PI*2,true);  // Oeil gauche
            ctx.moveTo(95,65);
            ctx.arc(90,65,5,0,Math.PI*2,true);  // Oeil droite
            ctx.translate;
            ctx.stroke();
            
            
           
           
        }

        // Ici, nous créons un objet avec functions "update" et "draw", qui utilise
        // ces functions que nous avons défini au-dessus.
        return {
            title: "ACM",
            author: "Adama cisse",
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
