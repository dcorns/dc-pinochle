/**
 * nuts.js
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * a pinochle game: the guts
 */
'use strict';
module.exports = {
  startRound: function(players, dealInteger){
    if(!(players)) throw new Error('a player object is required', 'nuts.js', 10);
    if(!(players.hasOwnProperty('player1'))) throw new Error('player object requires a player1 property');
    if(!(players.hasOwnProperty('player2'))) throw new Error('player object requires a player2 property');
    if(!(players.hasOwnProperty('player3'))) throw new Error('player object requires a player3 property');
    if(!(players.hasOwnProperty('player4'))) throw new Error('player object requires a player4 property');
    var dealInt = dealInteger || 4;
    if(dealInt > 20 || dealInt < 1) throw new Error('deal integer must be less than 20 and greater than 0', 'nuts.js', 12);
    var deck = this.shuffle();
    players = this.deal(deck, dealInt, players);
return players;
  },
  shuffle: function(){
    var deck = [],
      rnd;
    while(deck.length < 80){
      rnd = Math.floor(Math.random() * (80)) + 1;//1-80
      if(deck.indexOf(rnd) < 0 && rnd < 81){//random can sometimes return outside the upper bounds so <81
        deck.push(rnd);
      }
    }
    return deck;
  },
  deal: function(deck, dealInt, players){
    var c = 0,
      len = deck.length,
      prop,
      dealPos = 1,
      cardCountDown = dealInt;
    while(c < len){
      for(prop in players){
        if(players[prop].dealPos === dealPos && players.hasOwnProperty(prop)){
          players[prop].hand.push(deck[c]);
        }
      }
      cardCountDown--;
      if(cardCountDown === 0){
        cardCountDown = dealInt;
        dealPos++;
        if(dealPos === 5) dealPos = 1;
      }
      c++;
    }
    return players;
  }
};