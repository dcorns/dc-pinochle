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
  this.spades = [];
  this.clubs = [];
  this.diamonds = [];
  this.hearts = [];
  this.jacksAround = {baseInt: 1, basePoints: 4, points: 0};
  this.queensAround = {baseInt: 2, basePoints: 6, points: 0};
  this.kingsAround = {baseInt: 3, basePoints: 8, points: 0};
  this.tensAround = {baseInt: 4, basePoints: 0, points: 0};
  this.acesAround = {baseInt: 5, basePoints: 10, points: 0};
  this.pinochle = {basePoints: 4, points: 0};
  this.marriage = {basePoints: 2, points: 0};
}
Meld.prototype.recordArounds = function(meldObj){
  var c = 0,
    spadeCount = 0,
    clubCount = 0,
    diamondCount = 0,
    heartCount = 0;
  for(c; c < this.len; c++){
    if(this.hand[c] === meldObj.baseInt || this.hand[c] === meldObj.baseInt + 5 || this.hand[c] === meldObj.baseInt + 10 || this.hand[c] === meldObj.baseInt + 15){
      this.spades.push(this.hand[c]);
      spadeCount ++;
    }
    else if (this.hand[c] === meldObj.baseInt + 20 || this.hand[c] === meldObj.baseInt + 25 || this.hand[c] === meldObj.baseInt + 30 || this.hand[c] === meldObj.baseInt + 35){
      this.clubs.push(this.hand[c]);
      clubCount++;
    }
    else if (this.hand[c] === meldObj.baseInt + 40 || this.hand[c] === meldObj.baseInt + 45 || this.hand[c] === meldObj.baseInt + 50 || this.hand[c] === meldObj.baseInt + 55){
      this.diamonds.push(this.hand[c]);
      diamondCount++;
    }
    else if (this.hand[c] === meldObj.baseInt + 60 || this.hand[c] === meldObj.baseInt + 65 || this.hand[c] === meldObj.baseInt + 70 || this.hand[c] === meldObj.baseInt + 75){
      this.hearts.push(this.hand[c]);
      heartCount++;
    }
  }
  console.log(spadeCount, clubCount, diamondCount, heartCount);
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
};
Meld.prototype.calculateMeld = function(){
  this.recordArounds(this.jacksAround);
  this.recordArounds(this.queensAround);
  this.recordArounds(this.kingsAround);
  this.recordArounds(this.tensAround);
  this.recordArounds(this.acesAround);
  this.recordPinochle();
};
Meld.prototype.recordPinochle = function(){
  var jackCount = 0, queenCount = 0, c = 0, len = this.spades.length;
  for(c; c < len; c++){
    if(this.spades[c] === 1 || this.spades[c] === 6 || this.spades[c] === 11 || this.spades[c] === 16){
      jackCount++;
    }
  }
  c = 0; len = this.diamonds.length;
  for(c; c < len; c++){
    if(this.diamonds[c] === 42 || this.diamonds[c] === 47 || this.diamonds[c] === 52 || this.diamonds[c] === 57){
      queenCount++;
    }
  }
  if(jackCount > 0 && queenCount > 0){
    this.pinochle.points = this.pinochle.basePoints;
    if(jackCount > 1 && queenCount > 1){
      this.pinochle.points = this.pinochle.basePoints * 10;
      if(jackCount > 2 && queenCount > 2){
        this.pinochle.points = this.pinochle.basePoints * 20 + 10;
        if(jackCount > 3 && queenCount > 3){
          this.pinochle.points = 500;//and the game
        }
      }
    }
  }
};
Meld.prototype.recordMarriages = function(){
  var kingS, queenS, kingC, queenC, kingD, queenD, kingH, queenH;
  var c = 0, len = this.spades.length;

};
module.exports = Meld;