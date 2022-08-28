function editData (state, {userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.data[field] = newVal
  stateCopy.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)

  return stateCopy
}

function editAdmin(state, { userName, field, newVal }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin[field] = newVal
  stateCopy.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)

  return stateCopy
}

function completeQuest(state, { userName, questId }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.admin.completedQuest.push(questId)
  user.admin.currentQuest = ''
  stateCopy.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? user : i)

  return stateCopy
}

export default {
  editData,
  editAdmin,
  completeQuest
}
