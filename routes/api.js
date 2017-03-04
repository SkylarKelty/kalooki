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
  deck: [{ _id: String, pack: Number, src: String, suit: String, card: String }],
  discard: [{ _id: String, pack: Number, src: String, suit: String, card: String }],
  table: [{ _id: String, playerid: String, group: Number, src: String, suit: String, card: String }],
  hands: [{ _id: Number, cards: [{_id: String, pack: Number, src: String, suit: String, card: String}] }],
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
                    '_id': p + '_' + i + '_' + j,
                    'pack': p,
                    'src': "/images/cards/" + suits[i] + "/" + cards[j] + ".png",
                    'suit': suits[i],
                    'card': cards[j]
                });
            }
        }

        // Add the joker.
        deck.push({
            '_id': p + '_joker',
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
        hand.push(deck.pop());
    }

    // TODO: choose random player.
    var startingPlayerID = 1;
    // Choose a player and deal the 14th card.
    hand.push(deck.pop());

    // Save the game to MongoDB.
    var userID = 1;//req.param.userid; // TODO - player system.
    var game = new Game({
        owner: userID,
        players: [{ id: userID, name: "Sky" }], // TODO - player system.
        deck: deck,
        discard: [],
        table: [],
        hands: [{ _id: userID, cards: hand}]
    });

    game.save(function (err) {
        if (err) {
            console.log(err);
            res.status(404).end();
        } else {
            console.log('New game started: ' + game._id);

            res.json({
                gameid: game._id,
                startingplayer: startingPlayerID,
                hand: hand
            })
        }
    });
});

/* Discard a card. */
router.get('/card', function(req, res, next) {
    var gameid = req.query.gameid;
    var playerid = req.query.playerid;

    // TODO - session security etc.

    Game.findOne({_id: gameid}, function (err, doc) {
        if (err) {
            res.status(404).end();
        }

        // Are we at the end of our game?
        if (doc.deck.length == 0) {
            // Switch discard piles and hand.
        }

        // Grab a card from the deck.
        var card = doc.deck.pop();

        // Add it to this player's hand.
        doc.hands.id(playerid).cards.push(card);

        // Save the game state.
        doc.save(function (err) {
            if (err) {
                console.log(err);
                res.status(404).end();
            } else {
                res.json({
                    hand: doc.hands.id(playerid).cards,
                });
            }
        });
    });
});

/* Discard a card. */
router.delete('/card', function(req, res, next) {
    var gameid = req.query.gameid;
    var playerid = req.query.playerid;
    var cardid = req.query.cardid;

    // TODO - session security etc.

    Game.findOne({_id: gameid}, function (err, doc) {
        if (err) {
            res.status(404).end();
        }

        doc.hands.id(playerid).cards.id(cardid).remove();
        doc.save(function (err) {
            if (err) {
                console.log(err);
                res.status(404).end();
            } else {
                res.json({
                    hand: doc.hands.id(playerid).cards,
                });
            }
        });
    });
});

module.exports = router;
