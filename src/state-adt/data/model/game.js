// liftA2 :: Applicative m => (a -> b -> c) -> m a -> m b -> m c
// converge :: (b -> c -> d) -> (a -> b) -> (a -> c) -> a -> d
const {
  bimap,
  compose,
  identity,
  option,
  fanout,
  curry,
  liftA2,
  converge
} = require("crocks");
const { getState, getAt, unsetAt } = require("../../helper");

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

module.exports = {
  generateCards,
  drawCardAt
};
