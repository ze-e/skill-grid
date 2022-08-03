import React, { useState, useContext, useEffect } from 'react'

import PropTypes from 'prop-types'
import { DataContext } from '../contexts/DataContext'
import { v4 as uuidv4 } from 'uuid'

export default function LevelNode ({ item, column, blank }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)

  const [allLevels, setAllLevels] = useState([])
  const [visible, setVisible] = useState(false)

  const parents = item.parents?.length > 0 ? allLevels.filter(p => item.parents?.includes(p.id)) : null
  const descendants = item.descendants?.length > 0 ? allLevels.filter(p => item.descendants?.includes(p.id)) : null

  useEffect(() => {
    const levels = state.data.map(c => c.contents).reduce((a, b) => a.concat(b), [])
    setAllLevels(levels)
  }, [state])

  useEffect(() => {
    // blanks and first column are always visible
    if (blank) setVisible(true)
    else if (item.column === 1) setVisible(true)
    // make visible if item is the only child of its parent
    else if (parents?.length > 0 && parents[0]?.descendants.length === 1) setVisible(true)
    // make visible if item is the middle child of its parent (2/3)
    else if (parents?.length > 0 && parents[0]?.descendants.length > 1 && parents[0]?.descendants[1] === item.id) setVisible(true)
    // make visible if item is on the top edge
    else if (column[0].id === item.id) setVisible(true)
    // make visible if item is on the bottom edge
    else if (column.length - 1 === column.findIndex(i => i.id === item.id)) setVisible(true)
    else setVisible(false)
  }, [state])

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
      <div>{!visible && visible.toString()}</div>
      {visible && <NodeData item={item}>
        {!blank
          ? <>
          <h4>XP: {item.xp}</h4>
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
          </>
          : <div className="levelNode__blank"></div>
        }
      </NodeData>}
    </>
  )
}

LevelNode.propTypes = {
  item: PropTypes.object,
  blank: PropTypes.bool,
  column: PropTypes.array,
  children: PropTypes.any
}
