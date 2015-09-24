/**
 * playPinochle
 * Created by dcorns on 9/23/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var dcPinochle = require('./api/js/dcPinochle');

dcPinochle.startHand(5, 34);

dcPinochle.playCard(1, 23);
console.dir(dcPinochle.getCurrentCards());

