import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function ListItem ({ id, level, color }) {
  const [levelXP, setLevelXP] = useState(0)
  useEffect(() => {
    if (level?.contents) {
      const xp = 10 * (level.contents.length > 1 ? level.contents.reduce((a, b) => (a.skills.length + b.skills.length)) : level.contents[0]?.skills.length)
      setLevelXP(xp)
    }
  }, [level])

  return (
  <div className='listItem' style={{ border: `3px solid ${color}` }}>
      <div className='listItem__title'>
        <h3>{`Level ${id}`}</h3>
        <h3>{` ${levelXP} XP/ Gold`}</h3>
      </div>
      {level.contents.length > 0 && level.contents.map((item, index) =>
        <div className='listItem__quest' key={item.id}>
          <h4 className='listItem__questTitle'>{`Quest ${index + 1} - ${item.name}`}</h4>
          {item.skills.map((skill, index) =>
            <div key={skill} className='listItem__skill'>{`Skill ${index + 1} - ${skill}`}
              <span className='listItem__skillXP'>+10 XP/Gold</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ListItem.propTypes = {
  id: PropTypes.number,
  level: PropTypes.object,
  color: PropTypes.string
}
