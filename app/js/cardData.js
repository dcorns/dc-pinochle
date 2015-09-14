/**
 * cardData
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var cardData = {};
cardData.cardKey = [];
var c = 0,
  r = 1;

while(c < 20){
  if(r === 6) r = 1;
  cardData.cardKey[c] = {suite: 1, rank: r};
  cardData.cardKey[c+20] = {suite: 2, rank: r};
  cardData.cardKey[c+40] = {suite: 3, rank: r};
  cardData.cardKey[c+60] = {suite: 4, rank: r};
  c++;
  r++;
}

cardData.meldPoints = {
  jacksAround: 4,
  queensAround: 6,
  kingsAround: 8,
  acesAround: 10,
  pinochle: 4,
  pinochle2: 30,
  pinochle3: 90,
  pinochle4: 500,
  marriage: 2,
  roundRobin: 24,
  run: 15
};
module.exports = cardData;
