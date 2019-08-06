const {
  identity,
  composeK,
  pick,
  filter,
  option,
  converge,
  liftA2,
  constant
} = require("crocks");
const { randomIndex } = require("./random");
const { selectState, getAt, liftState, over } = require("../../helper");

// notSelected :: Card -> Boolean
const notSelected = ({ selected }) => !selected;

// toHint :: Object -> Hint
const toHint = pick(["color", "shape"]);

// getUnselectedCards ::  () -> State AppState [Card]
const getUnselectedCards = () =>
  selectState("cards", filter(notSelected)).map(option([]));

// pickCard :: [Card] -*> State AppState Card
const pickCard = converge(liftA2(getAt), randomIndex, liftState(identity));

// setHint :: Card -> State AppState ()
const setHint = card => over("hint", constant(toHint(card)));

// nextHint :: () -> State AppState Hint
const nextHint = composeK(
  setHint,
  pickCard,
  getUnselectedCards
);

module.exports = { nextHint };
