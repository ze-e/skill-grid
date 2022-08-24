import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SETTINGS from '../../../config/constants'

export default function ModalQuestEdit ({ prevLevel, defaultName, defaultParents, descendants, handleSubmit, addChild }) {
  const [isValidEdit, setIsValidEdit] = useState(false)
  const [isValidAddChild, setIsValidAddChild] = useState(false)

  return (
    <>
    <form onSubmit={handleSubmit} onChange={e => { setIsValidEdit(e.target.checkValidity()) } } >
      <input defaultValue={defaultName} placeholder="Enter name..." minLength={3} maxLength={15}/>
      {defaultParents && <select
        name="parents"
        multiple
      >
        {prevLevel && prevLevel.quests.map(q => {
          return <option key={q.id} value={q.id}>{q.name}</option>
        })}
      </select>}
      <button className="m-skillListButton button" disabled={!isValidEdit} type='submit'>Submit changes</button>
    </form>

  {descendants?.length < SETTINGS.MAX_CHILDREN &&
    <form onSubmit={addChild} onChange={e => { setIsValidAddChild(e.target.value) }} >
      <input placeholder="Enter child name..." minLength={3} maxLength={15}/>
      <button className="m-skillListButton button" type='submit' disabled={!isValidAddChild || descendants?.length >= SETTINGS.MAX_CHILDREN}>
        Add Child
      </button>
    </form>
    }

    </>
  )
}

ModalQuestEdit.propTypes = {
  prevLevel: PropTypes.object,
  defaultName: PropTypes.string,
  defaultParents: PropTypes.arrayOf(PropTypes.object),
  descendants: PropTypes.arrayOf(PropTypes.object),
  handleSubmit: PropTypes.func,
  addChild: PropTypes.func
}
