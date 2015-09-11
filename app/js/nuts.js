/**
 * nuts.js
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * a pinochle game: the guts
 */
'use strict';
module.exports = {
  deal: function(players, dealInteger){
    if(!(players)) throw new Error('a player object is required', 'nuts.js', 10);
    if(!(players.hasOwnProperty('player1'))) throw new Error('player object requires a player1 property');
    if(!(players.hasOwnProperty('player2'))) throw new Error('player object requires a player2 property');
    if(!(players.hasOwnProperty('player3'))) throw new Error('player object requires a player3 property');
    if(!(players.hasOwnProperty('player4'))) throw new Error('player object requires a player4 property');
    var dealInt = dealInteger || 4;
    if(dealInt > 20 || dealInt < 1) throw new Error('deal integer must be less than 20 and greater than 0', 'nuts.js', 12);
    var deck = this.makeDeck();
return deck;
  },

  makeDeck: function(){
    var deck = [],
      rnd;
    while(deck.length < 80){
      rnd = Math.floor(Math.random() * (80)) + 1;//1-80
      if(deck.indexOf(rnd) < 0 && rnd < 81){//random can sometimes return outside the upper bounds so <81
        deck.push(rnd);
      }
    }
    console.log(typeof deck);
    return deck;
  }
};
