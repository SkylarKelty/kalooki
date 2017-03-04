var express = require('express');
var router = express.Router();
var shuffle = require('shuffle-array');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kalooki');

var Schema = mongoose.Schema;

var gameSchema = new Schema({
  id:  Number,
  owner: Number,
  players: [{ id: Number, name: String }],
  deck: [{ pack: Number, src: String, suit: String, card: String }],
  discard: [{ src: String, suit: String, card: String }],
  table: [{ group: Number, src: String, suit: String, card: String }],
  hands: [{ player: Number, cards: [{pack: Number, src: String, suit: String, card: String}] }],
});
var Game = mongoose.model('Game', gameSchema);

/* GET a new game's ID. */
router.get('/game_start', function(req, res, next) {
    // Build a deck of cards.
    var suits = [
        'diamonds', 'hearts', 'clubs', 'spades'
    ];

    var cards = [
        'ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'
    ];

    // Build the deck.
    var deck = [];
    for (p = 1; p < 3; p++) {
        for (i = 0; i < suits.length; i++) {
            for (j = 0; j < cards.length; j++) {
                deck.push({
                    'pack': p,
                    'src': "/images/cards/" + suits[i] + "/" + cards[j] + ".png",
                    'suit': suits[i],
                    'card': cards[j]
                });
            }
        }

        // Add the joker.
        deck.push({
            'pack': p,
            'src': "images/cards/joker" + p + ".png",
            'suit': 'joker',
            'card': 'joker'
        });
    }

    // Shuffle the deck.
    shuffle(deck);
    shuffle(deck);
    shuffle(deck);

    // TODO: For now, assume we have one player.
    // Okay we built a deck for this game.
    // Deal 13 cards from this deck.
    var hand = [];
    for (i = 0; i < 13; i++) {
        hand.push(deck[i]);
    }

    // Save the game to MongoDB.
    var userID = 1;//req.param('userid'); // TODO - player system.
    var gameID = Math.floor((Math.random() * 1000000) + 1); // TODO: collision check.
    var game = new Game({
        id:  gameID,
        owner: userID,
        players: [{ id: userID, name: "Sky" }], // TODO - player system.
        deck: deck,
        discard: [],
        table: [],
        hands: [{ player: userID, cards: hand}]
    });

    game.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('New game started: ' + gameID);
        }
    });

    res.json({
        gameid: gameID,
        hand: hand
    })
});

module.exports = router;
