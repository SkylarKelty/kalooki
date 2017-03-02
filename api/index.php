<?php
/**
 * Kalooki online.
 *
 * @copyright Skylar Kelty
 */

require_once(dirname(__FILE__) . "/lib/setup.php");

// All we are doing here for now is testing the deal method.
$suits = [
    0 => 'diamonds',
    1 => 'hearts',
    2 => 'clubs',
    3 => 'spades'
];

$cards = [
    1 => 'ace',
    2 => 2,
    3 => 3,
    4 => 4,
    5 => 5,
    6 => 6,
    7 => 7,
    8 => 8,
    9 => 9,
    10 => 10,
    11 => 'jack',
    12 => 'queen',
    13 => 'king'
];

$pack = [];
foreach ($suits as $suit) {
    foreach ($cards as $card) {
        $pack[] = [
            'src' => "media/images/cards/{$suit}/{$card}.png",
            'suit' => $suit,
            'card' => $card
        ];
    }
}

$deck = array_merge($pack, $pack);

// Add in the two jokers.
$deck[] = [
    'src' => "media/images/cards/joker1.png",
    'suit' => 'joker',
    'card' => 'joker'
];
$deck[] = [
    'src' => "media/images/cards/joker2.png",
    'suit' => 'joker',
    'card' => 'joker'
];

// Shuffle the deck!
shuffle($deck);
shuffle($deck);
shuffle($deck);

// Okay we built a deck for this game.
// Deal 13 cards from this deck.
$hand = [];
for ($i = 0; $i < 13; $i++) {
    $hand[] = $deck[$i];
}

echo json_encode($hand);
