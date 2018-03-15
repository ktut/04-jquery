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

    // yeah, I probably should've put the above objects into this super object, and made it like JSON. but I didn't.
    let objectHolder = {
        "darth": darth,
        "scoot": scoot,
        "tammy": tammy,
        "rich": rich,
    }

    // console log all the powers for reference (or cheating)
    console.log("Tryna cheat? No problem! Darth power: " + darth.power + "; " + "Scoot power: " + scoot.power + "; " + "Tammy power: " + tammy.power + "; " + "Rich power: " + rich.power)
    
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
            $(this).show();
            $(".character-choose").append(this);
            $(this).removeClass("good").removeClass("bad").removeClass("defeated");
        });

        $(".star-wars-contain").removeClass("fighting");
        $("#fight").removeClass("glow");
        $(".controls").hide();
        $(".character-choose > h2").text("Choose your character, then choose an enemy to attack!");
        $(".health-bar").css('width', "100%").css('background','rgb(0,255,0)');
    }


    // on clicking reset, reset the game
    $("#reset").on( "click", function() {
        resetGame();
    }); 


    // on clicking characters, place the fighters in their positions, set them to user or computer Jedi. initially used .unbind() to prevent additional fighter selecting, but this caused problems when resetting game
    $(".character-choose > .fighter").on( "click", function() {
        if ((isFirstCharChosen === false) && (isSecondCharChosen === false)) {
            userJedi = objectHolder[$(this).attr("data-value")];
            isFirstCharChosen = true;
            $(this).addClass("good");
            $(".controls").fadeIn();
            $("#user-fighter").append(this);
            // $(this).unbind();
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === false)) {
            computerJedi = objectHolder[$(this).attr("data-value")];
            isSecondCharChosen = true;
            $(this).addClass("bad");
            $("#fight").addClass("glow");
            $("#computer-fighter").append(this);
            // $(this).unbind();
            gameReady = true;
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === true)) {
            alert("players already chosen!");
        }
    });


    function Fight(jedi1,jedi2) {

        // let enemy take damage
        jedi2.health = jedi2.health - jedi1.power;

        // if user loses (runs out of health), reset game
        if (jedi1.health <= 0) {
            alert("You were defeated by " + jedi2.name + "! Resetting the game...");
            resetGame();
        
        // if user wins a battle (enemy has no more health):
        } else if (jedi2.health <= 0) {

            // move in a new jedi to fight (if there are any left)
            if ( $(".character-choose .fighter").length ) {

                // do some cool animation..? can't figure out how to stall the code here to do this.
                jedi2.div.fadeOut('slow', function () {
                    console.log('animation finished');
                    // place defeated enemy jedi in defeated div
                    $("#defeated").append(jedi2.div);
                    // take the first remaining jedi and move it to combat div
                    $("#computer-fighter").append($(".character-choose .fighter:first-of-type"));
                    // get the correct new enemy jedi object, place it in computerJedi
                    computerJedi = objectHolder[$("#computer-fighter .fighter").attr("data-value")];
                    // make new enemy background red
                    $("#computer-fighter .fighter").addClass("bad");

                    // restore user Jedi health, update health bar width and color. Since rgba() apparently does not accept values with more than 1-2 decimal places, Math.floor() was needed. this was especially annoying to figure out
                    jedi1.health = 100;
                    jedi1.div.children(".health-bar").css('width', jedi1.health + "%").css('background', "rgb("+ Math.floor(((100 - jedi1.health) / 100) * 255) +","+ Math.floor((jedi1.health / 100) * 255) +","+ 0 +")" );

                    // give the user Jedi slightly more attack power as a reward. Since initial jedi power is between 10 and 20, this needed to increase by at least 1 to give the user a chance. increasing this makes the game easier to win overall
                    jedi1.power = jedi1.power + 1.5;
                    console.log("new " + jedi1.name + " power: " + jedi1.power);
                });

            // if there are no fighters left, announce victory!
            } else {
                alert("You have defeated all fighters with Jedi Master " + jedi1.name + "!! Resetting the game.");
                resetGame();
            }
        
        // if jedis are still battling (no win or loss yet):
        } else {
            // let user take damage
            jedi1.health = jedi1.health - jedi2.power;

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