// liftA2 :: Applicative m => (a -> b -> c) -> m a -> m b -> m c
// converge :: (b -> c -> d) -> (a -> b) -> (a -> c) -> a -> d
const {
  Pair,
  chain,
  bimap,
  constant,
  composeK,
  snd,
  compose,
  identity,
  option,
  fanout,
  curry,
  liftA2,
  converge,
  mreduce,
  Endo
} = require("crocks");
const {
  getState,
  getAt,
  unsetAt,
  liftState,
  repeat,
  over
} = require("../../helper");
const { randomIndex } = require("./random");

// getColors :: () -> State AppState [String]
const getColors = () => getState("colors").map(option([]));

// getShapes :: () -> State AppState [String]
const getShapes = () => getState("shapes").map(option([]));

// buildCard :: String -> String -> Card
const buildCard = curry((color, shape) => ({
  id: `${color}-${shape}`,
  color,
  shape
}));

// buildCards :: [String] -> [String] -> [Card]
const buildCards = liftA2(buildCard);

// generateCards :: () -> State AppState [ Card ]
const generateCards = converge(liftA2(buildCards), getColors, getShapes);

// Deck :: Pair [Card] [Card]

// drawCardAt :: Number -> [a] -> [a]
const drawCardAt = index =>
  compose(
    bimap(Array.of, identity),
    fanout(getAt(index), unsetAt(index))
  );

// Deck :: Pair [Card] [Card]

// getDeck :: () -> State AppState Deck
const getDeck = () => generateCards().map(xs => Pair([], xs));

// draw :: Integer -> Deck ->Deck
const draw = compose(
  chain,
  drawCardAt
);

// drawRandom :: Deck -> State AppState Deck
const drawRandom = converge(
  liftA2(draw),
  compose(
    randomIndex,
    snd
  ),
  liftState(identity)
);

// drawNine :: State AppState Deck -> State AppState Deck
// repeat(9, chain(drawRandom)) --> return 9 functions in array
// mreduce(Endo) --> combine into one function
const drawNine = mreduce(Endo, repeat(9, chain(drawRandom)));

// drawFromDeck :: () -> State AppState Deck
const drawFromDeck = compose(
  drawNine,
  getDeck
);

// setCards :: Deck -> State AppState ()
const setCards = deck => over("cards", constant(deck.fst()));

// pickCards :: () -> State AppState ()
const pickCards = composeK(
  setCards,
  drawFromDeck
);

module.exports = {
  pickCards
};
