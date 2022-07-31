import { itemData, columnData } from '../data/sampleData'
import { createColor } from '../utils/color'

function createData () {
  columnData.forEach(column => { column.contents = itemData.filter(i => i.column === column.id) })
  return columnData
}

export const initialState = {
  data: createData()
}

export const ACTIONS = {
  HELLO_WORLD: 'hello-world',
  ADD_CHILD: 'add-child'
}

function DataReducer (state, action) {
  switch (action.type) {
    case ACTIONS.HELLO_WORLD:
      console.log('HELLO', action.payload)
      return state
    case ACTIONS.ADD_CHILD: return addChild(state, action.payload)
    default: throw new Error(`Unknown action type: ${action.type}`)
  }
}

function addChild (state, { newItem }) {
  const stateCopy = { ...state }

  // add newItem id to parent
  stateCopy.data.forEach(column => {
    const newParent = column.contents.find(skill => skill.id === newItem.parents[0].id)
    newParent?.descendants.push(newItem.id)
  })

  // add newItem to column if column exists, otherwise create new column
  const column = stateCopy.data.find(column => column.id === newItem.column)
  column
    ? column.contents.push(newItem)
    : stateCopy.data.push({ id: newItem.column, color: createColor(), contents: [newItem] })

  // sort by parent
  const sortFunc = (a, b) => {
    if (a.parents.length > 0 && b.parents.length > 0) {
      const parent = ('' + a.parents[0]).localeCompare(b.parents[0])
      if (parent !== 0) {
        // sort by the index of their parent in the column
        return stateCopy.data[a.column - 1].contents.findIndex(item => item.id === a.parents[0]) - stateCopy.data[b.column - 1].contents.findIndex(item => item.id === b.parents[0])
      }
      return parent
    }
  }
  stateCopy.data.forEach(column => column.contents.sort((a, b) => sortFunc(a, b)))
  return stateCopy
}

export default DataReducer
