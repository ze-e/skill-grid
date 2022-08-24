import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'
import { ModalContext } from '../../contexts/ModalContext'
import { ModalQuestEdit, ModalSkillAdd } from '../Modal/ModalTypes'
import { getParents, getDescendants } from '../../utils/quest'

import { getNextLevel, getQuestLevel, getPrevLevel } from '../../utils/level'
import { v4 as uuidv4 } from 'uuid'
import SETTINGS from '../../config/constants'

import SkillListSkill from './SkillListSkill'

export default function SkillListQuest ({ index, quest, levelIndex }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)

  const [parents, setParents] = useState(null)
  const [descendants, setDescendants] = useState(null)
  const [prevLevel, setPrevLevel] = useState(getPrevLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id))

  useEffect(() => {
    setParents(getParents(state.data?.levels, quest))
    setDescendants(getDescendants(state.data?.levels, quest))
    setPrevLevel(getPrevLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id))
  }, [state])

  // add child to next level
  function addChild (e) {
    e.preventDefault()
    const input = e.target[0]
    const inputVal = input.value

    const newQuest = {
      id: uuidv4(),
      name: inputVal,
      skills: ['New skill'],
      parents: [quest.id],
      descendants: [],
      color: quest.color
    }
    const nextLevel = getNextLevel(state.data.levels, getQuestLevel(state.data.levels, quest.id).id)
    if (!descendants || descendants.length < SETTINGS.MAX_CHILDREN) dispatch({ type: ACTIONS.ADD_ITEM, payload: { newItem: newQuest, levelId: nextLevel ? nextLevel.id : null } })

    // close modal
    setModalOpen(false)
  }

  return (
    <div className='skillListQuest'>
          <div className='skillListQuest__head'>
            <h4 className='skillListQuest__title' style={{ border: `3px solid ${quest.color}` }}>
              {`Quest ${index + 1} - ${quest.name}`}
            </h4>

            <button
            className="m-skillListButton button"
            type='button'
            onClick={() => {
              setModalOpen(true)
              setModalContent(
              <ModalQuestEdit
                prevLevel={prevLevel}
                defaultName={quest.name}
                defaultParents={levelIndex !== 0 && parents}
                descendants={descendants}
                addChild={addChild}
                handleSubmit= {(e) => {
                  e.preventDefault()

                  // get input vals
                  const nameInput = e.target[0]
                  const nameVal = nameInput.value
                  const parentInput = e.target[1]
                  const parentVal = [...parentInput.selectedOptions].map(option => option.value)

                  // dispatch
                  if (nameVal !== quest.name) dispatch({ type: ACTIONS.CHANGE_NAME, payload: { quest, name: nameVal } })
                  if (parentVal !== quest.parents) dispatch({ type: ACTIONS.SET_PARENTS, payload: { quest, parentIds: parentVal } })

                  // close modal
                  setModalOpen(false)
                }}
              />)
            }}
            >Edit</button>
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
          <SkillListSkill key={skill + ' ' + index} quest={quest} skill={skill} index={index} />
        )}
      {quest.skills.length < SETTINGS.MAX_SKILLS &&
        <button
          className="m-skillListButton button"
          type='button'
          onClick={() => {
            setModalOpen(true)
            setModalContent(
              <ModalSkillAdd skillList={quest.skills} handleSubmit={
                (e) => {
                  e.preventDefault()
                  const nameInput = e.target[0]
                  const nameVal = nameInput.value
                  dispatch({ type: ACTIONS.ADD_SKILL, payload: { quest, skill: nameVal } })
                  setModalOpen(false)
                }
              }/>
            )
          }}
        >Add New Skill</button>}
    </div>
  )
}

SkillListQuest.propTypes = {
  index: PropTypes.number,
  levelIndex: PropTypes.number,
  quest: PropTypes.object
}
