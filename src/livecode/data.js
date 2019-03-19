const {test} = require('ramda');

module.exports = [
    ['Diners - Carte Blanche|diners', test(/^30[0-5]/)],
    ['Diners|diners', test(/^(30[6-9]|36|38)/)],
    ['JCB|jcb', test(/^32(2[89]|[3-8][0-9])/)],
    ['AMEX|american-express', test(/^3[47]/)],
    ['Visa Electron|visa', test(/^(4026|417500|4508|4844|491(3|7))/)]
]