const Last = require('crocks/Last');
const Pair = require('crocks/Pair');

const assign = require('crocks/helpers/assign');
const chain = require('crocks/pointfree/chain');
const liftA2 = require('crocks/helpers/liftA2');
const map = require('crocks/pointfree/map');
const safe = require('crocks/Maybe/safe');
const isDefined = require('crocks/predicates/isDefined');
const reduce = require('crocks/pointfree/reduce')
const {getKey, putKey} = require('./helper');
const {pullRandom} = require('./randoState');

const suits = [
    { suit: '♠', color: 'dark' },
    { suit: '♣', color: 'dark' },
    { suit: '♥', color: 'light' },
    { suit: '♦', color: 'light' },
  ]

const values = [
    { value: 1, face: 'A' },
    { value: 2, face: '2' },
    { value: 3, face: '3' },
    { value: 4, face: '4' },
    { value: 5, face: '5' },
    { value: 6, face: '6' },
    { value: 7, face: '7' },
    { value: 8, face: '8' },
    { value: 9, face: '9' },
    { value: 10, face: '10' },
    { value: 11, face: 'J' },
    { value: 12, face: 'Q' },
    { value: 13, face: 'K' },
  ];

// limitTo :: Float -> Int -> Int
const limitTo = rn => limit => (rn * limit) | 0; // the same as Math.floor(rn * limit)
// isValid :: a -> Maybe a
const isValid = safe(isDefined);  

// displayCard :: Card -> String
const displayCard = ({face, suit}) =>
  `${face}${suit}`;
// displayCards :: [Card] -> [String]
const displayCards = map(displayCard);

// Deck :: Pair (Last Card) [Card]  
// deck :: Deck
const deck = Pair(Last.empty(), liftA2(assign, suits, values));
// emptyDeck :: () -> Deck
const emptyDeck = () => Pair(Last.empty(), []);
// getDeck : () -> State GameState Deck
const getDeck = getKey('deck', {deck: emptyDeck()});
// putDeck : () -> State GameState ()
const putDeck = putKey('deck');
// deckLength : Deck -> Int
const deckLength = deck => deck.snd().length;

// pickCard : [ Card ] -> Pair [Card][Card]
const pickCard = cs => {
  const idx = Math.floor(Math.random() * cs.length);

  return Pair(
      [].concat(cs[idx]),
      cs.slice(0, idx).concat(cs.slice(idx + 1))
  )
}
// Deck :: Pair (Last Card) [Card]
// drawCardAt : Int -> [Card] -> Deck
const drawCardAt = indx => deck => {
  return Pair(
      // Last can take Maybe or value in arguement, 
      // make it possible to control the code safety
      Last(isValid(deck[indx])),
      deck.slice(0, indx).concat(deck.slice(indx + 1))
  )
};
// getLength : () -> State GameState Int
const getLength = () => 
    getDeck()
        .map(deckLength);
// drawCard : Int -> State GameState
const drawCard = indx => 
    getDeck() // getDeck () -> State(Pair(Deck)) -map-> Pair(Deck) -chain-> Deck -> drawCardAt(ind) -> Pair(Deck) 
        .map(chain(drawCardAt(indx)))
        .chain(putDeck);
// limit :: Float -> State GameState Int
const limit = rn => getLength().map(limitTo(rn)); 
// pickRandom :: () -> State GameState Int        
const pickRandom = () => pullRandom().chain(limit).chain(drawCard);
// shuffleCards : [ Cards ] -> [ Cards ]
const shuffleCards = cards => reduce(
  chain(pickCard), Pair([], cards), cards
).fst();

module.exports = {
    deck,
    displayCard,
    displayCards,
    pickRandom
}