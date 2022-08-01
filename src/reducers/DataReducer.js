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
  ADD_CHILD: 'add-child',
  REMOVE_ITEM: 'remove-item'
}

function DataReducer (state, action) {
  switch (action.type) {
    case ACTIONS.HELLO_WORLD:
      console.log('HELLO', action.payload)
      return state
    case ACTIONS.ADD_CHILD: return addChild(state, action.payload)
    case ACTIONS.REMOVE_ITEM: return removeItem(state, action.payload)
    default: throw new Error(`Unknown action type: ${action.type}`)
  }
}

function addChild (state, { newItem }) {
  const stateCopy = { ...state }

  // add newItem id to parent
  stateCopy.data.forEach(column => {
    const newParent = column.contents.find(level => level.id === newItem.parents[0])
    newParent?.descendants.push(newItem.id)
  })

  // add newItem to column if column exists, otherwise create new column
  const sortFunc = (a, b) => {
    return state.data[a.column - 2].contents.findIndex(item => item.id === a.parents[0]) - state.data[b.column - 2].contents.findIndex(item => item.id === b.parents[0])
  }
  let column = stateCopy.data.find(column => column.id === newItem.column)
  if (column) column.contents = [...column.contents, newItem].sort(sortFunc)
  else {
    stateCopy.data = [...stateCopy.data, { id: newItem.column, color: createColor(), contents: [newItem] }]
    column = stateCopy.data.find(column => column.id === newItem.column)
  }
  return stateCopy
}

function removeItem (state, { item }) {
  const stateCopy = { ...state }

  // remove newItem id from parent
  const newParents = stateCopy.data[item.column - 2].contents.filter(level => item.parents.includes(level.id))
  if (newParents.length > 0) newParents.forEach(parent => { parent.descendants = parent.descendants.filter(i => i !== item.id) })

  // remove item from column
  const column = stateCopy.data.find(column => column.id === item.column)
  column.contents = column.contents.filter(c => c.id !== item.id)

  // if item is only one in column, delete column
  if (column.contents.length === 0) {
    function setDefaultParent (id) {
      // find the first available item from the last column and add it as parent
      // since columns start at one, you need to subtract 2
      const parentLevels = stateCopy.data[id - 2].contents

      for (let i = parentLevels.length - 1; i >= 0; i--) {
        if (parentLevels[i].descendants.length < 3) return [parentLevels[i].id]
      }

      // if none are available, then you cannot add a new item
      return null
    }

    if (column.id === stateCopy.data.length) stateCopy.data = stateCopy.data.filter(c => c.id !== column.id)

    // if column is in the middle reconnect parents and children
    else {
      stateCopy.data = stateCopy.data.filter(c => c.id !== column.id)
      stateCopy.data.slice(column.id - 1).forEach(c => {
        c.id--
        c.contents.forEach(i => {
          i.column--
          i.parents = setDefaultParent(i.column)
          if (i.parents) stateCopy.data[column.id - 2].contents.find(d => d.id === i.parents[0])?.descendants.push(i.id)
        })
      })
    }
  }
  return stateCopy
}

export default DataReducer
