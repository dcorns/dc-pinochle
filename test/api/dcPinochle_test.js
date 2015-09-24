/**
 * dcPinochle_test
 * Created by dcorns on 9/23/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var expect = require('chai').expect;
describe('Game setup', function(){
  var dcPinochle;
  beforeEach(function(){
    dcPinochle = require('../../api/js/dcPinochle');
  });
  it('provides a method for creating a game object', function(){
    var play = dcPinochle.startHand(5);
    console.dir(play);
    expect(play.player1.id).to.be.eq(1);
  })
});