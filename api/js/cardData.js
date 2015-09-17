/**
 * cardData
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Define points and scoring card structures
 * Cards are two pinochle decks without nines. 1 - 80 represent all cards like so (jack-Ace) * 4 in spades followed by clubs, diamonds and hearts
 */
'use strict';

function Meld(hand){
  this.hand = hand;
  this.len = hand.length;
  this.totalMeld = 0;
  this.jacksAround = {baseInt: 1, basePoints: 4, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.queensAround = {baseInt: 2, basePoints: 6, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.kingsAround = {baseInt: 3, basePoints: 8, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.tensAround = {baseInt: 4, basePoints: 0, points: 0};
  this.acesAround = {baseInt: 5, basePoints: 10, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.pinochle = {basePoints: 4, points: 0, cards:{
    spades: [],
    diamonds: []
  }};
  this.marriage = {basePoints: 2, points: 0, cards:{
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.runn = {basePoints: 15, points: {
    spades: 0,
    clubs: 0,
    diamonds: 0,
    hearts: 0
  }, cards:{
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }

  };
}
Meld.prototype.recordArounds = function(meldObj, hand){
  var c = 0,
    spadeCount = 0,
    clubCount = 0,
    diamondCount = 0,
    heartCount = 0,
    totalMeld = 0;
  for(c; c < this.len; c++){
    if(hand[c] === meldObj.baseInt || hand[c] === meldObj.baseInt + 5 || hand[c] === meldObj.baseInt + 10 || hand[c] === meldObj.baseInt + 15){
      spadeCount ++;
      meldObj.cards.spades.push(hand[c]);
    }
    else if (hand[c] === meldObj.baseInt + 20 || hand[c] === meldObj.baseInt + 25 || hand[c] === meldObj.baseInt + 30 || hand[c] === meldObj.baseInt + 35){
      clubCount++;
      meldObj.cards.clubs.push(this.hand[c]);
    }
    else if (hand[c] === meldObj.baseInt + 40 || hand[c] === meldObj.baseInt + 45 || hand[c] === meldObj.baseInt + 50 || hand[c] === meldObj.baseInt + 55){
      diamondCount++;
      meldObj.cards.diamonds.push(this.hand[c]);
    }
    else if (hand[c] === meldObj.baseInt + 60 || hand[c] === meldObj.baseInt + 65 || hand[c] === meldObj.baseInt + 70 || hand[c] === meldObj.baseInt + 75){
      heartCount++;
      meldObj.cards.hearts.push(this.hand[c]);
    }
  }
  if(spadeCount > 0 && clubCount > 0 && diamondCount > 0 && heartCount > 0){
    meldObj.points = meldObj.basePoints;
    if(spadeCount > 1 && clubCount > 1 && diamondCount > 1 && heartCount > 1){
      meldObj.points = meldObj.basePoints * 10;
      if(spadeCount > 2 && clubCount > 2 && diamondCount > 2 && heartCount > 2){
        meldObj.points = meldObj.basePoints * 10 + meldObj.basePoints;
        if(spadeCount > 3 && clubCount > 3 && diamondCount > 3 && heartCount > 3){
          meldObj.points = meldObj.basePoints * 20;
        }
      }
    }
  }
  totalMeld = totalMeld + meldObj.points;
  return {totalMeld: totalMeld, meldObj: meldObj};
};
Meld.prototype.calculateMeld = function(){
  var result;
  result = this.recordArounds(this.jacksAround, this.hand);
  this.totalMeld = this.totalMeld + result.totalMeld;
  var jacks = result.meldObj.cards;
  result = this.recordArounds(this.queensAround, this.hand);
  this.totalMeld = this.totalMeld + result.totalMeld;
  var queens = result.meldObj.cards;
  result = this.recordArounds(this.kingsAround, this.hand);
  this.totalMeld = this.totalMeld + result.totalMeld;
  var kings = result.meldObj.cards;
  result = this.recordArounds(this.tensAround);
  this.totalMeld = this.totalMeld + result.totalMeld;
  var tens = result.meldObj.cards;
  result = this.recordArounds(this.acesAround);
  this.totalMeld = this.totalMeld + result.totalMeld;
  var aces = result.meldObj.cards;
  this.recordRuns(jacks, queens, kings, tens, aces, this.runn)
};

this.prototype.recordRuns = function(jacks, queens, kings, tens, aces, runs){
  var result = this.runBySuite(runs.spades, jacks.spades, queens.spades, kings.spades, tens.spades, aces.spades, runs.basePoints);
  runs.spades.points = result.points; runs.spades.cards = result.cards;
  result = this.runBySuite(runs.clubs, jacks.clubs, queens.clubs, kings.clubs, tens.clubs, aces.clubs, runs.basePoints);
  runs.clubs.points = result.points; runs.clubs.cards = result.cards;
  result = this.runBySuite(runs.diamonds, jacks.diamonds, queens.diamonds, kings.diamonds, tens.diamonds, aces.diamonds, runs.basePoints);
  runs.diamonds.points = result.points; runs.diamonds.cards = result.cards;
  result = this.runBySuite(runs.hearts, jacks.hearts, queens.hearts, kings.hearts, tens.hearts, aces.hearts, runs.basePoints);
  runs.hearts.points = result.points; runs.hearts.cards = result.cards;
};

this.prototype.runBySuite = function(jacks, queens, kings, tens, aces, basePoints){
  //join all ranks, and score points if any return {points: n, cards: ary}
};

module.exports = Meld;