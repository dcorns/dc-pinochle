/**
 * dcPinochle
 * Created by dcorns on 9/11/15
 * @author Copyright © 2015 Dale Corns
 * @fileOverview An online Pinochle game for 4 players
 */
'use strict';
/**
 *
 * @type {{startRound: Function, shuffle: Function, deal: Function}|exports|module.exports}
 */
var nuts = require('./nuts'),
  CardData = require('./cardData'),
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
 */
players = nuts.startRound(players, 5);
/**
 *
 */
console.dir(players.player1.hand);
/**
 *
 * @type {Meld|exports|module.exports}
 */
players.player1.meld = new CardData(players.player1.hand);
players.player2.meld = new CardData(players.player2.hand);
players.player3.meld = new CardData(players.player3.hand);
players.player4.meld = new CardData(players.player4.hand);
/**
 *
 */
players.player1.meld.calculateMeld();
players.player2.meld.calculateMeld();
players.player3.meld.calculateMeld();
players.player4.meld.calculateMeld();
console.dir(players.player1);
console.dir(players.player2);
console.dir(players.player3);
console.dir(players.player4);

