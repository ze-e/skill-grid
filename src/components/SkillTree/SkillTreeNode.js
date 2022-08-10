import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { DataContext } from '../../contexts/DataContext'
import { getParents } from '../../utils/quest'

export default function SkillTreeNode ({ item }) {
  const { state } = useContext(DataContext)
  const xp = item.skills.length * 10
  const parents = getParents(state.data.levels, item)

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
      <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id} data-color={item.color}>
        <NodeData item={item}>
          <h4>XP: {xp}</h4>
          <div className="skillTreeNode__siblings">
            {parents?.length > 0 &&
              <>
              <h3>Previous Skill:</h3>
              {parents.map(parent => <NodeData key={parent.id} item={parent} />)}
              </>
            }
          </div>
        </NodeData>
      </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.any
}
