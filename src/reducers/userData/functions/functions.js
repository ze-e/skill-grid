import { debug } from '../../../utils/debug'
function editData (state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.data[field] = newVal
  stateCopy.userData.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)

  return stateCopy
}

function editAdmin (state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin[field] = newVal
  stateCopy.userData.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)

  return stateCopy
}

function submitQuest (state, { userName, questId }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin.submittedQuest = questId
  stateCopy.userData.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)
  debug({ questId })
  return stateCopy
}

function approveQuest (state, { userName, questId }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin.completedQuests.push(questId)
  user.admin.currentQuest = ''
  user.admin.submittedQuest = ''
  stateCopy.userData.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)
  debug({ questId, user: user.admin.completedQuests })
  return stateCopy
}

export default {
  editData,
  editAdmin,
  submitQuest,
  approveQuest
}
