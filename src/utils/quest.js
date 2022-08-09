
export function setDefaultParent (levels, currentLevelIndex) {
  // find the first available item from the last column and add it as parent
  const parentQuests = levels[currentLevelIndex - 1]?.quests

  if (parentQuests) {
    for (let i = parentQuests.length - 1; i >= 0; i--) {
      if (parentQuests[i].descendants.length < 3) return [parentQuests[i].id]
    }
  }

  // if none are available, return null
  return null
}

export function getAllQuests (levels) {
  return levels.map(l => l.quests).reduce((a, b) => a.concat(b), [])
}

export function getParents (levels, quest) {
  return quest?.parents?.length > 0 ? getAllQuests(levels).filter(q => quest.parents.includes(q.id)) : null
}

export function getDescendants (levels, quest) {
  return quest?.descendants?.length > 0 ? getAllQuests(levels).filter(q => quest.descendants.includes(q.id)) : null
}
