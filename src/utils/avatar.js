export function getAvatar(avatarData, id, key) {
  return avatarData[key].find(i => i.id === id)
}