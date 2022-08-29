import React, { useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'
import { UserContext } from '../../contexts/UserContext'

export default function SkillTreeNode ({ item }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user, setUser } = useContext(UserContext)
  const xp = item.skills.length * 10
  const completed = user.admin?.userType === 'student' && user.admin?.completedQuests.includes(item.id)

  const [isAvailable, setIsAvailable] = useState(false)
  const [isCurrent, setIsCurrent] = useState(false)

  useEffect(() => {
    if (item.parents.every(p => user.admin.completedQuests.includes(p)) && (item.descendants.length > 0 && !item.descendants.some(p => user.admin.completedQuests.includes(p)))) setIsAvailable(true)
    else setIsAvailable(false)
  }, [user.admin.completedQuests])

  useEffect(() => {
    setIsCurrent(item.id === user.admin.currentQuest)
  }, [user.admin.currentQuest])

  async function setCurrentQuest () {
    await dispatch({ type: ACTIONS.EDIT_ADMIN, payload: { userName: user.admin.userName, field: 'currentQuest', newVal: item.id } })
    const userData = state.userData.find(i => i.admin.userName.toLowerCase() === user.admin.userName.toLowerCase())
    setUser(userData)
  }

  function NodeData ({ item, children }) {
    return (
      <>
        <div className='skillTreeNode' style={{ border: `3px solid ${item.color}`, color: user.admin?.userType !== 'teacher' && isAvailable ? 'white' : 'black', backgroundColor: user.admin?.userType !== 'teacher' && isAvailable ? isCurrent ? 'green' : 'grey' : 'white' }} >
          <h3>{item.name}</h3>
          <h4>XP: {xp}</h4>
          {(user.admin?.userType !== 'teacher' && isAvailable && !isCurrent) && <button type="button" onClick={() => { setCurrentQuest() }}>Start Quest</button>}
        {children}
      </div>
      </>
    )
  }
  return (
      <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id}>
      {(completed || user.admin?.userType === 'teacher' || isAvailable)
        ? <NodeData item={item} />
        : <div className='skillTreeNode' style={{ border: `3px solid ${item.color}`, backgroundColor: 'black', minHeight: '100px' }}></div>}
      </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.node
}
