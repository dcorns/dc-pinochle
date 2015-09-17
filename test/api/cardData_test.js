/**
 * cardData_test
 * Created by dcorns on 9/13/15
 * Copyright © 2015 Dale Corns
 * Card construction test
 */
'use strict';
var expect = require('chai').expect;

describe('meld points for arounds',function() {
  var Meld;
  beforeEach(function () {
    Meld = require('../../api/js/cardData');
  });
  it('Meld is a constructor function', function () {
    expect(typeof Meld).to.be.eq('function');
  });
  it('has 4 point base for Jacks around', function () {
    var meld = new Meld([]);
    expect(meld.jacksAround.basePoints).to.be.eq(4);
  });
  it('scores jacks around', function () {
    var meld = new Meld([1, 21, 41, 61]);
    meld.recordArounds(meld.jacksAround);
    expect(meld.jacksAround.points).to.be.eq(4);
  });
  it('scores double jacks around', function () {
    var meld = new Meld([1, 6, 21, 26, 41, 46, 61, 66]);
    meld.recordArounds(meld.jacksAround);
    expect(meld.jacksAround.points).to.be.eq(40);
  });
  it('scores triple jacks around', function () {
    var meld = new Meld([1, 6, 11, 21, 26, 31, 41, 46, 51, 61, 66, 71]);
    meld.recordArounds(meld.jacksAround);
    expect(meld.jacksAround.points).to.be.eq(44);
  });
  it('scores quad jacks around', function () {
    var meld = new Meld([1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 76]);
    meld.recordArounds(meld.jacksAround);
    expect(meld.jacksAround.points).to.be.eq(80);
  });
  it('has 6 point base for Queens around', function () {
    var meld = new Meld([]);
    expect(meld.queensAround.basePoints).to.be.eq(6);
  });
  it('scores Queens around', function () {
    var meld = new Meld([2, 22, 42, 62]);
    meld.recordArounds(meld.queensAround);
    expect(meld.queensAround.points).to.be.eq(6);
  });
  it('scores double Queens around', function () {
    var meld = new Meld([2, 7, 22, 27, 42, 47, 62, 67]);
    meld.recordArounds(meld.queensAround);
    expect(meld.queensAround.points).to.be.eq(60);
  });
  it('scores triple Queens around', function () {
    var meld = new Meld([2, 7, 12, 22, 27, 32, 42, 47, 52, 62, 67, 72]);
    meld.recordArounds(meld.queensAround);
    expect(meld.queensAround.points).to.be.eq(66);
  });
  it('scores quad Queens around', function () {
    var meld = new Meld([2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67, 72, 77]);
    meld.recordArounds(meld.queensAround);
    expect(meld.queensAround.points).to.be.eq(120);
  });
  it('has 8 point base for Kings around', function () {
    var meld = new Meld([]);
    expect(meld.kingsAround.basePoints).to.be.eq(8);
  });
  it('scores Kings around', function () {
    var meld = new Meld([3, 23, 43, 63]);
    meld.recordArounds(meld.kingsAround);
    expect(meld.kingsAround.points).to.be.eq(8);
  });
  it('scores double Kings around', function () {
    var meld = new Meld([3, 8, 23, 28, 43, 48, 63, 68]);
    meld.recordArounds(meld.kingsAround);
    expect(meld.kingsAround.points).to.be.eq(80);
  });
  it('scores triple Kings around', function () {
    var meld = new Meld([3, 8, 13, 23, 28, 33, 43, 48, 53, 63, 68, 73]);
    meld.recordArounds(meld.kingsAround);
    expect(meld.kingsAround.points).to.be.eq(88);
  });
  it('scores quad Kings around', function () {
    var meld = new Meld([3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 68, 73, 78]);
    meld.recordArounds(meld.kingsAround);
    expect(meld.kingsAround.points).to.be.eq(160);
  });
  it('has 10 point base for Aces around', function () {
    var meld = new Meld([]);
    expect(meld.acesAround.basePoints).to.be.eq(10);
  });
  it('scores Aces around', function () {
    var meld = new Meld([5, 25, 45, 65]);
    meld.recordArounds(meld.acesAround);
    expect(meld.acesAround.points).to.be.eq(10);
  });
  it('scores double Aces around', function () {
    var meld = new Meld([5, 10, 25, 30, 45, 50, 65, 70]);
    meld.recordArounds(meld.acesAround);
    expect(meld.acesAround.points).to.be.eq(100);
  });
  it('scores triple Aces around', function () {
    var meld = new Meld([5, 10, 15, 25, 30, 35, 45, 50, 55, 65, 70, 75]);
    meld.recordArounds(meld.acesAround);
    expect(meld.acesAround.points).to.be.eq(110);
  });
  it('scores quad Aces around', function () {
    var meld = new Meld([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
    meld.recordArounds(meld.acesAround);
    expect(meld.acesAround.points).to.be.eq(200);
  });
});
describe('Other meld points', function(){
  var Meld;
  beforeEach(function(){
    Meld = require('../../api/js/cardData');
  });
  it('has 4 point base for pinochle', function(){
    var meld = new Meld([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]);
    meld.calculateMeld();
    expect(meld.pinochle.basePoints).to.be.eq(4);
  });
  it('scores 4 points for double pinochle', function(){
    var meld = new Meld([1,2,3,4,5,7,8,9,10,12,13,14,15,17,18,19,20,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]);
    meld.calculateMeld();
    expect(meld.pinochle.points).to.be.eq(4);
  });
  it('scores 40 points for double pinochle', function(){
    var meld = new Meld([1,2,3,4,5,6,7,8,9,10,12,13,14,15,17,18,19,20,41,42,43,44,45,46,47,48,49,50,51,53,54,55,56,58,59,60]);
    meld.calculateMeld();
    expect(meld.pinochle.points).to.be.eq(40);
  });
  it('scores 90 points for triple pinochle', function(){
    var meld = new Meld([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,41,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]);
    meld.calculateMeld();
    expect(meld.pinochle.points).to.be.eq(90);
  });
  it('scores 500 points (game) for double pinochle', function(){
    var meld = new Meld([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]);
    meld.calculateMeld();
    expect(meld.pinochle.points).to.be.eq(500);
  });
  it('has 2 point base for marriage', function(){
    var meld = new Meld([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]);
    meld.calculateMeld();
    expect(meld.marriage.basePoints).to.be.eq(2);
  });
  it('scores 2 points for marriage', function(){
    var meld = new Meld([2, 3]);
    meld.recordMarriages();
    expect(meld.marriage.points).to.be.eq(2);
  });
  it('has 15 point base for run', function(){
    var meld = new Meld([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]);
    expect(meld.runn.basePoints).to.be.eq(15);
  });
});