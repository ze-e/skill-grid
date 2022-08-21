import React from 'react'
import PropTypes from 'prop-types'

export default function SkillTreeNode ({ item }) {
  const xp = item.skills.length * 10

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
        <NodeData item={item}>
          <h4>XP: {xp}</h4>
        </NodeData>
      </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.node.isRequired
}
