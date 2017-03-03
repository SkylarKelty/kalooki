var express = require('express');
var shuffle = require('shuffle-array');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/game/new', function (req, res) {
    // Generate and return game ID.
});

app.push('/game/player', function (req, res) {
    // Add a player to a game, if they are the first then they now own this game.
    // Could be a race condition.. but it's a silly little app and I don't care.
    // This way is cleaner.
});

app.push('/game/start', function (req, res) {
    // Deal cards out to all players and lock the game.
});

app.get('/game/hand', function (req, res) {
    // TODO: return my hand from the dealt deck.
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
                    'src': "media/images/cards/" + suits[i] + "/" + cards[j] + ".png",
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

app.listen(3000, function () {
    console.log('Kalooki API listening on port 3000!')
});