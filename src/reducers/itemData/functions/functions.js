/* eslint-disable */

import { debug } from '../../../utils/debug'
import { getQuestById } from '../../../utils/item'

function buyItem (state, { userName, item }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  ///
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

function updateUser (stateCopy, userName, newUserData) {
  return stateCopy.userData.map(i => i.admin.userName.toLowerCase() === userName.toLowerCase() ? newUserData : i)
}

export default {
  buyItem,
}
