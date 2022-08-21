import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import { DataContext } from '../../contexts/DataContext'
import { ModalContext } from '../../contexts/ModalContext'

import { setDefaultParent } from '../../utils/quest'
import { createColor } from '../../utils/color'
import SETTINGS from '../../config/constants'
import SkillListQuest from './SkillListQuest'

// import { QuestName, SkillName } from '../Modal/ModalTypes'

export default function SkillListLevel ({ index, level }) {
  const [levelXP, setLevelXP] = useState(0)

  const { state, dispatch, ACTIONS } = useContext(DataContext)
  // const { setModalOpen, setModalContent } = useContext(ModalContext)

  const [inputNewQuestName, setInputNewQuestlName] = useState('New Quest')

  // get total XP for level
  useEffect(() => {
    if (level?.quests) {
      const xp = 10 * (level.quests?.length > 1 ? level.quests?.reduce((a, b) => (a.skills?.length + b.skills?.length)) : level.quests[0]?.skills?.length)
      setLevelXP(xp)
    }
  }, [state])

  // disable button under certain conditions
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    // first column can only contain one item
    if (index === 0 || state.data.levels[index].quests.length >= SETTINGS.MAX_CHILDREN) setDisableButton(true)
    else setDisableButton(false)
  }, [index, state])

  // add new quest to level
  function addItem () {
    const newQuest = {
      id: uuidv4(),
      name: inputNewQuestName,
      skills: ['New skill'],
      parents: setDefaultParent(state.data.levels, index),
      descendants: [],
      color: createColor()
    }
    if (newQuest.parents) dispatch({ type: ACTIONS.ADD_ITEM, payload: { newItem: newQuest, levelId: level.id } })
    else setDisableButton(true)
  }

  return (
    <div className='skillListLevel'>
        <div className='skillListLevel__title'>
          <h3>{`Level ${index + 1}`}</h3>
          <h3>{` ${levelXP} XP/ Gold`}</h3>
        </div>

        {level.quests.length > 0 && level.quests.map((quest, i) =>
          <SkillListQuest key={quest.id} quest={quest} index={i} levelIndex={index} />
        )}

        {!disableButton &&
          <>
            <input onChange={(e) => { setInputNewQuestlName(e.target.value) }} value={inputNewQuestName} placeholder="Enter quest name..." minLength={3} maxLength={15}/>
            <button
              className="m-skillListButton button"
              type='button'
              disabled={inputNewQuestName === ''}
              onClick={() => { addItem() }}>
              Add New Quest
            </button>
          </>
        }
      </div>
  )
}

SkillListLevel.propTypes = {
  index: PropTypes.number,
  level: PropTypes.object
}
