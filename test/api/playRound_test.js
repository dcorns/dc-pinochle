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
  var nuts;
  before(function(){
    nuts = require('../../api/js/nuts');
  });
  it('validates the card', function(){
    var valid = nuts.validateCard([3, 5, 24, 16], 4);
    expect(valid).false;
    valid = nuts.validateCard([3, 5, 24, 16], 5);
    expect(valid).true;
  });
  it('gets a card\'s rank', function(){
    var c = 0, numberofCards = 80, numberOfCardRanks = 5, rank;
    for(c; c < numberofCards - numberOfCardRanks; c+=numberOfCardRanks){
      rank = nuts.getCardRank(1 + c);
      expect(rank).to.be.eq(1);
      rank = nuts.getCardRank(2 + c);
      expect(rank).to.be.eq(2);
      rank = nuts.getCardRank(3 + c);
      expect(rank).to.be.eq(3);
      rank = nuts.getCardRank(4 + c);
      expect(rank).to.be.eq(4);
      rank = nuts.getCardRank(5 + c);
      expect(rank).to.be.eq(5);
    }
  });
  it('validates the player', function(){
    var player1 = {dealPos: 4}, player2 = {dealPos: 1}, player3 = {dealPos: 2}, player4 = {dealPos: 3};
    var valid = nuts.validatePlayer(player1);
    expect(valid).false;
    var valid = nuts.validatePlayer(player2);
    expect(valid).true;
    var valid = nuts.validatePlayer(player3);
    expect(valid).false;
    var valid = nuts.validatePlayer(player4);
    expect(valid).false;
    nuts.currentCards.push({});
    var valid = nuts.validatePlayer(player1);
    expect(valid).false;
    var valid = nuts.validatePlayer(player2);
    expect(valid).false;
    var valid = nuts.validatePlayer(player3);
    expect(valid).true;
    var valid = nuts.validatePlayer(player4);
    expect(valid).false;
    nuts.currentCards.push({});
    var valid = nuts.validatePlayer(player1);
    expect(valid).false;
    var valid = nuts.validatePlayer(player2);
    expect(valid).false;
    var valid = nuts.validatePlayer(player3);
    expect(valid).false;
    var valid = nuts.validatePlayer(player4);
    expect(valid).true;
    nuts.currentCards.push({});
    var valid = nuts.validatePlayer(player1);
    expect(valid).true;
    var valid = nuts.validatePlayer(player2);
    expect(valid).false;
    var valid = nuts.validatePlayer(player3);
    expect(valid).false;
    var valid = nuts.validatePlayer(player4);
    expect(valid).false;
  });
  it('gets the card suite', function(){
    var c = 1, suite;
    for(c; c < 21; c++){
      suite = nuts.getCardSuite(c);
      expect(suite).to.be.eq(1);
    }
    for(c; c < 41; c++){
      suite = nuts.getCardSuite(c);
      expect(suite).to.be.eq(2);
    }
    for(c; c < 61; c++){
      suite = nuts.getCardSuite(c);
      expect(suite).to.be.eq(3);
    }
    for(c; c < 81; c++){
      suite = nuts.getCardSuite(c);
      expect(suite).to.be.eq(4);
    }
  });
  it('ranks a card against previous cards played in the round', function(){
    var cardPlayed = {rank: 1}, cardsLaid = [{},{},{}], win, c = 1, len = 6;
    for(c; c < len; c++){
      cardsLaid[0].rank = c; cardsLaid[1].rank = c; cardsLaid[2].rank = c;
      win = nuts.rankPlay(cardPlayed, cardsLaid);
      expect(win).false;
    }
    c = 0; cardPlayed.rank = 2;
    for(c; c < len; c++){
      cardsLaid[0].rank = c; cardsLaid[1].rank = c; cardsLaid[2].rank = c;
      win = nuts.rankPlay(cardPlayed, cardsLaid);
      if(cardsLaid[0].rank < 2) expect(win).true;
      else expect(win).false;
    }
    c = 0; cardPlayed.rank = 3;
    for(c; c < len; c++){
      cardsLaid[0].rank = c; cardsLaid[1].rank = c; cardsLaid[2].rank = c;
      win = nuts.rankPlay(cardPlayed, cardsLaid);
      if(cardsLaid[0].rank < 3) expect(win).true;
      else expect(win).false;
    }
    c = 0; cardPlayed.rank = 4;
    for(c; c < len; c++){
      cardsLaid[0].rank = c; cardsLaid[1].rank = c; cardsLaid[2].rank = c;
      win = nuts.rankPlay(cardPlayed, cardsLaid);
      if(cardsLaid[0].rank < 4) expect(win).true;
      else expect(win).false;
    }
    c = 0; cardPlayed.rank = 5;
    for(c; c < len; c++){
      cardsLaid[0].rank = c; cardsLaid[1].rank = c; cardsLaid[2].rank = c;
      win = nuts.rankPlay(cardPlayed, cardsLaid);
      if(cardsLaid[0].rank < 5) expect(win).true;
      else expect(win).false;
    }
  });
  it('creates a played card object', function(){
    var player = {id: 1}, cardplayed = 4;
    var card = nuts.makeCardDetails(player, cardplayed);
    expect(card.cardId).to.be.eq(4);
    expect(card.playedBy).to.be.eq(player.id);
    expect(card.suite).to.be.eq(1);
    expect(card.rank).to.be.eq(4);
  });
  it('records player renig for not beating the high card', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [{cardId: 1, playedBy: 2, team: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, team: 1, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3};
    nuts.takeTurn(player, 2);
    expect(nuts.renigs.length).to.be.eq(1);
  });
  it('records player renig for playing trump while having lead suite in hand', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [{cardId: 1, playedBy: 2, team: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, team: 1, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3};
    nuts.trump = 4;
    nuts.renigs = [];
    nuts.takeTurn(player, 80);
    expect(nuts.renigs.length).to.be.eq(1);
  });
  it('records player renig for playing another suite besides the lead when has trump', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [{cardId: 1, playedBy: 2, team: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, team: 1, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3};
    nuts.trump = 4;
    nuts.renigs = [];
    nuts.takeTurn(player, 24);
    expect(nuts.renigs.length).to.be.eq(1);
  });
  it('records a renig for over trumping while having the lead suite', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [{cardId: 1, playedBy: 2, team: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, team: 1, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, team: 2, suite: 4, rank: 3};
    nuts.trump = 4;
    nuts.renigs = [];
    nuts.takeTurn(player, 80);
    expect(nuts.renigs.length).to.be.eq(1);
  });
  it('does not record renig when card played is in correct suite', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [{cardId: 1, playedBy: 2, team: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, team: 1, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, team: 2, suite: 1, rank: 3};
    nuts.trump = 4;
    nuts.renigs = [];
    nuts.takeTurn(player, 5);
    expect(nuts.renigs.length).to.be.eq(0);
    player = {id: 1, hand:[2,3,6,5,32,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.takeTurn(player, 12);
    expect(nuts.renigs.length).to.be.eq(0);
  });
  it('does not record renig when trump in played is in correctly', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [{cardId: 1, playedBy: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, suite: 1, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, suite: 4, rank: 3};
    nuts.trump = 4;
    nuts.renigs = [];
    nuts.takeTurn(player, 5);
    expect(nuts.renigs.length).to.be.eq(0);
    player = {id: 1, hand:[42,43,46,45,32,52,44,24,53,76,50,63,67,80,33,22,61,37,59,68], dealPos: 4};
    nuts.currentWinner = {cardId: 3, playedBy: 4, suite: 1, rank: 3};
    nuts.currentCards = [{cardId: 1, playedBy: 2, suite: 1, rank: 1}];
    nuts.takeTurn(player, 80);
    expect(nuts.renigs.length).to.be.eq(0);
  });
  it('adds played card to current cards', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [];
    nuts.currentWinner = {};
    nuts.takeTurn(player, 5);
    expect(nuts.currentCards.length).to.be.eq(1);
  });
  it('removes played card from player hand', function(){
    var player = {id: 1, hand:[2,4,6,5,9,12,44,24,13,76,50,23,7,80,33,22,11,37,19,8], dealPos: 4};
    nuts.currentCards = [];
    nuts.currentWinner = {};
    nuts.takeTurn(player, 44);
    expect(player.hand.indexOf(44)).to.be.eq(-1);
    expect(player.hand.length).to.be.eq(19);
  });
  it('scores the round', function(){
    nuts.currentCards = [{cardId: 1, playedBy: 2, suite: 1, rank: 1}, {cardId: 2, playedBy: 3, suite: 1, rank: 2}, {cardId: 3, playedBy: 4, suite: 1, rank: 3}, {cardId: 3, playedBy: 4, suite: 4, rank: 3}];
    nuts.currentWinner = {cardId: 3, playedBy: 4, suite: 4, rank: 3};
    nuts.teamTwoTricks.points = 0;
    nuts.teamTwoTricks.tricks = [];
    nuts.scoreRound();
    expect(nuts.teamTwoTricks.points).to.be.eq(2);
    expect(nuts.teamTwoTricks.tricks.length).to.be.eq(1);
    expect(nuts.teamTwoTricks.tricks[0].length).to.be.eq(4);
  });
  it('resets the currentCards array after scoring', function(){
    expect(nuts.currentCards.length).to.be.eq(0);
  });
});
