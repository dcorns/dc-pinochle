/**
 * cardData_test
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Card construction test
 */
'use strict';
var expect = require('chai').expect;
describe('Build Card Object array', function(){
  var cards;
  beforeEach(function(){
    cards = require('../../app/js/cardData');
  });
  it('returns an array of 80 card objects', function(){
    expect(Array.isArray(cards)).true;
    expect(cards.length).to.be.eq(80);
    expect(function(){
      var c = 0;
      for(c; c < 80; c++){
        if(!(cards[c].hasOwnProperty('suite'))) return false;
        if(!(cards[c].hasOwnProperty('rank'))) return false;
      }
      return true;
    }()).true;
  });
});

describe('Card Objects', function(){
  var cards;
  beforeEach(function(){
    cards = require('../../app/js/cardData');
  });
  it('has 4 suites of 20 cards each', function(){
    expect(function(){
      var c = 0;
      for(c; c < 20; c++){
        if(!(cards[c].suite === 1)) return false;//spades
        if(!(cards[c + 20].suite === 2)) return false;//clubs
        if(!(cards[c + 40].suite === 3)) return false;//hearts
        if(!(cards[c + 60].suite === 4)) return false;//diamonds
      }
      return true;
    }()).true;
  });
  it('has rank from 1 - 20 for each suite', function(){
    expect(function(){
      var c = 0;
      for(c; c < 20; c++){
        if(!(cards[c].rank === c + 1)) return false;
        if(!(cards[c + 20].rank === c + 1)) return false;
        if(!(cards[c + 40].rank === c + 1)) return false;
        if(!(cards[c + 60].rank === c + 1)) return false;
      }
      return true;
    }()).true;
  })
});