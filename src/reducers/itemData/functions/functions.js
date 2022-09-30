/* eslint-disable */

import { updateUser } from '../../../utils/user'

function buyItem (state, { userName, item }) {
  const stateCopy = { ...state }
  const user = stateCopy.userData.find(i => i.admin.userName.toLowerCase() === userName.toLowerCase())
  user.data.gold = user.data.gold - item.cost;
  user.inventory = [...user.inventory, item.id]
  stateCopy.userData = updateUser(stateCopy, userName, user)
  return stateCopy
}

export default {
  buyItem,
}
