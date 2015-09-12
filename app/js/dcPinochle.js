/**
 * dcPinochle
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * An online Pinochle game for 4 players
 */
'use strict';

var nuts = require('./nuts'),
  players = {
    player1: {
      name:'',
      hand:[],
      dealer: true
    },
    player2: {
      name:'',
      hand:[],
      dealer: false
    },
    player3: {
      name:'',
      hand:[],
      dealer: false
    },
    player4: {
      name:'',
      hand:[],
      dealer: false
    }
  };
players = nuts.startRound(players, 5);
console.log(players);