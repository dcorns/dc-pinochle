/**
 * cardData
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Define points and scoring card structures
 * Cards are two pinochle decks without nines. 1 - 80 represent all cards like so (jack-Ace) * 4 in spades followed by clubs, diamonds and hearts
 */
'use strict';

function Meld(hand){
  this.hand = hand;
  this.len = hand.length;
  this.totalMeld = 0;
  this.jacksAround = {baseInt: 1, basePoints: 4, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.queensAround = {baseInt: 2, basePoints: 6, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.kingsAround = {baseInt: 3, basePoints: 8, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.tensAround = {baseInt: 4, basePoints: 0, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.acesAround = {baseInt: 5, basePoints: 10, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.pinochle = {basePoints: 4, points: 0, cards:{
    spades: [],
    diamonds: []
  }};
  this.marriage = {basePoints: 2, points: {
    spades: 0,
    clubs: 0,
    diamonds: 0,
    hearts: 0
  }, cards:{
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
  this.runn = {
    basePoints: 15,
    points: {
    spades: 0,
    clubs: 0,
    diamonds: 0,
    hearts: 0
  },
    cards:{
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }

  };
  this.roundRobin = {basePoints: 24, points: 0, cards: {
    spades: [],
    clubs: [],
    diamonds: [],
    hearts: []
  }};
}
Meld.prototype.recordArounds = function(meldObj, hand){
  var c = 0,
    spadeCount = 0,
    clubCount = 0,
    diamondCount = 0,
    heartCount = 0;
  hand = hand || this.hand;
  for(c; c < this.len; c++){
    if(hand[c] === meldObj.baseInt || hand[c] === meldObj.baseInt + 5 || hand[c] === meldObj.baseInt + 10 || hand[c] === meldObj.baseInt + 15){
      spadeCount ++;
      meldObj.cards.spades.push(hand[c]);
    }
    else if (hand[c] === meldObj.baseInt + 20 || hand[c] === meldObj.baseInt + 25 || hand[c] === meldObj.baseInt + 30 || hand[c] === meldObj.baseInt + 35){
      clubCount++;
      meldObj.cards.clubs.push(this.hand[c]);
    }
    else if (hand[c] === meldObj.baseInt + 40 || hand[c] === meldObj.baseInt + 45 || hand[c] === meldObj.baseInt + 50 || hand[c] === meldObj.baseInt + 55){
      diamondCount++;
      meldObj.cards.diamonds.push(this.hand[c]);
    }
    else if (hand[c] === meldObj.baseInt + 60 || hand[c] === meldObj.baseInt + 65 || hand[c] === meldObj.baseInt + 70 || hand[c] === meldObj.baseInt + 75){
      heartCount++;
      meldObj.cards.hearts.push(this.hand[c]);
    }
  }
  if(spadeCount > 0 && clubCount > 0 && diamondCount > 0 && heartCount > 0){
    meldObj.points = meldObj.basePoints;
    if(spadeCount > 1 && clubCount > 1 && diamondCount > 1 && heartCount > 1){
      meldObj.points = meldObj.basePoints * 10;
      if(spadeCount > 2 && clubCount > 2 && diamondCount > 2 && heartCount > 2){
        meldObj.points = meldObj.basePoints * 10 + meldObj.basePoints;
        if(spadeCount > 3 && clubCount > 3 && diamondCount > 3 && heartCount > 3){
          meldObj.points = meldObj.basePoints * 20;
        }
      }
    }
  }
  return meldObj;
};

Meld.prototype.calculateMeld = function(){
  var result;
  result = this.recordArounds(this.jacksAround, this.hand);
  var jacks = result.cards;
  result = this.recordArounds(this.queensAround, this.hand);
  var queens = result.cards;
  result = this.recordArounds(this.kingsAround, this.hand);
  var kings = result.cards;
  result = this.recordArounds(this.tensAround);
  var tens = result.cards;
  result = this.recordArounds(this.acesAround);
  var aces = result.cards;
  this.recordRunsAndMarriages(jacks, queens, kings, tens, aces, this.runn, this.marriage, this.roundRobin);
  this.recordPinochles(jacks.diamonds, queens.spades, this.pinochle);
};

Meld.prototype.recordRunsAndMarriages = function(jacks, queens, kings, tens, aces, runs, marriages, roundRobin){
  var result = this.runAndMarriagesBySuite(jacks.spades, queens.spades, kings.spades, tens.spades, aces.spades, runs.basePoints, marriages.basePoints);
  runs.points.spades = result.runPoints; runs.cards.spades = result.runCards;
  marriages.points.spades = result.marriagePoints; marriages.cards.spades = result.marriageCards;
  result = this.runAndMarriagesBySuite(jacks.clubs, queens.clubs, kings.clubs, tens.clubs, aces.clubs, runs.basePoints, marriages.basePoints);
  runs.points.clubs = result.runPoints; runs.cards.clubs = result.runCards;
  marriages.points.clubs = result.marriagePoints; marriages.cards.clubs = result.marriageCards;
  result = this.runAndMarriagesBySuite(jacks.diamonds, queens.diamonds, kings.diamonds, tens.diamonds, aces.diamonds, runs.basePoints, marriages.basePoints);
  runs.points.diamonds = result.runPoints; runs.cards.diamonds = result.runCards;
  marriages.points.diamonds = result.marriagePoints; marriages.cards.diamonds = result.marriageCards;
  result = this.runAndMarriagesBySuite(jacks.hearts, queens.hearts, kings.hearts, tens.hearts, aces.hearts, runs.basePoints, marriages.basePoints);
  marriages.points.hearts = result.marriagePoints; marriages.cards.hearts = result.marriageCards;
  runs.points.hearts = result.runPoints; runs.cards.hearts = result.runCards;
  //round robin check
  if(marriages.points.spades > marriages.basePoints - 1 && marriages.points.clubs > marriages.basePoints - 1 && marriages.points.diamonds > marriages.basePoints - 1 && marriages.points.hearts > marriages.basePoints - 1){
    roundRobin.points = roundRobin.basePoints;
    //add cards later maybe
    if(marriages.points.spades > marriages.basePoints * 2 - 1 && marriages.points.clubs > marriages.basePoints * 2 - 1 && marriages.points.diamonds > marriages.basePoints * 2 - 1 && marriages.points.hearts > marriages.basePoints * 2 - 1){
      roundRobin.points = roundRobin.basePoints * 2;
      if(marriages.points.spades > marriages.basePoints * 3 - 1 && marriages.points.clubs > marriages.basePoints * 3 - 1 && marriages.points.diamonds > marriages.basePoints * 3 - 1 && marriages.points.hearts > marriages.basePoints * 3 - 1){
        roundRobin.points = roundRobin.basePoints * 3;
        if(marriages.points.spades === marriages.basePoints * 4 && marriages.points.clubs === marriages.basePoints * 4 && marriages.points.diamonds === marriages.basePoints * 4 && marriages.points.hearts === marriages.basePoints * 4){
          roundRobin.points = roundRobin.basePoints * 4;
        }
      }

    }
  }
  console.log(this.runn.points);
};

Meld.prototype.runAndMarriagesBySuite = function(jacks, queens, kings, tens, aces, runBasePoints, marriageBasePoints){
  var runPoints = 0, mCards = [], mPoints = 0, rCards = [];
  mCards.concat(queens); mCards.concat(kings);
  rCards.concat(jacks); rCards.concat(mCards); rCards.concat(tens); rCards.concat(aces);
  if(queens.length > 0 && kings.length > 0){
    mPoints = marriageBasePoints;
    if(jacks.length > 0 && tens.length > 0 && aces.length > 0){
      runPoints = runBasePoints;
    }
  }else return {runPoints: runPoints, marriagePoints: mPoints, runCards: rCards, marriageCards: mCards};
  if(queens.length > 1 && kings.length > 1){
    mPoints = marriageBasePoints * 2;
    runPoints = runPoints + marriageBasePoints * 2;
    if(jacks.length > 1 && tens.length > 1 && aces.length > 1){
      runPoints = runBasePoints * 10;
    }
  }else return {runPoints: runPoints, marriagePoints: mPoints, runCards: rCards, marriageCards: mCards};
  if(queens.length > 2 && kings.length > 2){
    mPoints = marriageBasePoints * 3;
    runPoints = runPoints + marriageBasePoints * 2;
    if(jacks.length > 2 && tens.length > 2 && aces.length > 2){
      runPoints = runBasePoints * 10 + runBasePoints;
    }
  }else return {runPoints: runPoints, marriagePoints: mPoints, runCards: rCards, marriageCards: mCards};
  if(queens.length > 3 && kings.length > 3){
    mPoints = marriageBasePoints * 4;
    runPoints = runPoints + marriageBasePoints * 2;
    if(jacks.length > 3 && tens.length > 3 && aces.length > 3){
      runPoints = runBasePoints * 20; //and game since it would be impossible for the opposing team to score
    }
  }
  return {runPoints: runPoints, marriagePoints: mPoints, runCards: rCards, marriageCards: mCards};
};

Meld.prototype.recordPinochles = function(jacks, queens, pinochles){
  var diamonds = [], spades = [];
  if(jacks.length > 0 && queens.length > 0){
    var c = 0, len = jacks.length;
    for(c; c < len; c++){
      if(jacks[c] === 41 || jacks[c] === 46 || jacks[c] === 51 || jacks[c] === 56) diamonds.push(jacks[c]);
    }
    c = 0; len = queens.length;
    for(c; c < len; c++){
      if(queens[c] === 2 || queens[c] === 7 || queens[c] === 12 || queens[c] === 17) spades.push(queens[c]);
    }
  }
  pinochles.cards.diamonds = jacks; pinochles.cards.spades = queens;
  var dLen = diamonds.length, sLen = spades.length;
  if(dLen > 0 && sLen > 0){
    pinochles.points = 4;
    if(dLen > 1 && sLen > 1){
      pinochles.points = 30;
      if(dLen > 2 && sLen > 2){
        pinochles.points = 90;
        if(dLen > 3 && sLen > 3){
          pinochles.points = 500; //Quad nuts, Game over baby!
        }
      }
    }
  }
};

module.exports = Meld;