import React, { useState, useContext, useEffect } from 'react'

import PropTypes from 'prop-types'
import { DataContext } from '../contexts/DataContext'
import { v4 as uuidv4 } from 'uuid'

export default function SkillNode ({ item }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)

  const [allSkills, setAllSkills] = useState([])
  useEffect(() => {
    const skills = state.data.map(column => column.contents).reduce((a, b) => a.concat(b), [])
    setAllSkills(skills)
  }, [state])

  const parents = item.parents?.length > 0 ? allSkills.filter(p => item.parents?.includes(p.id)) : null
  const descendants = item.descendants?.length > 0 ? allSkills.filter(p => item.descendants?.includes(p.id)) : null

  const [showFamily, setShowFamily] = useState(false)

  function addChild () {
    const newItem = {
      id: uuidv4(),
      column: item.column + 1,
      name: `${item.name}'s ${item.descendants.length + 1} child`,
      xp: 10,
      parents: [item.id],
      descendants: []
    }

    dispatch({ type: ACTIONS.ADD_CHILD, payload: { newItem } })
  }

  function NodeData ({ item, children }) {
    const color = state.data.find(c => c.id === item.column)?.color

    return (
      <div className='skillNode' style={{ border: `3px solid ${color}` }}>
        <h3>{item.name}</h3>
        <h4>{item.xp}</h4>
        {children}
      </div>
    )
  }
  return (
    <>
      <NodeData item={item}>
        {item.column !== 1 && <button
          className="skillNode__delete"
          type='button'
          onClick={() => { dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { item } }) }}>
          Delete
        </button>}
      {(!descendants || descendants?.length < 3) &&
        <button
          className="skillNode__addItem"
          type='button'
          onClick={() => { addChild() }}>
          Add Child
        </button>
      }
        {showFamily && <div className="skillNode__siblings">
          {parents?.length > 0 &&
            <>
            <h3>Parents:</h3>
            {parents.map(parent => <NodeData key={parent.id} item={parent} />)}
            </>
          }
          {descendants?.length > 0 &&
            <>
              <h3>Descendants:</h3>
              {descendants.map(descendant => <NodeData key={descendant.id} item={descendant} />)}
            </>
          }
        </div>}
        <button className="skillNode__showFamily" type='button' onClick={() => { setShowFamily(!showFamily) }}>{!showFamily ? 'Show Related' : 'Hide Related'}</button>
      </NodeData>
    </>
  )
}

SkillNode.propTypes = {
  item: PropTypes.any,
  children: PropTypes.any
}
