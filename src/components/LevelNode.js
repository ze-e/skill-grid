import React, { useState, useContext, useEffect } from 'react'

import PropTypes from 'prop-types'
import { DataContext } from '../contexts/DataContext'
import { v4 as uuidv4 } from 'uuid'

export default function LevelNode ({ item }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)

  const [allLevels, setAllLevels] = useState([])

  useEffect(() => {
    const levels = state.data.map(column => column.contents).reduce((a, b) => a.concat(b), [])
    setAllLevels(levels)
  }, [state])

  const parents = item.parents?.length > 0 ? allLevels.filter(p => item.parents?.includes(p.id)) : null
  const descendants = item.descendants?.length > 0 ? allLevels.filter(p => item.descendants?.includes(p.id)) : null

  function addChild () {
    const newItem = {
      id: uuidv4(),
      column: item.column + 1,
      name: `${item.name}'s ${item.descendants.length + 1} child`,
      xp: 10,
      parents: [item.id],
      descendants: [],
      color: item.color
    }

    dispatch({ type: ACTIONS.ADD_CHILD, payload: { newItem } })
  }

  function NodeData ({ item, children }) {
    return (
      <div className='levelNode' style={{ border: `3px solid ${item?.color}` }}>
        <h3>{item?.name}</h3>
        {children}
      </div>
    )
  }
  return (
    <>
      <NodeData item={item}>
        <h4>XP: {item?.xp}</h4>
        {item.column !== 1 && <button
          className="levelNode__delete"
          type='button'
          onClick={() => { dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { item } }) }}>
          Delete
        </button>}
      {((!descendants || descendants?.length < 3) && (!state.data[item.column] || state.data[item.column].contents.length < 6)) &&
        <button
          className="levelNode__addItem"
          type='button'
          onClick={() => { addChild() }}>
          Add Child
        </button>
      }
        <div className="levelNode__siblings">
          {parents?.length > 0 &&
            <>
            <h3>Previous Skill:</h3>
            {parents.map(parent => <NodeData key={parent.id} item={parent} />)}
            </>
          }
        </div>
      </NodeData>
    </>
  )
}

LevelNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.any
}
