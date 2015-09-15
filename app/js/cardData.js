/**
 * cardData
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Define points and scoring card structures
 * Cards are two pinochle decks without nines. 1 - 80 represent all cards like so (jack-Ace) * 4 in spades followed by clubs, diamonds and hearts
 */
'use strict';

var cardData = {
  jacksAround: {
    points: 4,
    checkCard: function(meld, card){
      var jacks = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 76];

    }
  },
  queensAround: {
    points: 6
  },
  kingsAround: {
    points: 8
  },
  acesAround: {
    points: 10
  },
  pinochle: {
    points: 4
  },
  pinochle2: {
    points: 30
  },
  pinochle3: {
    points: 90
  },
  pinochle4: {
    points: 500
  },
  marriage: {
    points: 2
  },
  roundRobin: {
    points: 24
  },
  runn: {
    points: 15
  },
  scoreAround: function(hand, basePosition, basePoints) {
    var c = 0,
      clubs = basePosition + 20,
      diamonds = basePosition + 40,
      hearts = basePosition + 60,
      len = hand.length,
      points = 0;
    var spadeCount = 0, clubsCount = 0, diamondsCount = 0, heartsCount = 0;
    for (c; c < len; c++) {
      if (hand[c] === basePosition || hand[c] === basePosition + 5 || hand[c] === basePosition + 10 || hand[c] === basePosition + 15) {
        spadeCount++;
      }
      else if (hand[c] === clubs || hand[c] === clubs + 5 || hand[c] === clubs + 10 || hand[c] === clubs + 15) {
        clubsCount++;
      }
      else if (hand[c] === diamonds || hand[c] === diamonds + 5 || hand[c] === diamonds + 10 || hand[c] === diamonds + 15) {
        diamondsCount++;
      }
      else if (hand[c] === hearts || hand[c] === hearts + 5 || hand[c] === hearts + 10 || hand[c] === hearts + 15) {
        heartsCount++;
      }
    }
    if (spadeCount > 0 && clubsCount > 0 && diamondsCount > 0 && heartsCount > 0) {
      points = basePoints;
      if (spadeCount > 1 && clubsCount > 1 && diamondsCount > 1 && heartsCount > 1) {
        points = basePoints * 10;
      }
    }
    return points;
  },
  scorePinochle: function(hand){

  },
  assignHand: function(hand){
    var meld = {total: 0},
      c = 0,
      len = hand.length;
    for(c; c < len; c++){

    }
  }
};
module.exports = cardData;
