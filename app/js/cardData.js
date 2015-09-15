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
  this.jacksAround = {basePoints: 4, points: 0}
}
Meld.prototype.recordArounds = function(baseInt){
  var c = 0,
    spadeCount = 0,
    clubCount = 0,
    diamondCount = 0,
    heartCount = 0;
  for(c; c < this.len; c++){
    if(this.hand[c] === baseInt || this.hand[c] === baseInt + 20 || this.hand[c] === baseInt + 40 || this.hand[c] === baseInt + 60){
      this.spades.push(this.hand[c]);
      spadeCount ++;
    }
    else if (this.hand[c] === baseInt + 5 || this.hand[c] === baseInt + 25 || this.hand[c] === baseInt + 45 || this.hand[c] === baseInt + 65){
      this.clubs.push(this.hand[c]);
      clubCount++;
    }
    else if (this.hand[c] === baseInt + 10 || this.hand[c] === baseInt + 30 || this.hand[c] === baseInt + 50 || this.hand[c] === baseInt + 70){
      this.diamonds.push(this.hand[c]);
      diamondCount++;
    }
    else if (this.hand[c] === baseInt + 15 || this.hand[c] === baseInt + 35 || this.hand[c] === baseInt + 55 || this.hand[c] === baseInt + 75){
      this.hearts.push(this.hand[c]);
      heartCount++;
    }
    if(spadeCount > 0 && clubCount > 0 && diamondCount > 0 && heartCount > 0){
      this.jacksAround.points = this.jacksAround.basePoints;
      if(spadeCount > 1 && clubCount > 1 && diamondCount > 1 && heartCount > 1){
        this.jacksAround.points = this.jacksAround.basePoints * 10;
        if(spadeCount > 2 && clubCount > 2 && diamondCount > 2 && heartCount > 2){
          this.jacksAround.points = this.jacksAround.basePoints * 10 + 4;
          if(spadeCount === 4 === clubCount === diamondCount === heartCount){
            this.jacksAround.points = this.jacksAround.basePoints * 20;
          }
        }
      }
    }
  }
};

module.exports = Meld;