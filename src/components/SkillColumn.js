import React, { useState, useEffect, useContext } from 'react'
import SkillNode from './SkillNode'
import PropTypes from 'prop-types'
import { DataContext } from '../contexts/DataContext'
import { v4 as uuidv4 } from 'uuid'

export default function SkillColumn ({ id, skills }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    // first column can only contain one item
    if (id === 1 || skills.length > 2) setDisableButton(true)
  })

  function setDefaultParent () {
    // find the first available item from the last column and add it as parent
    // since columns start at one, you need to subtract 2
    const parentSkills = state.data[id - 2].contents

    for (let i = parentSkills.length - 1; i >= 0; i--) {
      if (parentSkills[i].descendants.length < 3) return [parentSkills[i].id]
    }

    // if none are available, then you cannot add a new item
    return null
  }

  function addItem () {
    const newItem = {
      id: uuidv4(),
      column: id,
      name: 'New Skill!',
      xp: 10,
      parents: setDefaultParent(),
      descendants: []
    }
    if (newItem.parents) dispatch({ type: ACTIONS.ADD_CHILD, payload: { newItem } })
    else setDisableButton(true)
  }

  return (
    <div className='skillColumn'>
      {skills.length > 0 && skills.map(skill => {
        return <SkillNode
          key={skill.id}
          item={skill}
        />
      })}
        {!disableButton && <button
          className="skillColumn__addItem"
          type='button'
          onClick={() => { addItem() }}>
          Add New Skill
        </button>}
    </div>
  )
}

SkillColumn.propTypes = {
  id: PropTypes.number,
  skills: PropTypes.array
}
