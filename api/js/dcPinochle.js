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
function getPlayerFromId(id){
  switch (id){
    case 1:
      return players.player1;
      break;
    case 2:
      return players.player2;
      break;
    case 3:
      return players.player3;
      break;
    case 4:
      return players.player4;
      break;
    default:
      throw error('valid id\'s are 1-4');
      break;
  }
}
module.exports = {
  /**
   * Adds an name to the player object
   * @param id {int} 1-4
   * @param name {string} player name
   */
  addPlayerName: function(id, name){
    switch (id){
      case 1:
        players.player1.name = name;
        break;
      case 2:
        players.player2.name = name;
        break;
      case 3:
        players.player3.name = name;
        break;
      case 4:
        players.player4.name = name;
        break;
      default:
        throw error('valid id\'s are 1-4');
        break;
    }
  },
  /**
   * Creates player hands, calculates the meld and provides object for running the game
   * @param cardsPerDeal {int} card dealing segment
   * @param cutPoint {int} where to cut the cards
   */
  startHand: function(cardsPerDeal, cutPoint){
    var play = nuts.startRound(players, cardsPerDeal);
    play.player1.meld = new CardData(play.player1.hand);
    play.player2.meld = new CardData(play.player2.hand);
    play.player3.meld = new CardData(play.player3.hand);
    play.player4.meld = new CardData(play.player4.hand);
    play.player1.meld.calculateMeld();
    play.player2.meld.calculateMeld();
    play.player3.meld.calculateMeld();
    play.player4.meld.calculateMeld();
  },
  /**
   * Plays a card
   * @param playerId
   * @param card {int}
   */
  playCard: function(playerId, card){
    nuts.takeTurn(getPlayerFromId(playerId), card);
  },
  getCurrentCards: function(){
    return nuts.currentCards;
  },
  getPlayerHand: function(playerId){
    return getPlayerFromId(playerId).hand;
  }
};


