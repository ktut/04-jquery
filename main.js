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

        // Optional: change the power of each player on game reset
        // darth.power = Math.ceil(Math.random()* 10) + 10;
        // scoot.power = Math.ceil(Math.random()* 10) + 10;
        // tammy.power = Math.ceil(Math.random()* 10) + 10;
        // rich.power = Math.ceil(Math.random()* 10) + 10;

        // place all the fighters back and reset their classes
        $( ".fighter" ).each(function() {
            $(".character-choose").append(this);
            $(this).removeClass("good").removeClass("bad").removeClass("defeated");
        });

        $(".star-wars-contain").removeClass("fighting");
        $(".character-choose > h2").text("Choose your character, then choose an enemy to attack!");
        $(".health-bar").css('width', "100%").css('background','rgb(0,255,0)');
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
            $(this).addClass("good");
            $("#user-fighter").append(this);
            // $(this).unbind();
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === false)) {
            computerJedi = objectHolder[$(this).attr("data-value")];
            isSecondCharChosen = true;
            $(this).addClass("bad");
            $("#computer-fighter").append(this);
            // $(this).unbind();
            gameReady = true;
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === true)) {
            alert("players already chosen!");
        }
    });


    function Fight(jedi1,jedi2) {

        // use objects' power to determine damage
        jedi1.health = jedi1.health - jedi2.power;
        jedi2.health = jedi2.health - jedi1.power;

        // if user loses (runs out of health), reset game
        if (jedi1.health <= 0) {
            alert("You were defeated by " + jedi2.name + "! Resetting the game...");
            resetGame();
        
        // if user wins a battle (enemy has no more health):
        } else if (jedi2.health <= 0) {

            // move in a new jedi to fight (if there are any left)
            if ( $(".character-choose .fighter").length ) {

                // place defeated enemy jedi in defeated div
                $("#defeated").append(jedi2.div);
                // take the first remaining jedi and move it to combat div
                $("#computer-fighter").append($(".character-choose .fighter:first-of-type"));
                // get the correct new enemy jedi object, place it in computerJedi
                computerJedi = objectHolder[$("#computer-fighter .fighter").attr("data-value")];
                // make its background red
                $("#computer-fighter .fighter").addClass("bad");

                // restore user Jedi health, update health bar
                jedi1.health = 100;
                jedi1.div.children(".health-bar").css('width', jedi1.health + "%").css('background', "rgb("+ Math.floor(((100 - jedi1.health) / 100) * 255) +","+ Math.floor((jedi1.health / 100) * 255) +","+ 0 +")" );

                // give the user Jedi slightly more attack power as a reward. Since initial jedi power is between 10 and 20, this will need to increase by at least 2 to give the user a chance. making this number bigger makes the game easier to win)
                jedi1.power = jedi1.power + 2;

            // if there are no fighters left, announce victory!
            } else {
                alert("You have defeated all fighters with Jedi Master " + jedi1.name + "!! Resetting the game.");
                resetGame();
            }
        
        // if jedis are still battling (no win or loss yet):
        } else {
            jedi1.div.children(".health-bar").css('width', jedi1.health + "%").css('background', "rgb("+ Math.floor(((100 - jedi1.health) / 100) * 255) +","+ Math.floor((jedi1.health / 100) * 255) +","+ 0 +")" );
            jedi2.div.children(".health-bar").css('width', jedi2.health + "%").css('background', "rgb("+ Math.floor(((100 - jedi2.health) / 100) * 255) +","+ Math.floor((jedi2.health / 100) * 255) +","+ 0 +")" );
        }
    }
    
    // on clicking fight, if the players are set, fight!
    $("#fight").on( "click", function() {
        if (gameReady === true) {
            $(".star-wars-contain").addClass("fighting");
            $(".character-choose > h2").text("Remaining fighters:");
            Fight(userJedi,computerJedi);
        } else {
            alert("Game not set yet! Please choose two fighters.");
        }
    });

});