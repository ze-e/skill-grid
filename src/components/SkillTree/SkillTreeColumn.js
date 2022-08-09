import React from 'react'
import LevelNode from './SkillTreeNode'
import PropTypes from 'prop-types'

export default function LevelColumn ({ color, quests }) {
  return (
    <div className='levelColumn' style={{ border: `1px solid ${color}` }}>
      {quests.length > 0 && quests.map(quest => {
        return <LevelNode
          key={quest.id}
          item={quest}
        />
      })}
    </div>
  )
}

LevelColumn.propTypes = {
  color: PropTypes.string,
  quests: PropTypes.array
}
