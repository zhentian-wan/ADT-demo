import {defaultTo, Pred, isSameType, Pair, fst, snd} from './helper'

const customValidation = validator =>
    (value, key, componentName, location, propName) => {
        if (!validator(value[key])) {
            return new Error(
                `Invalid prop ${defaultTo(key, propName)}, supplied to ${componentName}. Prop type should be string`
            )
        }
    }

const pairOf = (left, right) =>
    Pred(isSameType(Pair))
        .concat(Pred(isSameType(left)).contramap(fst))
        .concat(Pred(isSameType(right)).contramap(snd))
        .valueOf()

export const stringPair = customValidation(
    pairOf(String, Number)
)