/**
 * deal_test
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * Card distribution test
 */
'use strict';
var expect = require('chai').expect;

describe('Dealing', function() {
  var nuts;
  beforeEach(function(){
    nuts = require('../../app/js/nuts');
  });
  it('requires an integer between 1 and 20 for deal rotation', function () {
    expect(function(){nuts.deal({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}, player4:{name:'Irma', hand: []} },-1)}).to.throw('deal integer must be less than 20 and greater than 0', 'nuts.js', 12);
    expect(function(){
      nuts.deal({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}, player4:{name:'Irma', hand: []} }, 21);
  }).to.throw('deal integer must be less than 20 and greater than 0', 'nuts.js', 12);
  });
  it('requires an object with player1, player2, player3, player4', function(){
    expect(nuts.deal).to.throw('a player object is required', 'nuts.js', 10);
    expect(function(){
      nuts.deal({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}, player4:{name:'Irma', hand: []} });
    }).not.to.throw('player object must have 4 player properties, each with a name and hand property');
    expect(function(){
      nuts.deal({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}});
    }).to.throw('player object requires a player4 property');
    expect(function(){
      nuts.deal({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}});
    }).to.throw('player object requires a player3 property');
    expect(function(){
      nuts.deal({player1:{name:'Dale', hand: []}});
    }).to.throw('player object requires a player2 property');
    expect(function(){
      nuts.deal({player2:{name:'Dale', hand: []}, player3:{name:'Norm', hand: []}, player4:{name:'Lisa', hand: []}});
    }).to.throw('player object requires a player1 property');
  });
  it('selects 4 random groups of 20 cards, dealInteger cards at a time', function () {

  });
  it('returns an object containing card hands', function () {

  });
});

describe('Shuffle-makeDeck', function(){
  var nuts;
  var deck;
  beforeEach(function(){
    nuts = require('../../app/js/nuts');
    deck = nuts.makeDeck();
  });
  it('returns an array of integers from 1 to 80 in random order', function(){
    expect(Array.isArray(deck)).true;
    expect(deck.length).to.eq(80);
    //check all integers
    expect(function(){
      var c = 0,
        len = deck.length;
      for(c; c < len; c++){
        if(!(deck[c] === parseInt(deck[c], 10))) return false;
      }
      return true;
    }()).true;
    //check are random
    expect(function(){
      var matches = 0,
        c = 0,
      len = deck.length;
      for(c; c < len; c++){
        if((c + 1) === deck[c]) matches++;
      }
      return matches;
    }()).to.be.below(5);
    //check for 1-80
    expect(function(){
      var c = 1;
      while(c < 81){
        if(!(deck.indexOf(c) > -1)) return false;
        c++;
      }
      return true;
    }()).true;
  });
});