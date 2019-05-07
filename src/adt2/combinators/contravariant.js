const daggy = require('daggy');
const {foldMap} = require('pointfree-fantasy')
const {concat, toUpper, prop, identity, range, compose} = require('ramda');