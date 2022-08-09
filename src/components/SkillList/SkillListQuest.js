import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'
import { getParents, getDescendants } from '../../utils/quest'
import { getNextLevel, getQuestLevel } from '../../utils/level'
import { v4 as uuidv4 } from 'uuid'

// import { debug } from '../../utils/debug'

export default function SkillListQuest ({ index, quest, levelIndex }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const [parents, setParents] = useState(null)
  const [descendants, setDescendants] = useState(null)

  // const [inputParents, setInputParents] = useState([]);
  const [inputName, setInputName] = useState(quest.name)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    setParents(getParents(state.data?.levels, quest))
    setDescendants(getDescendants(state.data?.levels, quest))
  }, [state])

  // add child to next level
  function addChild () {
    const newQuest = {
      id: uuidv4(),
      name: `${quest.name}'s ${descendants ? descendants.length + 1 : 1} child`,
      skills: ['New skill'],
      parents: [quest.id],
      descendants: [],
      color: quest.color
    }

    dispatch({ type: ACTIONS.ADD_ITEM, payload: { newItem: newQuest, levelId: getNextLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id).id } })
  }

  function handleSubmit (e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.CHANGE_NAME, payload: { quest, name: inputName } })
    setEdit(false)
  }

  return (
    <div className='skillListQuest'>
        {/* <code>{quest.id}</code> */}
          <div className='skillListQuest__head'>
            { !edit
              ? <h4 className='skillListQuest__title' style={{ border: `3px solid ${quest.color}` }}>
              {`Quest ${index + 1} - ${quest.name}`}
            </h4>
              : <form onSubmit={(e) => { handleSubmit(e) }}>
              <input onChange={(e) => { setInputName(e.target.value) }} value={inputName} placeholder="Enter name..." minLength={3} maxLength={15}/>
              <button type="submit">Submit Name</button>
            </form>
            }
            <button
              className="m-skillListButton button"
              type='button'
              onClick={() => { setEdit(!edit) }}>
              {!edit ? 'Edit' : 'Done editing'}
            </button>
            <button
              className="m-skillListButton button"
              type='button'
              onClick={addChild}>
              Add Child
            </button>
            {levelIndex !== 0 && <button
              className="m-skillListButton button"
              type='button'
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
            {quest.skills.length > 1 && <button
              className="m-skillListButton button"
              type='button'
              onClick={() => { dispatch({ type: ACTIONS.DELETE_SKILL, payload: { quest, skill } }) }}>
              Delete Skill
            </button>}
          </div>
        )}
        <button
          className="m-skillListButton button"
          type='button'
          onClick={() => { dispatch({ type: ACTIONS.ADD_SKILL, payload: { quest, skill: `My New Skill ${Math.floor(Math.random() * 1000)}` } }) }}>
          Add Skill
        </button>
    </div>
  )
}

SkillListQuest.propTypes = {
  index: PropTypes.number,
  levelIndex: PropTypes.number,
  quest: PropTypes.object
}
