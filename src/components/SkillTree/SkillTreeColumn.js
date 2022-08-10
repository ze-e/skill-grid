import React from 'react'
import LevelNode from './SkillTreeNode'
import PropTypes from 'prop-types'

export default function SkillTreeColumn ({ color, quests }) {
  return (
    <div className='skillTreeColumn' style={{ border: `1px solid ${color}` }}>
      {quests.length > 0 && quests.map((quest, index) => {
        return <div key={quest.id}>
          <LevelNode
            item={quest}
            index={index}
          />
        </div>
      })}
    </div>
  )
}

SkillTreeColumn.propTypes = {
  color: PropTypes.string,
  quests: PropTypes.array
}
