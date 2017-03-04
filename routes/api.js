var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');

/* GET a new game's ID. */
router.get('/game_start', function(req, res, next) {
    // For now this just returns a hand.
    var suits = [
        'diamonds',
        'hearts',
        'clubs',
        'spades'
    ];

    var cards = [
        'ace',
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        'jack',
        'queen',
        'king'
    ];

    // Build the deck.
    var deck = [];
    for (d = 0; d < 2; d++) {
        for (i = 0; i < suits.length; i++) {
            for (j = 0; j < cards.length; j++) {
                deck.push({
                    'src': "/images/cards/" + suits[i] + "/" + cards[j] + ".png",
                    'suit': suits[i],
                    'card': cards[j]
                });
            }
        }
    }

    // Add the jokers.
    deck.push({
        'src': "media/images/cards/joker1.png",
        'suit': 'joker',
        'card': 'joker'
    });

    deck.push({
        'src': "media/images/cards/joker2.png",
        'suit': 'joker',
        'card': 'joker'
    });

    // Shuffle the deck.
    shuffle(deck);
    shuffle(deck);
    shuffle(deck);

    // Okay we built a deck for this game.
    // Deal 13 cards from this deck.
    var hand = [];
    for (i = 0; i < 13; i++) {
        hand.push(deck[i]);
    }

    res.json(hand)
});

module.exports = router;
