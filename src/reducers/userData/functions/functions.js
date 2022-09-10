// import { debug } from '../../../utils/debug'
import { getQuestById } from '../../../utils/quest'
import { getNextLevel } from '../../../utils/gameData'

function editData (state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.data[field] = newVal
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function editAdmin (state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin[field] = newVal
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function changeAvatar (state, { userName, newVals }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  Object.keys(stateCopy.user.avatar).forEach(key => { if (stateCopy.userData.avatar[key] !== newVals[key]) stateCopy.userData.avatar[key] = newVals[key] })
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function submitQuest (state, { userName, questId }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin.submittedQuest = questId
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function approveQuest (state, { userName, questId }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin.completedQuests.push(questId)
  user.admin.currentQuest = ''
  user.admin.submittedQuest = ''

  // increase xp and gold by quest values
  const questData = getQuestById(stateCopy.data.levels, questId)
  user.data.gold = user.data.xp + (questData.skills.length * 10)
  user.data.xp = user.data.xp + (questData.skills.length * 10)
  user.data.level = gainLevel(state, user)
  stateCopy.userData = updateUser(stateCopy, userName, user)

  return stateCopy
}

function gainLevel (state, user) {
  const nextLevel = getNextLevel(state.gameData.userLevels, user.data.xp)
  console.log(nextLevel)
  return user.data.level < nextLevel.name ? user.data.level + 1 : user.data.level
}

function updateUser (stateCopy, userName, newUserData) {
  return stateCopy.userData.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? newUserData : i)
}

export default {
  editData,
  editAdmin,
  submitQuest,
  approveQuest,
  changeAvatar
}
