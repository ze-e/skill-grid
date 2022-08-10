import React, { useContext, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'
import { getParents, getDescendants } from '../../utils/quest'
import { getNextLevel, getQuestLevel, getPrevLevel } from '../../utils/level'
import { v4 as uuidv4 } from 'uuid'
import SETTINGS from '../../config/constants'

import SkillListSkill from './SkillListSkill'

export default function SkillListQuest ({ index, quest, levelIndex }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const [parents, setParents] = useState(null)
  const [descendants, setDescendants] = useState(null)
  const [prevLevel, setPrevLevel] = useState(getPrevLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id))

  const parentInputRef = useRef(null)
  const [inputParents, setInputParents] = useState(parents)
  const [inputName, setInputName] = useState(quest.name)
  const [inputChildName, setInputChildName] = useState(`${quest.name}'s ${descendants ? descendants.length + 1 : 1} child`)
  const [inputSkillName, setInputSkillName] = useState(quest.name)

  const [edit, setEdit] = useState(false)

  useEffect(() => {
    setParents(getParents(state.data?.levels, quest))
    setDescendants(getDescendants(state.data?.levels, quest))
    setPrevLevel(getPrevLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id))
  }, [state])

  // add child to next level
  function addChild () {
    const newQuest = {
      id: uuidv4(),
      name: inputChildName,
      skills: ['New skill'],
      parents: [quest.id],
      descendants: [],
      color: quest.color
    }
    const nextLevel = getNextLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id)
    if (!descendants || descendants.length < SETTINGS.MAX_CHILDREN) dispatch({ type: ACTIONS.ADD_ITEM, payload: { newItem: newQuest, levelId: nextLevel ? nextLevel.id : null } })
  }

  return (
    <div className='skillListQuest'>
          <div className='skillListQuest__head'>
            { !edit
              ? <h4 className='skillListQuest__title' style={{ border: `3px solid ${quest.color}` }}>
              {`Quest ${index + 1} - ${quest.name}`}
            </h4>
              : <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: ACTIONS.CHANGE_NAME, payload: { quest, name: inputName } }); setEdit(false) }}>
              <input onChange={(e) => { setInputName(e.target.value) }} value={inputName} placeholder="Enter name..." minLength={3} maxLength={15}/>
              <button type="submit">Submit Name</button>
            </form>
            }
            {!edit && <button
              className="m-skillListButton button"
              type='button'
              onClick={() => { setEdit(!edit) }}>
              Edit
            </button>}

            { !edit && 
              <>
                <button
                  className="m-skillListButton button"
                  type='button'
                  disabled={levelIndex === 0}
                  onClick={() => { dispatch({ type: ACTIONS.DELETE_ITEM, payload: { item: quest } }) }}>
                  Delete
                </button>
              </>
            }

            {edit &&
              <>
              <br/>
              <br/>
              <input onChange={(e) => { setInputChildName(e.target.value) }} value={inputChildName} placeholder="Enter child name..." minLength={3} maxLength={15}/>
              <button
                className="m-skillListButton button"
                type='button'
                disabled={inputChildName === '' || descendants?.length >= SETTINGS.MAX_CHILDREN}
                onClick={addChild}>
                Add Child
              </button>
              </>
            }

          </div>
          {!edit
            ? <div className='m-flex'>
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
            : levelIndex !== 0 && <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: ACTIONS.SET_PARENTS, payload: { quest, parentIds: inputParents } }); setEdit(false) }}>
            <select
              name="parents"
              multiple
              value={inputParents}
              onChange={(e) => { setInputParents([...parentInputRef.current.selectedOptions].map(option => option.value)) }}
              ref={parentInputRef}
            >
              {prevLevel && prevLevel.quests.map(q => {
                return <option key={q.id} value={q.id}>{q.name}</option>
              })}
            </select>
            <button type="submit">Submit Parents</button>
          </form>}
        {quest.skills.map((skill, index) =>
          <SkillListSkill key={skill + ' ' + index} quest={quest} skill={skill} index={index} />
        )}
        <input onChange={(e) => { setInputSkillName(e.target.value) }} value={inputSkillName} placeholder="Enter name..." minLength={3} maxLength={15}/>
        <button
          className="m-skillListButton button"
          type='button'
          disabled={inputSkillName === '' || quest.skills.includes(inputSkillName) || quest.skills.length > SETTINGS.MAX_SKILLS}
          onClick={() => { dispatch({ type: ACTIONS.ADD_SKILL, payload: { quest, skill: inputSkillName } }); setInputSkillName('') }}>
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
