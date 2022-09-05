export function getNextLevel (userLevels, xp) {
  return userLevels.find(level => level.xp > xp)
}
