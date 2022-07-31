import React from 'react'
import SkillNode from './SkillNode'
import PropTypes from 'prop-types'

export default function SkillColumn ({ skills }) {
  return (
    <div className='skillColumn'>
      {skills.length > 0 && skills.map(skill => {
        return <SkillNode
          key={skill.id}
          item={skill}
        />
      })}
    </div>
  )
}

SkillColumn.propTypes = {
  skills: PropTypes.array
}
