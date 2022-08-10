import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'

export default function SkillListSkill ({ quest, skill, index }) {
  const { dispatch, ACTIONS } = useContext(DataContext)

  const [edit, setEdit] = useState(false)
  const [inputName, setInputName] = useState(skill)

  return (
    <div key={skill} className='skillListSkill__skill'>
      { !edit
        ? <span className='skillListSkill__name'>{`Skill ${index + 1} - ${skill}`}</span>
        : (
          <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: ACTIONS.RENAME_SKILL, payload: { quest, skill, name: inputName } }); setEdit(false) }}>
            <input onChange={(e) => { setInputName(e.target.value) }} value={inputName} placeholder="Enter name..." minLength={3} maxLength={15}/>
            <button type="submit">Change Name</button>
          </form>
          )
      }
      <span className='skillListSkill__skillXP'>+10 XP/Gold</span>
      {!edit && <button
        className="m-skillListButton button"
        type='button'
        onClick={() => { setEdit(true) }}>
        Rename
      </button>
      }
      {quest.skills.length > 1 && <button
        className="m-skillListButton button"
        type='button'
        onClick={() => { dispatch({ type: ACTIONS.DELETE_SKILL, payload: { quest, skill } }) }}>
        Delete Skill
      </button>}
    </div>
  )
}

SkillListSkill.propTypes = {
  index: PropTypes.number,
  skill: PropTypes.string,
  quest: PropTypes.object
}
