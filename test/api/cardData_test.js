/**
 * cardData_test
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Card construction test
 */
'use strict';
var expect = require('chai').expect;
describe('Build Card Object array called cardKey', function(){
  var cardData;
  beforeEach(function(){
    cardData = require('../../app/js/cardData');
  });
  it('returns an object with a cardKey property that is an array of 80 card objects', function(){
    expect(Array.isArray(cardData.cardKey)).true;
    expect(cardData.cardKey.length).to.be.eq(80);
    expect(function(){
      var c = 0;
      for(c; c < 80; c++){
        if(!(cardData.cardKey[c].hasOwnProperty('suite'))) return false;
        if(!(cardData.cardKey[c].hasOwnProperty('rank'))) return false;
      }
      return true;
    }()).true;
  });
});

describe('Card Objects', function(){
  var cardData;
  beforeEach(function(){
    cardData = require('../../app/js/cardData');
  });
  it('has 4 suites of 20 cards each', function(){
    expect(function(){
      var c = 0;
      for(c; c < 20; c++){
        if(!(cardData.cardKey[c].suite === 1)) return false;//spades
        if(!(cardData.cardKey[c + 20].suite === 2)) return false;//clubs
        if(!(cardData.cardKey[c + 40].suite === 3)) return false;//hearts
        if(!(cardData.cardKey[c + 60].suite === 4)) return false;//diamonds
      }
      return true;
    }()).true;
  });
  it('has rank from 1 - 5 * 4 for each suite', function(){
    expect(function(){
      var c = 0,
        r = 1;
      for(c; c < 20; c++){
        if(!(cardData.cardKey[c].rank === r)) return false;
        if(!(cardData.cardKey[c + 20].rank === r)) return false;
        if(!(cardData.cardKey[c + 40].rank === r)) return false;
        if(!(cardData.cardKey[c + 60].rank === r)) return false;
        r++;
        if(r === 6) r = 1;
      }
      return true;
    }()).true;
  });
});

describe('meld points',function(){
  var cardData;
  beforeEach(function(){
    cardData = require('../../app/js/cardData');
  });
  it('has a property call meldPoints', function(){
    expect(typeof cardData.meldPoints).to.be.eq('object');
  });
  it('has 4 point base for Jacks around', function(){
    expect(cardData.meldPoints.jacksAround).to.be.eq(4);
  });
  it('has 6 point base for Queens around', function(){
    expect(cardData.meldPoints.queensAround).to.be.eq(6);
  });
  it('has 8 point base for Kings around', function(){
    expect(cardData.meldPoints.kingsAround).to.be.eq(8);
  });
  it('has 10 point base for Aces around', function(){
    expect(cardData.meldPoints.acesAround).to.be.eq(10);
  });
  it('has 4 point base for pinochle', function(){
    expect(cardData.meldPoints.pinochle).to.be.eq(4);
  });
  it('has 2 point base for marriage', function(){
    expect(cardData.meldPoints.marriage).to.be.eq(2);
  });
  it('has 30 point base for double pinochle', function(){
    expect(cardData.meldPoints.pinochle2).to.be.eq(30);
  });
  it('has 90 point base for triple pinochle', function(){
    expect(cardData.meldPoints.pinochle3).to.be.eq(90);
  });
  it('has 500 point base for quad pinochle', function(){
    expect(cardData.meldPoints.pinochle4).to.be.eq(500);
  });
  it('has 24 point base for round robin', function(){
    expect(cardData.meldPoints.roundRobin).to.be.eq(24);
  });
  it('has a 15 point base for simple run', function(){
    expect(cardData.meldPoints.run).to.be.eq(15);
  });
});