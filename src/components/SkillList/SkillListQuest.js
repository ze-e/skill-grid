import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'

import { getParents, getDescendants } from '../../utils/quest'
// import { debug } from '../../utils/debug'

export default function SkillListQuest ({ index, quest }) {
  const [parents, setParents] = useState(null)
  const [descendants, setDescendants] = useState(null)
  const { state, dispatch, ACTIONS } = useContext(DataContext)

  useEffect(() => {
    setParents(getParents(state.data?.levels, quest))
    setDescendants(getDescendants(state.data?.levels, quest))
  }, [state])

  return (
    <div className='skillListQuest'>
        <code>{quest.id}</code>
          <div className='skillListQuest__head'>
            <h4 className='skillListQuest__title' style={{ border: `3px solid ${quest.color}` }}>
              {`Quest ${index + 1} - ${quest.name}`}
            </h4>
            { <button
            className="m-skillListButton button"
            type='button'
            // onClick={() => { dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { item: quest } }) }}>
            onClick={() => { dispatch({ type: ACTIONS.DELETE_ITEM, payload: { item: quest } }) }}>
            Delete
          </button>}
          </div>
          <div className='m-flex'>
          <div className="m-flexColumn skillListQuest__family">
            {parents != null && <h5>Prerequisites:</h5>}
            {parents != null && parents.map(p =>
              <div key={p.id} style={{ border: `3px solid ${p.color}` }}>
                {p.name}
              </div>
            )}
          </div>
          <div className="m-flexColumn">
            {descendants != null && <h5>Next lesson:</h5>}
            {descendants != null && descendants.map(d =>
              <div key={d.id} style={{ border: `3px solid ${d.color}` }}>
                {d.name}
              </div>
            )}
          </div>
        </div>
        {quest.skills.map((skill, index) =>
          <div key={skill} className='skillListQuest__skill'>{`Skill ${index + 1} - ${skill}`}
            <span className='skillListQuest__skillXP'>+10 XP/Gold</span>
          </div>
        )}
    </div>
  )
}

SkillListQuest.propTypes = {
  index: PropTypes.number,
  quest: PropTypes.object
}
