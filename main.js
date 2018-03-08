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
        $(".character-choose").append(".fighter");
    }

    $(".character-choose > .fighter").on( "click", function() {
        if (isFirstCharChosen === false) {
            $("#user-fighter").append(this);
            isFirstCharChosen = true;
        } else {
            $("#computer-fighter").append(this);
            isSecondCharChosen = true;
        }
    });


});