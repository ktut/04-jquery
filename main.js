$(document).ready(function() {

    // declare dem variables!
    let isFirstCharChosen = false;
    let isSecondCharChosen = false;

    let darthDiv = $('#darthtaniel');
    let scootDiv = $('#scootwalker');
    let tammyDiv = $('#tammyrey');
 
    let darth = {
        "name": "Darthtaniel",
        "health": 100,
        "multipler": 15,
        "power": function() {
            return Math.random() * this.multiplier
        },
    }

    let scoot = {
        "name": "Scootwalker",
        "health": 100,
        "multipler": 10,
        "power": function() {
            return Math.random() * this.multiplier
        },
    }

    let tammy = {
        "name": "Tammy-Rey",
        "health": 100,
        "multipler": 5,
        "power": function() {
            return Math.random() * this.multiplier
        },
    }


    // in case you wanna reset!
    function resetGame() {
        isFirstCharChosen = false;
        isSecondCharChosen = false;
        $(".character-choose").append(darthDiv);
        $(".character-choose").append(scootDiv);
        $(".character-choose").append(tammyDiv);
    }

    $("#reset").on( "click", function() {
        resetGame();
    }); 

    

    // onplace the fighters in their positions
    $(".character-choose > .fighter").on( "click", function() {
        if ((isFirstCharChosen === false) && (isSecondCharChosen === false)) {
            $("#user-fighter").append(this);
            isFirstCharChosen = true;
        } else if ((isFirstCharChosen === true) && (isSecondCharChosen === false)) {
            $("#computer-fighter").append(this);
            isSecondCharChosen = true;
        }
    });


    

});