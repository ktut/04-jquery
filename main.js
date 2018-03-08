$(document).ready(function() {

    // declare dem variables!
    let isFirstCharChosen = false;
    let isSecondCharChosen = false;
    let gameReady = false;
 
    let darth = {
        name: "Darthtaniel",
        health: 100,
        multiplier: 20,
        div: $('#darthtaniel'),
    }

    let scoot = {
        name: "Scootwalker",
        health: 100,
        multiplier: 15,
        div: $('#scootwalker'),
    }

    let tammy = {
        name: "Tammy-Rey",
        health: 100,
        multiplier: 10,
        div: $('#tammyrey'),
    }

    let olivia = {
        name: "Olivi-yoda",
        health: 100,
        multiplier: 5,
        div: $('#oliviyoda'),
    }

    
    function resetGame() {
        isFirstCharChosen = false;
        isSecondCharChosen = false;
        gameReady = false;

        darth.health = 100;
        scoot.health = 100;
        tammy.health = 100;
        olivia.health = 100;
        $(".health-bar").css('width', "100%");

        $(".character-choose").append(darth.div);
        $(".character-choose").append(scoot.div);
        $(".character-choose").append(tammy.div);
        $(".character-choose").append(olivia.div);
    }

    // on clicking reset, reset the game
    $("#reset").on( "click", function() {
        resetGame();
    }); 

    

    // on clicking characters, place the fighters in their positions
    $(".character-choose > .fighter").on( "click", function() {
        if ((isFirstCharChosen === false) && (isSecondCharChosen === false)) {
            $("#user-fighter").append(this);
            isFirstCharChosen = true;
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === false)) {
            $("#computer-fighter").append(this);
            isSecondCharChosen = true;
            gameReady = true;
        }
    });

    // on clicking fight, fight!
    $("#fight").on( "click", function() {
        if (gameReady === true) {
            console.log("attack!");

            // test out with two sample objects

            // use object's multiplier to determine damage
            darth.health = darth.health - (Math.random() * scoot.multiplier);

            // if no health, lose game, otherwise, consolelog health, make health bar smaller and color relative to current health
            if (darth.health < 0) {
                alert("You lose!");
                resetGame();
            } else {
                console.log("new darth health: " + darth.health);
                darth.div.children(".health-bar").css('width', darth.health + "%");
                // darth.div.children(".health-bar").css('background', "rgb(" + ((100 - darth.health) / 100 * 255) + "," + (darth.health / 100 * 255) + ",0)");
            }
        }
    });


    

});