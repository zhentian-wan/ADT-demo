import { State, compose, lensPath, lensProp, over, not } from '../../js/helper'
const { modify } = State
// ui -> filterGroups -> status

const lnsFilterGroups = lensPath(['ui', 'filterGroups'])
export const toggleFilterGroup = ({ group }) => {
    const lns = compose(
        lnsFilterGroups,
        lensProp(group)
    )

    return modify(over(lns, not))
}
