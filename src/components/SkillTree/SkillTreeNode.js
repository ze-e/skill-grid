import React, { useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { UserContext } from '../../contexts/UserContext'
import { debug } from '../../utils/debug'

export default function SkillTreeNode ({ item }) {
  const { user } = useContext(UserContext)
  const xp = item.skills.length * 10
  const completed = user.admin?.userType === 'student' && user.admin?.completedQuests.includes(item.id)

  const [isCurrent, setIsCurrent] = useState(false)

  useEffect(() => {
    if (item.parents.every(p => user.admin.completedQuests.includes(p)) && (item.descendants.length > 0 && !item.descendants.some(p => user.admin.completedQuests.includes(p)))) setIsCurrent(true)
    else setIsCurrent(false)
    debug({ user: user.admin.completedQuests, parents: item.parents, parentsEvery: item.parents.every(p => user.admin.completedQuests.includes(p)), descendantsNotEvery: !item.descendants.every(p => user.admin.completedQuests.includes(p)), descendants: item.descendants, isCurrent })
  }, [user.admin.completedQuests])

  function NodeData ({ item, children }) {
    return (
      <>
        <div className='skillTreeNode' style={{ border: `3px solid ${item.color}`, color: isCurrent ? 'white' : 'black', backgroundColor: isCurrent ? 'grey' : 'white' }} >
        <h3>{item.name}</h3>
        {children}
      </div>
      </>
    )
  }
  return (
      <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id}>
      {(completed || user.admin?.userType === 'teacher' || isCurrent)
        ? <NodeData item={item}>
          <h4>XP: {xp}</h4>
      </NodeData>
        : <div className='skillTreeNode' style={{ border: `3px solid ${item.color}`, backgroundColor: 'black', minHeight: '100px' }}></div>}
      </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.node
}
