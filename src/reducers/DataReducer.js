import { data } from '../data/sampleData'
import { createColor } from '../utils/color'
import { getLevel, getLevelIndex, getQuestLevel, getPrevLevel, getQuestLevelIndex } from '../utils/level'

import { v4 as uuidv4 } from 'uuid'
import { setDefaultParent } from '../utils/quest'
// import { debug } from '../utils/debug'
function createData () {
  data.levels.forEach(level => {
    level.quests.forEach(quest => { quest.color = createColor() })
  })
  return data
}

export const initialState = {
  data: createData(),
  activeColumn: null
}

export const ACTIONS = {
  HELLO_WORLD: 'hello-world',
  ADD_ITEM: 'add-item',
  DELETE_ITEM: 'delete-item'
}

function DataReducer (state, action) {
  switch (action.type) {
    case ACTIONS.HELLO_WORLD:
      console.log('HELLO', action.payload)
      return state
    case ACTIONS.ADD_ITEM: return addItem(state, action.payload)
    case ACTIONS.DELETE_ITEM: return deleteItem(state, action.payload)
    default: throw new Error(`Unknown action type: ${action.type}`)
  }
}

function addItem (state, { newItem, levelId }) {
  const stateCopy = { ...state }
  let levels = stateCopy.data.levels

  // add newItem id to parent
  levels.forEach(level => {
    const newParent = level.quests.find(level => level.id === newItem.parents[0])
    newParent?.descendants.push(newItem.id)
  })

  // add newItem to level if level exists, otherwise create new level
  let level = getLevel(levels, levelId)
  if (level) level.quests = [...level.quests, newItem]
  else {
    levels = [...levels, { id: uuidv4(), color: createColor(), quests: [newItem] }]
    level = getLevel(levels, levelId)
  }

  const sortFunc = (questA, questB) => {
    return getPrevLevel(levels, getQuestLevel(levels, questA.id).id).quests.findIndex(item => item.id === questA.parents[0]) - getPrevLevel(levels, getQuestLevel(levels, questB.id).id).quests.findIndex(item => item.id === questB.parents[0])
  }
  level.quests.sort(sortFunc)
  return stateCopy
}

function deleteItem (state, { item }) {
  const stateCopy = { ...state }
  const level = getQuestLevel(stateCopy.data.levels, item.id)
  if (level === null) return stateCopy
  const levelIndex = getLevelIndex(stateCopy.data.levels, level.id)

  // remove item id from parent
  const newParents = getPrevLevel(stateCopy.data.levels, level.id).quests.filter(quest => item.parents.includes(quest.id))
  if (newParents.length > 0) newParents.forEach(parent => { parent.descendants = parent.descendants.filter(i => i !== item.id) })

  // remove quest from level
  level.quests = level.quests.filter(q => q.id !== item.id)

  // if item is only one in level, delete level. first level cannot be deleted
  if (levelIndex !== 0 && level.quests.length === 0) {
    stateCopy.data.levels = stateCopy.data.levels.filter(l => l.id !== level.id)
  }

  // if column is in the middle reconnect parents and children
  if (levelIndex !== stateCopy.data.levels.length - 1) {
    stateCopy.data.levels.slice(levelIndex).forEach(l => {
      l.quests.forEach(q => {
        q.parents = setDefaultParent(stateCopy.data.levels, getLevelIndex(stateCopy.data.levels, l.id))
        if (q.parents) getPrevLevel(stateCopy.data.levels, l.id).quests.find(q => q.id === q.parents[0])?.descendants.push(q.id)
      })
    })
  } else {
    // reassign children
    level.quests = level.quests.filter(q => item.descendants.includes(q.id)).forEach(q => { q.parents = setDefaultParent(stateCopy.data.levels, getQuestLevelIndex(stateCopy.data.levels, q.id)) })
  }

  return stateCopy
}

export default DataReducer
