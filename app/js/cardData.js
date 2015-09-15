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
  this.jacks = [];
}
Meld.prototype.recordJacks = function(){
  var ints = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 76],
    c = 0;
  for(c; c < this.len; c++){
    if(this.hand[c] === 1 || this.hand[c] === 21 || this.hand[c] === 41 || this.hand[c] === 61) this.jacks[0] = this.hand[c];
  }
};