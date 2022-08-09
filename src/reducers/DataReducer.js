import SETTINGS from '../config/constants'
import { data } from '../data/sampleData'
import { createColor } from '../utils/color'
import { getLevel, getLevelIndex, getQuestLevel, getPrevLevel, getQuestLevelIndex } from '../utils/level'
import { attachChild, getDescendants, setDefaultParent, sortQuests } from '../utils/quest'

import { v4 as uuidv4 } from 'uuid'

// import { debug } from '../utils/debug'
function createData () {
  data.levels.forEach(level => {
    level.id = uuidv4()
    level.quests.forEach(quest => { quest.color = quest.parents.length > 0 && quest.parents[0]?.color !== undefined ? quest.parents[0]?.color : createColor() })
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
  CHANGE_NAME: 'change-name',
  DELETE_ITEM: 'delete-item',
  SET_PARENTS: 'set-parents',
  ADD_SKILL: 'add-skill',
  DELETE_SKILL: 'delete-skill'
}

function DataReducer (state, action) {
  switch (action.type) {
    case ACTIONS.HELLO_WORLD:
      console.log('HELLO', action.payload)
      return state
    case ACTIONS.ADD_ITEM: return addItem(state, action.payload)
    case ACTIONS.DELETE_ITEM: return deleteItem(state, action.payload)
    case ACTIONS.CHANGE_NAME: return changeName(state, action.payload)
    case ACTIONS.SET_PARENTS: return setParents(state, action.payload)
    case ACTIONS.ADD_SKILL: return addSkill(state, action.payload)
    case ACTIONS.DELETE_SKILL: return deleteSkill(state, action.payload)
    default: throw new Error(`Unknown action type: ${action.type}`)
  }
}

function addItem (state, { newItem, levelId }) {
  const stateCopy = { ...state }

  // add newItem id to parent
  stateCopy.data.levels.forEach(level => {
    const newParent = level.quests.find(level => level.id === newItem.parents[0])
    newParent?.descendants.push(newItem.id)
  })

  // add newItem to level if level exists, otherwise create new level
  let level = getLevel(stateCopy.data.levels, levelId)
  if (level) level.quests = [...level.quests, newItem]
  else {
    stateCopy.data.levels = [...stateCopy.data.levels, { id: uuidv4(), color: createColor(), quests: [newItem] }]
    level = getLevel(stateCopy.data.levels, levelId)
  }

  sortQuests(stateCopy.data.levels, level)
  return stateCopy
}

function deleteItem (state, { item }) {
  const stateCopy = { ...state }
  const level = getQuestLevel(stateCopy.data.levels, item.id)
  if (level === null) return stateCopy

  const levelIndex = getLevelIndex(stateCopy.data.levels, level.id)

  // last quest in first level cannot be deleted
  if (levelIndex === 0 && level.quests.length === 0) {
    return stateCopy
  }

  // remove item id from parent
  const newParents = getPrevLevel(stateCopy.data.levels, level.id).quests.filter(quest => item.parents.includes(quest.id))
  if (newParents.length > 0) newParents.forEach(parent => { parent.descendants = parent.descendants.filter(i => i !== item.id) })

  // remove quest from level
  level.quests = level.quests.filter(q => q.id !== item.id)

  // if item is only one in level, delete level.
  if (level.quests.length === 0) {
    stateCopy.data.levels = stateCopy.data.levels.filter(l => l.id !== level.id)
  }

  // reattach parents and children
  const descendants = getDescendants(stateCopy.data.levels, item)
  if (descendants) {
    descendants.forEach(d => {
      d.parents = setDefaultParent(stateCopy.data.levels, getQuestLevelIndex(stateCopy.data.levels, d.id))
      attachChild(stateCopy.data.levels, d)
    })
  }

  sortQuests(stateCopy.data.levels, level)

  return stateCopy
}

function setParents (state, { quest, parents }) {
  if (parents.length < 1) return state
  const stateCopy = { ...state }
  quest.parents = [...parents.map(p => p.id)]
  updateQuest(stateCopy.data.levels, quest)
  parents.forEach(p => { attachChild(stateCopy.data.levels, quest) })

  return stateCopy
}

function changeName (state, { quest, name }) {
  if (name.length < 1) return state
  const stateCopy = { ...state }
  quest.name = name
  updateQuest(stateCopy.data.levels, quest)

  return stateCopy
}

function addSkill (state, { quest, skill }) {
  if (quest.skills.length === SETTINGS.MAX_SKILLS) return state

  const stateCopy = { ...state }
  quest.skills.push(skill)
  updateQuest(stateCopy.data.levels, quest)

  return stateCopy
}

function deleteSkill (state, { quest, skill }) {
  if (quest.skills.length === 1) return state

  const stateCopy = { ...state }
  quest.skills = quest.skills.filter(s => s !== skill)
  updateQuest(stateCopy.data.levels, quest)

  return stateCopy
}

function updateQuest (levels, quest) {
  return getQuestLevel(levels, quest.id).quests.map(q => q.id === quest.id ? quest : q)
}

export default DataReducer
