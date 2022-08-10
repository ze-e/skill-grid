import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import { DataContext } from '../../contexts/DataContext'
import { setDefaultParent } from '../../utils/quest'
import { createColor } from '../../utils/color'
import SkillListQuest from './SkillListQuest'
// import { debug } from '../../utils/debug'
export default function SkillListLevel ({ index, level }) {
  // const [levelXP, setLevelXP] = useState(0)
  const [levelXP] = useState(0)

  const { state, dispatch, ACTIONS } = useContext(DataContext)

  const [levels, setLevels] = useState([])

  useEffect(() => {
    setLevels(state.data.levels)
  }, [state])

  // get total XP for level
  // useEffect(() => {
  //   if (level?.quests) {
  //     const xp = 10 * (level.quests?.length > 1 ? level.quests?.reduce((a, b) => (a.skills.length + b.skills.length)) : level.quests[0]?.skills.length)
  //     setLevelXP(xp)
  //   }
  // }, [state])

  // disable button under certain conditions
  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    // first column can only contain one item
    if (index === 0 || levels[index]?.length > 2) setDisableButton(true)
    else setDisableButton(false)
  }, [index, levels])

  // add new quest to level
  function addItem () {
    const newQuest = {
      id: uuidv4(),
      name: 'New Quest!',
      skills: ['New skill'],
      parents: setDefaultParent(levels, index),
      descendants: [],
      color: createColor()
    }
    if (newQuest.parents) dispatch({ type: ACTIONS.ADD_ITEM, payload: { newItem: newQuest, levelId: level.id } })
    else setDisableButton(true)
  }

  return (
    <div className='skillListLevel'>
      {/* <code>{level.id}</code> */}
        <div className='skillListLevel__title'>
          <h3>{`Level ${index + 1}`}</h3>
          <h3>{` ${levelXP} XP/ Gold`}</h3>
        </div>

        {level.quests.length > 0 && level.quests.map((quest, i) =>
          <SkillListQuest key={quest.id} quest={quest} index={i} levelIndex={index} />
        )}

        {!disableButton &&
          <button
            className="m-skillListButton button"
            type='button'
            onClick={() => { addItem() }}>
            Add New Quest
          </button>}
      </div>
  )
}

SkillListLevel.propTypes = {
  index: PropTypes.number,
  level: PropTypes.object
}
