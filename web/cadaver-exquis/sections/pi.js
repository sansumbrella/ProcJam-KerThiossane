// Le nom de cette variable ci est la même de ce fichier.
// e.g. pour un fichier "wobble.js", cette variable est appelé "wobble".
var pi= (function() {
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
            var vitesse =5.0;
            var wobble = ((Math.cos(temps*vitesse)+1)/2);
            lineWidth= util.mix(10.0, 30.0, wobble);
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
            ctx.fillStyle = util.rgba(Math.floor(util.random(0, 255)), Math.floor(util.random(0, 255)) , Math.floor(util.random(0, 255)), 1.0); // pour faire des couleurs aléatoire il faut utuliser Math.floor(util.random(0,255))


            // Dessiner une form a la position (x, y)
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fill(forme);
            ctx.restore();


            for(var i=0;i<4;i++){
     for(var j=0;j<3;j++){
       ctx.beginPath();
       var x              = 25+j*50;                 // Coordonnée x
       var y              = 25+i*50;                 // Coordonnée y
       var rayon          = 20;                      // Rayon de l'arc
       var angleInitial     = 0;                     // Point de départ sur le cercle
       var angleFinal       = Math.PI+(Math.PI*j)/2; // Point d'arrivée sur le cercle
       var antihoraire  = i%2==0 ? false : true;     // Horaire ou antihoraire
    
       ctx.arc(x, y, rayon, angleInitial, angleFinal, antihoraire);


       if (i>1){
         ctx.fill();
       } else {
         ctx.stroke();
       }
     }



   }

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
            function horizontal(vertical){
            ctx.beginPath();
            ctx.moveTo(frame.gauche, frame.hauteur* vertical);
            ctx.lineTo(frame.droit,frame.hauteur* vertical)
            ctx.stroke();

            }
            horizontal(0.5);
            horizontal(0.4);
            horizontal(0.8);
            horizontal(0.9);

        }

        // Ici, nous créons un objet avec functions "update" et "draw", qui utilise
        // ces functions que nous avons défini au-dessus.
        return {
            title: "pi",
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
