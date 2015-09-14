/**
 * dcPinochle
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * An online Pinochle game for 4 players
 */
'use strict';

var nuts = require('./nuts'),
  cardData = require('./cardData'),
  players = {
    player1: {
      name:'',
      hand:[],
      dealPos: 4,
      meld: 0
    },
    player2: {
      name:'',
      hand:[],
      dealPos: 1,
      meld: 0
    },
    player3: {
      name:'',
      hand:[],
      dealPos: 2,
      meld: 0
    },
    player4: {
      name:'',
      hand:[],
      dealPos: 3,
      meld: 0
    }
  };
players = nuts.startRound(players, 5);

console.log(cardData.cardKey);