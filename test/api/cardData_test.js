/**
 * cardData_test
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Card construction test
 */
'use strict';
var expect = require('chai').expect;

describe('meld points',function(){
  var Meld;
  beforeEach(function(){
    Meld = require('../../app/js/cardData');
  });
  it('Meld is a constructor function', function(){
    expect(typeof Meld).to.be.eq('function');
  });
  it('has 4 point base for Jacks around', function(){
    var meld = new Meld([]);
    expect(meld.jacksAround.basePoints).to.be.eq(4);
  });
  it('scores jacks around', function(){
    var meld = new Meld([1,21,41,61]);
    console.dir(meld);
    meld.recordArounds(1);
    expect(meld.jacksAround.points).to.be.eq(4);
  });
  it('scores double jacks around', function(){
    var hand = [1, 6, 21, 26, 41, 46, 61, 66],
      meld = cardData.scoreAround(hand, 1, cardData.jacksAround.points);
    expect(meld).to.be.eq(40);
  });
  it('has 6 point base for Queens around', function(){
    expect(cardData.queensAround.points).to.be.eq(6);
  });
  it('scores queens around', function(){
    var hand = [2,22,42,62],
      meld = cardData.scoreAround(hand, 2, cardData.queensAround.points);
    expect(meld).to.be.eq(6);
  });
  it('scores double queens around', function(){
    var hand = [2, 7, 22, 27, 42, 47, 62, 67],
      meld = cardData.scoreAround(hand, 2, cardData.queensAround.points);
    expect(meld).to.be.eq(60);
  });
  it('has 8 point base for Kings around', function(){
    expect(cardData.kingsAround.points).to.be.eq(8);
  });
  it('scores kings around', function(){
    var hand = [3,23,43,63],
      meld = cardData.scoreAround(hand, 3, cardData.kingsAround.points);
    expect(meld).to.be.eq(8);
  });
  it('scores double kings around', function(){
    var hand = [3, 8, 23, 28, 43, 48, 63, 68],
      meld = cardData.scoreAround(hand, 3, cardData.kingsAround.points);
    expect(meld).to.be.eq(80);
  });
  it('has 10 point base for Aces around', function(){
    expect(cardData.acesAround.points).to.be.eq(10);
  });
  it('scores aces around', function(){
    var hand = [5,25,45,65],
      meld = cardData.scoreAround(hand, 5, cardData.acesAround.points);
    expect(meld).to.be.eq(10);
  });
  it('scores double aces around', function(){
    var hand = [5, 10, 25, 30, 45, 50, 65, 70],
      meld = cardData.scoreAround(hand, 5, cardData.acesAround.points);
    expect(meld).to.be.eq(100);
  });
  it('has 4 point base for pinochle', function(){
    expect(cardData.pinochle.points).to.be.eq(4);
  });
  it('has 2 point base for marriage', function(){
    expect(cardData.marriage.points).to.be.eq(2);
  });
  it('has 30 point base for double pinochle', function(){
    expect(cardData.pinochle2.points).to.be.eq(30);
  });
  it('has 90 point base for triple pinochle', function(){
    expect(cardData.pinochle3.points).to.be.eq(90);
  });
  it('has 500 point base for quad pinochle', function(){
    expect(cardData.pinochle4.points).to.be.eq(500);
  });
  it('has 24 point base for round robin', function(){
    expect(cardData.roundRobin.points).to.be.eq(24);
  });
  it('has a 15 point base for simple run', function(){
    expect(cardData.runn.points).to.be.eq(15);
  });
});