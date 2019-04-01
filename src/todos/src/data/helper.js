import compose from 'crocks/helpers/compose'
import option from 'crocks/pointfree/option'
import chain from 'crocks/pointfree/chain'
import when from 'crocks/logic/when'
import mapProps from 'crocks/helpers/mapProps'
import safe from 'crocks/Maybe/safe'
import prop from 'crocks/Maybe/prop'
import propOr from 'crocks/helpers/propOr'
import isArray from 'crocks/predicates/isArray'
import equals from 'crocks/pointfree/equals'

// propArray :: String -> Object -> Array
export const propArray = key =>
    compose(
        option([]),
        chain(safe(isArray)),
        prop(key)
    )
// sameTitle :: String -> Object -> Boolean
const sameTitle = title => compose(
    equals(title), propOr('', 'title')
)
// negate :: a -> Boolean
export const negate = x => !x
// updateRecord :: (String, Object) -> Object
export const updateRecord = (title, update) =>
        when(sameTitle(title), mapProps(update))