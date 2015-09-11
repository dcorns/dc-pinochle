/**
 * dcPinochle
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * An online Pinochle game for 4 players
 */
'use strict';

var nuts = require('./nuts');
var hands = nuts.deal({player1:{}, player2:{}, player3:{}, player4:{}});
console.log(hands);