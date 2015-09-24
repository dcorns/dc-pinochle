/**
 * dcPinochle
 * Created by dcorns on 9/11/15
 * @author Copyright © 2015 Dale Corns
 * @fileOverview A backend for online Pinochle game (4 players)
 */
'use strict';
/**
 *
 * @type {{teamOneTricks: {tricks: Array, points: number}, teamTwoTricks: {tricks: Array, points: number}, currentCards: Array, currentWinner: {}, trump: number, trumpPlayed: Array, round: number, renigs: Array, startRound: Function, shuffle: Function, deal: Function, cut: Function, takeTurn: Function, validateCard: Function, getCardRank: Function, validatePlayer: Function, getCardSuite: Function, rankPlay: Function, makeCardDetails: Function, scoreRound: Function, validatePlay: Function}|exports|module.exports}
 */
var nuts = require('./nuts'),
  /**
   *
   * @type {Meld|exports|module.exports}
   */
  CardData = require('./cardData'),
  /**
   * For Tracking Players
   * @type {{player1: {id: number, name: string, hand: Array, dealPos: number, meld: {}}, player2: {id: number, name: string, hand: Array, dealPos: number, meld: {}}, player3: {id: number, name: string, hand: Array, dealPos: number, meld: {}}, player4: {id: number, name: string, hand: Array, dealPos: number, meld: {}}}}
   */
  players = {
    player1: {
      id: 1,
      name:'',
      hand:[],
      dealPos: 4,
      meld: {}
    },
    player2: {
      id: 2,
      name:'',
      hand:[],
      dealPos: 1,
      meld: {}
    },
    player3: {
      id: 3,
      name:'',
      hand:[],
      dealPos: 2,
      meld: {}
    },
    player4: {
      id: 4,
      name:'',
      hand:[],
      dealPos: 3,
      meld: {}
    }
  };
/**
 *
 * @type {{addPlayerName: Function, startHand: Function}}
 * @module dcPinochle
 */
module.exports = {
  /**
   * Creates player hands, calculates the meld and provides object for running the game
   * @param cardsPerDeal {int}
   */
  startHand: function(cardsPerDeal){
    var play = nuts.startRound(players, cardsPerDeal);
    play.player1.meld = new CardData(play.player1.hand);
    play.player2.meld = new CardData(play.player2.hand);
    play.player3.meld = new CardData(play.player3.hand);
    play.player4.meld = new CardData(play.player4.hand);
    play.player1.meld.calculateMeld();
    play.player2.meld.calculateMeld();
    play.player3.meld.calculateMeld();
    play.player4.meld.calculateMeld();
    return play;
  }
};


