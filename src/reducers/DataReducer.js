import { levelData as data, userData, itemData, avatarData } from '../data/sampleData'
import { createColor } from '../utils/color'
// import { debug } from '../utils/debug'

import { v4 as uuidv4 } from 'uuid'

// actions
import LEVELACTIONS from './levelData/actions/actions'
import USERACTIONS from './userData/actions/actions'

// functions
import levelFunctions from './levelData/functions/functions'
import userFunctions from './userData/functions/functions'

function createData () {
  data.levels.forEach(level => {
    if (!level.id) level.id = uuidv4()
    level.quests.forEach(quest => { if (!quest.id) quest.id = uuidv4(); quest.color = quest.parents.length > 0 && quest.parents[0]?.color !== undefined ? quest.parents[0]?.color : createColor() })
  })
  return data
}

function createGameData () {
  const gameData = {}
  gameData.userLevels = []
  data.levels.forEach((level, index) => {
    let total = 0
    data.levels.slice(0, index + 1).forEach((level) => { level.quests.forEach(quest => { total = total + quest.skills.length }) })
    gameData.userLevels.push({ name: index + 1, xp: total * 10 })
  })
  return gameData
}

export const initialState = {
  data: createData(),
  gameData: createGameData(),
  userData,
  avatarData,
  itemData
}

export const ACTIONS = {
  ...LEVELACTIONS,
  ...USERACTIONS
}

function DataReducer (state, action) {
  switch (action.type) {
    case ACTIONS.HELLO_WORLD:
      console.log('HELLO', action.payload)
      return state
    // data
    case ACTIONS.ADD_ITEM: return levelFunctions.addItem(state, action.payload)
    case ACTIONS.DELETE_ITEM: return levelFunctions.deleteItem(state, action.payload)
    case ACTIONS.CHANGE_NAME: return levelFunctions.changeName(state, action.payload)
    case ACTIONS.SET_PARENTS: return levelFunctions.setParents(state, action.payload)
    case ACTIONS.ADD_SKILL: return levelFunctions.addSkill(state, action.payload)
    case ACTIONS.DELETE_SKILL: return levelFunctions.deleteSkill(state, action.payload)
    case ACTIONS.RENAME_SKILL: return levelFunctions.renameSkill(state, action.payload)
    // user
    case ACTIONS.EDIT_DATA: return userFunctions.editData(state, action.payload)
    case ACTIONS.EDIT_ADMIN: return userFunctions.editAdmin(state, action.payload)
    case ACTIONS.CHANGE_AVATAR: return userFunctions.changeAvatar(state, action.payload)
    case ACTIONS.SUBMIT_QUEST: return userFunctions.submitQuest(state, action.payload)
    case ACTIONS.APPROVE_QUEST: return userFunctions.approveQuest(state, action.payload)

    default: throw new Error(`Unknown action type: ${action.type}`)
  }
}

export default DataReducer
