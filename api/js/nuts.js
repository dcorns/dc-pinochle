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
    tricks: {cards: [], renig: [], playerId: []},
    points: 0
  },
  teamTwoTricks: {
    tricks: {cards: [], renig: [], playerId: []},
    points: 0
  },
  currentCards: [],
  currentWinner: {},
  trump: 0,
  trumpPlayed: [],
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
  /**
   *
   * @param player
   * @param cardplayed
   */
  takeTurn: function(player, cardplayed){
    //Is it the player's turn and is the card in the player's hand
    if(!this.validatePlayer(player) && !this.validateCard(player.hand, cardplayed)) return;
    var c = 0, len = player.hand.length, rank = 0, renig = false;
    //create a card object
    var card = {cardId: cardplayed, playedBy: player.id};
    card.team = 4 % player.id ? 2 : 1;
    card.rank = this.getCardRank(cardplayed);
    card.suite = this.getCardSuite(cardplayed);
    //this is the first card played
    if(!(this.currentWinner.cardId)){
      this.currentWinner = card;
    }
    else{
      //Other cards have been played
     if(card.suite === this.currentWinner.suite){
       if(card.rank > this.currentWinner.rank){
         this.currentWinner = card;
       }
       else{
         //check for renig
         for(c; c < len; c++){
           rank = this.getCardRank(c);
           if(rank > this.currentWinner){
             renig = true;
           }
         }
       }
     }
    }
    if(renig){

    }
    this.currentCards.push(card);
    player.hand.slice(player.hand.indexOf(cardplayed));
    if(card.suite === this.trump){
      this.trumpPlayed.push(card);
    }
  },
  /**
   *
   * @param hand {array} integers
   * @param cardPlayed {int}
   * @returns {boolean} if false the card was already played or not a card the player was dealt
   */
  validateCard: function(hand, cardPlayed){
    return hand.indexOf(cardPlayed) > 0;
  },
  /**
   * Higher rank number takes lower rank number
   * @param card {int}
   * @returns {int}
   */
  getCardRank: function(card){
    var c = 0, numberOfCardRanks = 5, numberofCards = 80;
    for(c; c < numberofCards - numberOfCardRanks; c+=numberOfCardRanks){
      if(card === 1 + c) return 1;
      if(card === 2 + c) return 2;
      if(card === 3 + c) return 3;
      if(card === 4 + c) return 4;
      if(card === 5 + c) return 5;
    }
  },
  /**
   * Verifies that it is the players turn to play
   * @param player
   * @returns {boolean}
   */
  validatePlayer: function(player){
    console.log(player.dealPos, this.currentCards.length + 1);
    return player.dealPos === this.currentCards.length + 1;
  },
  /**
   * Suite changes every 20 cards, using that to determine suite
   * @param cardPlayed
   * @returns {number}
   */
  getCardSuite: function(cardPlayed){
    if(cardPlayed < 21 && cardPlayed > 0) return 1;
    if(cardPlayed < 41 && cardPlayed > 20) return 2;
    if(cardPlayed < 61 && cardPlayed > 40) return 3;
    if(cardPlayed < 81 && cardPlayed > 60) return 4;
    return 0;
  },
  /**
   * Checks if cardPlayed rank is superior to all the card ranks in cardsLaid
   * @param cardPlayed
   * @param cardsLaid
   * @returns {boolean}
   */
  rankPlay: function(cardPlayed, cardsLaid){
    var isWinner = false, c = 0, len = cardsLaid.length;
    for(c; c < len; c++){
      isWinner = cardPlayed.rank > cardsLaid[0].rank;
    }
    return isWinner;
  }

};