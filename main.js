$(document).ready(function() {

    // declare dem variables!
    let isFirstCharChosen = false;
    let isSecondCharChosen = false;
    let gameReady = false;
    let userJedi = null;
    let computerJedi = null;
    
    // for each fighter, initially set their power randomly from 10 to 20
    let darth = {
        name: "Darthtaniel",
        health: 100,
        power: Math.ceil(Math.random()* 10) + 10,
        div: $('#darthtaniel'),
    }

    let scoot = {
        name: "Scootwalker",
        health: 100,
        power: Math.ceil(Math.random()* 10) + 10,
        div: $('#scootwalker'),
    }

    let tammy = {
        name: "Tammy-Rey",
        health: 100,
        power: Math.ceil(Math.random()* 10) + 10,
        div: $('#tammyrey'),
    }

    let rich = {
        name: "Kylo Rich",
        health: 100,
        power: Math.ceil(Math.random()* 10) + 10,
        div: $('#kylorich'),
    }

    let objectHolder = {
        "darth": darth,
        "scoot": scoot,
        "tammy": tammy,
        "rich": rich,
    }
    
    function resetGame() {
        isFirstCharChosen = false;
        isSecondCharChosen = false;
        gameReady = false;
        userJedi = null;
        computerJedi = null;

        darth.health = 100;
        scoot.health = 100;
        tammy.health = 100;
        rich.health = 100;

        darth.power = Math.ceil(Math.random()* 10) + 10;
        scoot.power = Math.ceil(Math.random()* 10) + 10;
        tammy.power = Math.ceil(Math.random()* 10) + 10;
        rich.power = Math.ceil(Math.random()* 10) + 10;

        $(".health-bar").css('width', "100%").css('background','rgb(0,255,0)');
        $(".character-choose").append(darth.div);
        $(".character-choose").append(scoot.div);
        $(".character-choose").append(tammy.div);
        $(".character-choose").append(rich.div);
        $(".star-wars-contain").removeClass("fighting");
    }

    // on clicking reset, reset the game
    $("#reset").on( "click", function() {
        resetGame();
    }); 


    // on clicking characters, place the fighters in their positions, set them to user or computer Jedi
    $(".character-choose > .fighter").on( "click", function() {
        if ((isFirstCharChosen === false) && (isSecondCharChosen === false)) {
            userJedi = objectHolder[$(this).attr("data-value")];
            isFirstCharChosen = true;
            $("#user-fighter").append(this);
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === false)) {
            computerJedi = objectHolder[$(this).attr("data-value")];
            isSecondCharChosen = true;
            $("#computer-fighter").append(this);
            gameReady = true;
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === true)) {
            alert("players already chosen!");
        }
    });


    function Fight(jedi1,jedi2) {
        // use objects' power to determine damage
        jedi1.health = jedi1.health - jedi2.power;
        jedi2.health = jedi2.health - jedi1.power;

        // depending on winner, alert/reset game, otherwise, move health bar, set color rgb value based on health
        if (jedi1.health <= 0) {
            alert("You lose!");
            resetGame();
        } else if (jedi2.health <= 0) {
            alert("You win!!");
            resetGame();
        } else {
            jedi1.div.children(".health-bar").css('width', jedi1.health + "%").css('background', "rgb("+ Math.floor(((100 - jedi1.health) / 100) * 255) +","+ Math.floor((jedi1.health / 100) * 255) +","+ 0 +")" );
            jedi2.div.children(".health-bar").css('width', jedi2.health + "%").css('background', "rgb("+ Math.floor(((100 - jedi2.health) / 100) * 255) +","+ Math.floor((jedi2.health / 100) * 255) +","+ 0 +")" );

        }
    }
    
    // on clicking fight, if the game's ready, fight!
    $("#fight").on( "click", function() {
        if (gameReady === true) {
            $(".star-wars-contain").addClass("fighting");
            Fight(userJedi,computerJedi);
        } else {
            alert("Game not set yet! Please choose two fighters.");
        }
    });

});