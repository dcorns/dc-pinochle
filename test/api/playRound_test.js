/**
 * deal_test
 * Created by dcorns on 9/11/15
 * Copyright © 2015 Dale Corns
 * Card distribution test
 */
'use strict';
var expect = require('chai').expect;

describe('Play a round of Pinochle', function() {
  var nuts;
  beforeEach(function(){
    nuts = require('../../api/js/nuts');
  });
  it('requires an integer between 1 and 20 for deal rotation', function () {
    expect(function(){nuts.startRound({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}, player4:{name:'Irma', hand: []} },-1)}).to.throw('deal integer must be less than 20 and greater than 0', 'nuts.js', 12);
    expect(function(){
      nuts.startRound({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}, player4:{name:'Irma', hand: []} }, 21);
  }).to.throw('deal integer must be less than 20 and greater than 0', 'nuts.js', 12);
  });
  it('requires an object with player1, player2, player3, player4', function(){
    expect(nuts.startRound).to.throw('a player object is required', 'nuts.js', 10);
    expect(function(){
      nuts.startRound({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}, player4:{name:'Irma', hand: []} });
    }).not.to.throw('player object must have 4 player properties, each with a name and hand property');
    expect(function(){
      nuts.startRound({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}, player3:{name:'Lisa', hand: []}});
    }).to.throw('player object requires a player4 property');
    expect(function(){
      nuts.startRound({player1:{name:'Dale', hand: []}, player2:{name:'Norm', hand: []}});
    }).to.throw('player object requires a player3 property');
    expect(function(){
      nuts.startRound({player1:{name:'Dale', hand: []}});
    }).to.throw('player object requires a player2 property');
    expect(function(){
      nuts.startRound({player2:{name:'Dale', hand: []}, player3:{name:'Norm', hand: []}, player4:{name:'Lisa', hand: []}});
    }).to.throw('player object requires a player1 property');
  });
});

describe('Shuffle-makeDeck', function(){
  var nuts;
  var deck;
  beforeEach(function(){
    nuts = require('../../api/js/nuts');
    deck = nuts.shuffle();
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

describe('Deal the Cards', function(){
  var deck,
    players,
    nuts;
  beforeEach(function(){
    nuts = require('../../api/js/nuts');
    deck = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4];
    players = {
      player1: {
        name:'',
        hand:[],
        dealPos: 4
      },
      player2: {
        name:'',
        hand:[],
        dealPos: 1
      },
      player3: {
        name:'',
        hand:[],
        dealPos: 2
      },
      player4: {
        name:'',
        hand:[],
        dealPos: 3
      }
    };
    players = nuts.deal(deck, 5, players);
  });
  it('deals to player with dealPos = 1 first', function(){
    expect(players.player2.hand[0]).to.be.eq(1);
  });
  it('deals each player 20 cards', function(){
    expect(players.player1.hand.length).to.be.eq(20);
    expect(players.player2.hand.length).to.be.eq(20);
    expect(players.player3.hand.length).to.be.eq(20);
    expect(players.player4.hand.length).to.be.eq(20);
  });
  it('deals dealInt cards at a time', function(){
    expect(function(){
      return players.player1.hand.reduce(function(p, c){
        return p === c ? c: c + p;
      }, 4);
    }()).to.be.eq(4);
    expect(function(){
      return players.player2.hand.reduce(function(p, c){
        return p === c ? c: c + p;
      }, 1);
    }()).to.be.eq(1);
    expect(function(){
     return players.player3.hand.reduce(function(p, c){
        return p === c ? c: c + p;
      }, 2);
    }()).to.be.eq(2);
    expect(function(){
     return players.player4.hand.reduce(function(p, c){
        return p === c ? c: c + p;
      }, 3);
    }()).to.be.eq(3);
  });
});

describe('Cut the Cards', function(){
  var nuts = require('../../api/js/nuts');
  it('has a cut method', function(){
    expect(nuts.cut).to.be.a('function');
  });
  it('cuts the cards at the cutpoint', function(){
    var cutDeck = nuts.cut([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],58);
    expect(cutDeck[0]).to.be.eq(59);
  });
});

describe('Player Turns', function(){

});
