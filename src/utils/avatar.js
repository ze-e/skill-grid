export function getAvatarData (avatarData, key, id) {
  return avatarData[key].find(i => i.id === id)
}
