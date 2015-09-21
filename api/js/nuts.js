/**
 * nuts.js
 * Created by dcorns on 9/11/15
 * @author Copyright © 2015 Dale Corns
 * @fileOverview a pinochle game: Shuffles and deals the card from the current dealer perspective using the specified card amount of cards to each player until all 80 are dealt
 */
'use strict';
/**
 *
 * @type {{startRound: Function, shuffle: Function, deal: Function}}
 */
module.exports = {
  teamOneTricks: {
    cards: [],
    points: 0
  },
  teamTwoTricks: {
    cards: [],
    points: 0
  },
  currentCards: [],
  playerTurn: 0,
  trump: '',
  /**
   *
   * @param players
   * @param dealInteger
   * @returns {*}
   */
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
  /**
   *
   * @returns {Array}
   */
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
  /**
   *
   * @param deck
   * @param dealInt
   * @param players
   * @returns {players}
   */
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
  },
  /**
   *
   * @param deck {object}
   * @param cutpoint {int}
   * @returns {*}
   */
  cut: function(deck, cutpoint){
    var cutDeck = deck.slice(cutpoint);
    cutDeck = cutDeck.concat(deck.slice(0, cutpoint));
    return cutDeck;
  },
  takeTurn: function(player, cardplayed){
    if(this.playerTurn !== player.id){
      return;
    }
    this.currentCards.push(cardPlayed);
    if(this.currentCards.length > 3){
      //score cards and add to the proper teams array of card tricks
    }
  }
};