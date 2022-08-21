import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalQuestEdit ({ handleSubmit, prevLevel, defaultName, defaultParents }) {
  const [isValid, setIsValid] = useState(false)

  return (
    <form onSubmit={handleSubmit} onChange={e => { setIsValid(e.target.checkValidity()) } } >
      <input defaultValue={defaultName} placeholder="Enter name..." minLength={3} maxLength={15}/>
      {defaultParents && <select
        name="parents"
        multiple
      >
        {prevLevel && prevLevel.quests.map(q => {
          return <option key={q.id} value={q.id}>{q.name}</option>
        })}
      </select>}
      <button className="m-skillListButton button" disabled={!isValid} type='submit'>Submit changes</button>
    </form>
  )
}

ModalQuestEdit.propTypes = {
  handleSubmit: PropTypes.any,
  prevLevel: PropTypes.any,
  defaultName: PropTypes.any,
  defaultParents: PropTypes.any
}
