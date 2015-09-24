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
var nuts = {
  teamOneTricks: {
    tricks: [],
    points: 0
  },
  teamTwoTricks: {
    tricks: [],
    points: 0
  },
  currentCards: [],
  currentWinner: {},
  trump: 0,
  trumpPlayed: [],
  round: 0,
  renigs: [],
  /**
   *
   * @param players {object}
   * @param dealInteger {int}
   * @returns {players}
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
   * @param deck {array}
   * @param cutpoint {int}
   * @returns {array}
   */
  cut: function(deck, cutpoint){
    var cutDeck = deck.slice(cutpoint);
    cutDeck = cutDeck.concat(deck.slice(0, cutpoint));
    return cutDeck;
  },
  /**
   *
   * @param player {object}
   * @param cardplayed {int}
   */
  takeTurn: function(player, cardplayed){
    //Is it the player's turn and is the card in the player's hand
    if(!this.validatePlayer(player) && !this.validateCard(player.hand, cardplayed)) return;
    var c = 0, len = player.hand.length, rank = 0, renig = false, suite = 0;
    this.round++;
    //create a card object
    var card = this.makeCardDetails(player, cardplayed);
    //this is the first card played
    if(!(this.currentWinner.cardId)){
      this.currentWinner = card;
    }
    else{
     renig = this.validatePlay(card, player.hand);
     // //Other cards have been played
     //if(card.suite === this.currentWinner.suite){
     //  if(card.rank > this.currentWinner.rank){
     //    this.currentWinner = card;
     //  }
     //  else{
     //    //check for renig
     //    for(c; c < len; c++){
     //      rank = this.getCardRank(player.hand[c]);
     //      if(rank > this.currentWinner.rank){
     //        renig = true;
     //      }
     //    }
     //  }
     //}
     ////Card played did not match the winner suite
     // else{
     //  //Check if trump played, if played check for currentCards[0].suite(lead card for round) in hand for renig and make winner
     //  if(card.suite === this.trump){
     //    this.currentWinner = card;
     //    //check for renig
     //    c = 0;
     //    for(c; c < len; c++){
     //      suite = this.getCardSuite(player.hand[c]);
     //      console.log('141-'+ suite);
     //      if(suite === this.currentCards[0].suite){
     //        renig = true;
     //      }
     //    }
     //  }
     //  else{
     //    //trump not played and winning suite not played
     //    c = 0;
     //    for(c; c < len; c++){
     //      suite = this.getCardSuite(player.hand[c]);
     //      if((suite === this.trump || suite === this.currentCards[0].suite) && card.suite !== this.currentCards[0].suite){
     //        renig = true;
     //      }
     //    }
     //  }
     //}
    }
    if(renig){
      this.renigs.push({id: player.id, round: this.round, playedCard: cardplayed, laidCards: this.currentCards});
    }
    this.currentCards.push(card);
    var idx = player.hand.indexOf(cardplayed);
    player.hand.splice(idx, 1);
    if(this.currentCards.length === 4){
      this.scoreRound();
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
   * @param player {object}
   * @returns {boolean}
   */
  validatePlayer: function(player){
    return player.dealPos === this.currentCards.length + 1;
  },
  /**
   * Suite changes every 20 cards, using that to determine suite
   * @param cardPlayed {int}
   * @returns {int}
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
  },
  /**
   * Create a played card object
   * @param player
   * @param cardPlayed
   * @returns {{cardId: *, playedBy: number}}
   */
  makeCardDetails: function(player, cardPlayed){
    var card = {cardId: cardPlayed, playedBy: player.id};
    card.rank = this.getCardRank(cardPlayed);
    card.suite = this.getCardSuite(cardPlayed);
    return card;
  },
  /**
   * Scores a round of the hand
   */
  scoreRound: function(){
    var c = 0, score = 0, cards = this.currentCards;
    for (c; c < 4; c++){
      if(cards[c].rank > 2) score++;
    }
    var winner = (this.currentWinner.playedBy === 2 || this.currentWinner.playedBy === 4) ? this.teamTwoTricks : this.teamOneTricks;
    winner.points += score;
    winner.tricks.push(this.currentCards);
    this.currentCards = [];
  },
  /**
   * Returns true if play is a renig
   * @param card {object}
   * @param hand {array}
   * @returns {boolean}
   */
  validatePlay: function(card, hand) {
    var rank = 0, suite = 0, renig = false, len = hand.length, c = 0;
    if (card.suite === this.currentWinner.suite) {
      if (card.rank > this.currentWinner.rank) {
        this.currentWinner = card;
      }
      else {
        //check for renig
        for (c; c < len; c++) {
          rank = this.getCardRank(hand[c]);
          if (rank > this.currentWinner.rank) {
            renig = true;
          }
        }
      }
    }
    //Card played did not match the winner suite
    else {
      //Check if trump played, if played check for currentCards[0].suite(lead card for round) in hand for renig and make winner
      if (card.suite === this.trump) {
        this.currentWinner = card;
        //check for renig
        c = 0;
        for (c; c < len; c++) {
          suite = this.getCardSuite(hand[c]);
          console.log('141-' + suite);
          if (suite === this.currentCards[0].suite) {
            renig = true;
          }
        }
      }
      else {
        //trump not played and winning suite not played
        c = 0;
        for (c; c < len; c++) {
          suite = this.getCardSuite(hand[c]);
          if ((suite === this.trump || suite === this.currentCards[0].suite) && card.suite !== this.currentCards[0].suite) {
            renig = true;
          }
        }
      }
    }
    return renig;
  }
};
module.exports = nuts;