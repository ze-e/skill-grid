import React, { useContext } from 'react'

import PropTypes from 'prop-types'
import { UserContext } from '../../contexts/UserContext'

export default function SkillTreeNode ({ item }) {
  const { user } = useContext(UserContext)
  const xp = item.skills.length * 10
  const completed = user.admin?.userType === 'student' && user.admin?.completedQuests.includes(item.id)

  function NodeData ({ item, children }) {
    return (
      <>
      <div className='skillTreeNode' style={{ border: `3px solid ${item.color}` }}>
        <h3>{item.name}</h3>
        {children}
      </div>
      </>
    )
  }
  return (
      <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id}>
      {(completed || user.admin?.userType === 'teacher')
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
