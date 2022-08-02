import { itemData, columnData } from '../data/sampleData'
import { createColor } from '../utils/color'

function createData () {
  columnData.forEach(column => { column.contents = itemData.filter(i => i.column === column.id) })
  return columnData
}

export const initialState = {
  data: createData(),
  activeColumn: null
}

export const ACTIONS = {
  HELLO_WORLD: 'hello-world',
  ADD_CHILD: 'add-child',
  REMOVE_ITEM: 'remove-item',
  MOVE_ITEM: 'move-item',
  SET_ACTIVE: 'setactive'
}

function DataReducer (state, action) {
  switch (action.type) {
    case ACTIONS.HELLO_WORLD:
      console.log('HELLO', action.payload)
      return state
    case ACTIONS.ADD_CHILD: return addChild(state, action.payload)
    case ACTIONS.REMOVE_ITEM: return removeItem(state, action.payload)
    case ACTIONS.MOVE_ITEM: return moveItem(state, action.payload)
    case ACTIONS.SET_ACTIVE: return setActive(state, action.payload)
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
  let column = stateCopy.data.find(column => column.id === newItem.column)
  if (column) column.contents = [...column.contents, newItem]
  else {
    stateCopy.data = [...stateCopy.data, { id: newItem.column, color: createColor(), contents: [newItem] }]
    column = stateCopy.data.find(column => column.id === newItem.column)
  }
  const sortFunc = (a, b) => {
    return stateCopy.data[a.column - 2].contents.findIndex(item => item.id === a.parents[0]) - stateCopy.data[b.column - 2].contents.findIndex(item => item.id === b.parents[0])
  }
  column.contents.sort(sortFunc)
  return stateCopy
}

function removeItem (state, { item }) {
  const stateCopy = { ...state }

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

  // remove newItem id from parent
  const newParents = stateCopy.data[item.column - 2].contents.filter(level => item.parents.includes(level.id))
  if (newParents.length > 0) newParents.forEach(parent => { parent.descendants = parent.descendants.filter(i => i !== item.id) })

  // remove item from column
  const column = stateCopy.data.find(column => column.id === item.column)
  column.contents = column.contents.filter(c => c.id !== item.id)

  // if item is only one in column, delete column
  if (column.contents.length === 0) {
    if (column.id === stateCopy.data.length) {
      stateCopy.data = stateCopy.data.filter(c => c.id !== column.id)
    } else {
      // if column is in the middle reconnect parents and children
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
  } else {
    // if it is not, then reassign children
    stateCopy.data[item.column].contents.filter(l => item.descendants.includes(l.id)).forEach(i => { i.parents = setDefaultParent(i.column) })
  }

  const sortFunc = (a, b) => {
    return stateCopy.data[a.column - 2].contents.findIndex(item => item.id === a.parents[0]) - stateCopy.data[b.column - 2].contents.findIndex(item => item.id === b.parents[0])
  }
  column.contents.sort(sortFunc)
  return stateCopy
}

function moveItem (state, { item, changeBy }) {
  // move item position
  const stateCopy = { ...state }
  const column = stateCopy.data.find(column => column.id === item.column)
  const position = column.contents.findIndex(i => i.id === item.id)
  if (position + changeBy >= 0 && position + changeBy < column.contents.length) {
    column.contents.splice(position, 1)
    column.contents.splice(position + changeBy, 0, item)
  }
  const sortFunc = (a, b) => {
    return stateCopy.data[a.column - 2].contents.findIndex(item => item.id === a.parents[0]) - stateCopy.data[b.column - 2].contents.findIndex(item => item.id === b.parents[0])
  }
  column.contents.sort(sortFunc)
  return stateCopy
}

function setActive (state, { activeColumn }) {
  state.activeColumn = activeColumn
  return state
}

export default DataReducer
