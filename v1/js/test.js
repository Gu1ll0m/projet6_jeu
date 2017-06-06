function generate_game() {

  //================================================================================================================================================//

  //création des variables

  var tabPosition = [];
  var perso1_sur_la_map = false;
  var perso2_sur_la_map = false;
  var nb_arme_sur_la_map = 0;
  var nombreCaseX = 10;
  var nombreCaseY = 10;
  var p = 50; //largeur en pixels d'une case
  var $map = $("#map"); // on déclare $map en tant que var map afin d' éviter de recharger tout le DOM à chaque appel
  var perso1, perso2; // déclare variables globales

  //================================================================================================================================================//

  // fonction qui retourne un entier aléatoire entre 1 et max
  function generate_random(max) {
    return Math.floor((Math.random() * max) + 1);
  }

  //================================================================================================================================================//

  // fonction qui permet la création de la map
  function generate_map() {

    for (var i = 0; i < nombreCaseX; i++) {
      for (var j = 0; j < nombreCaseY; j++) {
        var random = generate_random(20); // fonction generate_random avec en paramètre 20 pour que le rendu soit plus aléatoire
        //TODO : gestion cas particulier si jamais random == 1
        if (random == 1 && perso1_sur_la_map == false) { // si random est égal à 1 et que le perso1 n'est pas encore sur la map
          $map.append("<img src='../img/perso1_alien.png' class='persoClass' id='perso1' style='left:" + p * j + "px; top:" + p * i + "px'>"); // append() insère du contenu à la fin de la sélection
          $map.append("<img src='../img/casevide.png' class='casevideClass' id='casevide'>");
          perso1 = $("#perso1");
          perso1_sur_la_map = true;
          tabPosition.push(3); // id du $("#perso1")
        } else if (random == 12 && perso2_sur_la_map == false) { // si random est égal à 12 et que le perso2 n'est pas encore sur la map
          $map.append("<img src='../img/perso2_predator.png' class='persoClass' id='perso2' style='left:" + p * j + "px; top:" + p * i + "px'>");
          $map.append("<img src='../img/casevide.png' class='casevideClass' id='casevide'>");
          perso2 = $("#perso2");
          perso2_sur_la_map = true;
          tabPosition.push(4); // id du $("#perso2")
        } else if (random == 3 && nb_arme_sur_la_map < 1) { // si random est égal à 3 et que l' arme1 n'est pas encore sur la map
          $map.append("<img src='../img/arme1.png' class='armeClass' id='arme1'>");
          nb_arme_sur_la_map++;
          tabPosition.push(2); // id de l'arme 1
        } else if (random == 3 && nb_arme_sur_la_map < 2) { // si random est égal à 3 et que l' arme2 n'est pas encore sur la map
          $map.append("<img src='../img/arme2.png' class='armeClass' id='arme2'>");
          nb_arme_sur_la_map++;
          tabPosition.push(2); // id de l'arme 1
        } else if (random == 3 && nb_arme_sur_la_map < 3) { // si random est égal à 3 et que l' arme3 n'est pas encore sur la map
          $map.append("<img src='../img/arme3.png' class='armeClass' id='arme3'>");
          nb_arme_sur_la_map++;
          tabPosition.push(2); // id de l'arme 1
        } else if (random == 3 && nb_arme_sur_la_map < 4) { // si random est égal à 3 et que l' arme4 n'est pas encore sur la map
          $map.append("<img src='../img/arme4.png' class='armeClass' id='arme4'>");
          nb_arme_sur_la_map++;
          tabPosition.push(2); // id de l'arme 1
        } else if ((random == 7 || random == 13 || random == 9 || random == 15)) { // si random est égal à 7 ou si random est égal à 13 on insert un bloc
          $map.append("<img src='../img/bloc.png' class='blocClass' id='bloc'>");
          tabPosition.push(1); // id du bloc
        } else { // pour tout autre valeur de random on insert systématiquement une case vide
          $map.append("<img src='../img/casevide.png' class='casevideClass' id='casevide'>");
          tabPosition.push(0); // id de la case vide
        }
        console.log("case" + " " + i + j);
      }
    }
  }

  generate_map(nombreCaseX * nombreCaseY);

  //================================================================================================================================================//

  var compteur = 0;
  var perso1, perso2; // déclare variables globales
  var persoActuel;

  // fonction pour choisir le joueur qui commence la partie
  function random_joueur() {
    if ((generate_random(4) == 1) || (generate_random(4) == 3)) {
      persoActuel = perso1;
      console.log("le joueur 1 commence");
      alert("le joueur 1 commence");
    } else {
      persoActuel = perso2;
      console.log("le joueur 2 commence");
      alert("le joueur 2 commence");
    }
  }

  // fonction boucle changement de joueur tous les 3 tours
  function checkCompteur() {
    if (compteur >= 3) {
      persoActuel == perso1 ? persoActuel == perso2 : persoActuel == perso1;
      compteur = 0;
      console.log("changement de joueur");
      alert("changement de joueur");
    }
  }

  random_joueur();

  //================================================================================================================================================//
  //fonction qui permet de gérer les déplacements du personnage
  function deplace() {

    $(document).keydown(function(e) { // la fonction se déclenche dès que l'utilisateur prèse une touche

      var p = 50; //largeur en pixels d'une case
      var ligne = parseInt(persoActuel.css('top')) / p; // position en x
      var colonne = parseInt(persoActuel.css('left')) / p; // position en Y
      var longueur = 10; //10 cases par lignes
      var oldIndex = ligne * colonne + longueur; // position actuelle du perso avant déplacement


      function deplacement_bloc() {
        if (persoActuel == perso1) {
          $('#etat1').html('Vous faîtes face à un bloc').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
        if (persoActuel == perso2) {
          $('#etat2').html('Vous faîtes face à un bloc').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
      }

      function deplacement_combat() {
        if (persoActuel == perso1) {
          $('#etat1').html('FIGHT').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
        if (persoActuel == perso2) {
          $('#etat2').html('FIGHT').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
      }

      function deplacement_arme() {
        if (persoActuel == perso1) {
          $('#etat1').html('Vous vous équipez d une arme').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
        if (persoActuel == perso2) {
          $('#etat2').html('Vous vous équipez d une arme').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
      }

      function deplacement_bord() {
        if (persoActuel == perso1) {
          $('#etat1').html('Vous faîtes face à un bord').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
        if (persoActuel == perso2) {
          $('#etat2').html('Vous faîtes face à un bord').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
      }

      function touche_gauche() {
        $('#rapport1').html("<img src='../img/pad_gauche.png' class='padClass' id='padGauche'>").fadeIn('slow').delay(1000).fadeOut('slow');
        console.log("vers la gauche");
        colonne--; // on se dirige vers la colonne précedante
      }

      function touche_haut() {
        $('#rapport1').html("<img src='../img/pad_haut.png' class='padClass' id='padHaut'>").fadeIn('slow').delay(1000).fadeOut('slow');
        console.log("vers le haut");
        ligne--; // on se dirige vers la ligne précédante
      }

      function touche_droite() {
        $('#rapport1').html("<img src='../img/pad_droite.png' class='padClass' id='padDroite'>").fadeIn('slow').delay(1000).fadeOut('slow');
        console.log("vers la droite");
        colonne++; // on se dirige vers la colonne suivant
      }

      function touche_bas() {
        $('#rapport1').html("<img src='../img/pad_bas.png' class='padClass' id='Bas'>").fadeIn('slow').delay(1000).fadeOut('slow');
        console.log("vers le bas");
        ligne++; // on se dirige vers la ligne suivante
      }

      function mouvement() {
        if (e.which == 37) {
          touche_gauche();
        }
        if (e.which == 38) {
          touche_haut();
        }
        if (e.which == 39) {
          touche_droite();
        }
        if (e.which == 40) {
          touche_bas();
        }
        if (touche_gauche() && (colonne >= 0)) {
          deplacement_bord();
        }
        if (touche_droite() && (colonne < 10)) {
          deplacement_bord();
        }
        var index = ligne * longueur + colonne; // l'index de la case suivant
        if (tabPosition[index] == 1) {
          deplacement_bloc();
        } else if ((tabPosition[index] == 0) || (tabPosition[index] == 2) || (tabPosition[index] == 4)) {
          compteur++;
          if (touche_gauche()) {
            persoActuel.css('left', parseInt(persoActuel.css('left')) - p);
          }
          console.log("après déplacement index " + " " + index);

          if (touche_haut()) {
            if (persoActuel == perso1) {
              perso1.css('top', parseInt(perso1.css('top')) - p);
            } else {
              perso2.css('top', parseInt(perso2.css('top')) - p);
            }
            console.log("après déplacement index " + " " + index);
          }
          if (touche_droite()) {
            if (persoActuel == perso1) {
              perso1.css('left', parseInt(perso1.css('left')) + p);
            } else {
              perso2.css('left', parseInt(perso2.css('left')) + p);
            }
            console.log("après déplacement index " + " " + index);
          }
          if (touche_bas()) {
            if (persoActuel == perso1) {
              perso1.css('top', parseInt(perso1.css('top')) + p);
            } else {
              perso2.css('top', parseInt(perso2.css('top')) + p);
            }
            console.log("après déplacement index " + " " + index);
          }
          if (tabPosition[index] == 2) {
            deplacement_arme();
          }
          if ((tabPosition[index] == 3) || (tabPosition[index] == 4)) {
            deplacement_combat();
          }
          tabPosition[index] = 3; // maj index case suivante (contient le $("#perso1"))
          console.log("index de la case qui contient le perso" + " " + index);
          tabPosition[oldIndex] = 0; // maj index case précédente (case vide après déplacement)
          console.log("index de la case précédente" + " " + oldIndex);
          compteur++;
          checkCompteur();
        }
      }
    })
  }

  deplace();

  //================================================================================================================================================//

  // fonction de création des personnages

  var personnage = {
    // Initialise le personnage
    init: function(nom, sante) {
      this.nom = nom;
      this.sante = sante;
    },

    // Renvoie la description du personnage
    decrire: function() {
      var description = this.nom + " a " + this.sante + " points de vie";
      return description;
    }
  };

  var perso1 = Object.create(personnage);
  perso1.init("Alien", 100);

  var perso2 = Object.create(personnage);
  perso2.init("Predator", 100);

  console.log(perso1.decrire());
  $('#recap1').html(perso1.decrire).fadeIn('slow').delay(1000).fadeOut('slow');
  console.log(perso2.decrire());
  $('#recap2').html(perso2.decrire).fadeIn('slow').delay(1000).fadeOut('slow');


  // attaque un personnage cible
  function attaquer(cible) {
    if (this.sante > 0) {
      var degats = this.force;
      console.log(this.nom + " attaque " + cible.nom + " et lui fait " + degats + " points de dégâts");
      cible.sante = cible.sante - degats;
      if (cible.sante > 0) {
        console.log(cible.nom + " a encore " + cible.sante + " points de vie");
      } else {
        cible.sante = 0;
        console.log(cible.nom + " est mort !");
      }
    } else {
      console.log(this.nom + " ne peut pas attaquer : il est mort...");
    }
  };

  //================================================================================================================================================//

  var arme = {
    // Initialise les armes
    init: function(nom, degat, ) {
      this.nom = nom;
      this.degat = degat;
    },

    // Renvoie la description de l'arme
    decrire: function() {
      var description = this.nom + " fait " + this.degat + " points de dégâts";
      return description;
    }
  };

  var arme1 = Object.create(arme);
  arme1.init("lanceur de bisoux intergalactique", 10);

  var arme2 = Object.create(arme);
  arme2.init("lanceur de cailloux intergalactique", 25);

  var arme3 = Object.create(arme);
  arme3.init("patator intergalactique", 50);

  var arme4 = Object.create(arme);
  arme4.init("headshotter intergalactique", 100);

  console.log(arme1.decrire());
  console.log(arme2.decrire());
  console.log(arme3.decrire());
  console.log(arme4.decrire());

  //================================================================================================================================================//
}

generate_game();