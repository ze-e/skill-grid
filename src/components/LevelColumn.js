import React, { useState, useEffect, useContext } from 'react'
import LevelNode from './LevelNode'
import PropTypes from 'prop-types'
import { DataContext } from '../contexts/DataContext'
import { v4 as uuidv4 } from 'uuid'
import { createColor } from '../utils/color'

export default function LevelColumn ({ id, levels }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)

  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    // first column can only contain one item
    if (id === 1 || levels.length > 2) setDisableButton(true)
    else setDisableButton(false)
  }, [id, levels])

  function setDefaultParent (id) {
    // find the first available item from the last column and add it as parent
    // since columns start at one, you need to subtract 2
    const parentLevels = state.data[id - 2].contents

    for (let i = parentLevels.length - 1; i >= 0; i--) {
      if (parentLevels[i].descendants.length < 3) return [parentLevels[i].id]
    }

    // if none are available, then you cannot add a new item
    return null
  }

  function addItem () {
    const newItem = {
      id: uuidv4(),
      column: id,
      name: 'New Level!',
      xp: 10,
      parents: setDefaultParent(id),
      descendants: [],
      color: createColor()
    }
    if (newItem.parents) dispatch({ type: ACTIONS.ADD_CHILD, payload: { newItem } })
    else setDisableButton(true)
  }

  return (
    <div className='levelColumn'>
      {levels.length > 0 && levels.map(level => {
        return <LevelNode
          key={level.id}
          item={level}
        />
      })}
        {!disableButton && <button
          className="levelColumn__addItem"
          type='button'
          onClick={() => { addItem() }}>
          Add New Level
        </button>}
    </div>
  )
}

LevelColumn.propTypes = {
  id: PropTypes.number,
  levels: PropTypes.array
}
