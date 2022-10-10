// import React, { useContext, useEffect, useState } from 'react'
import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
// import { DataContext } from '../../contexts/DataContext'
// import { UserContext } from '../../contexts/UserContext'

import { drawHex } from '../../utils/visualEffect'
import { createDarkVariation } from '../../utils/color'

// import swordImg from '../../assets/questImage/sword.png'

export default function SkillTreeNode ({ item }) {
  // const { state, dispatch, ACTIONS } = useContext(DataContext)
  // const { user, setUser } = useContext(UserContext)
  const xp = item.skills.length * 10
  // const completed = user.admin?.userType === 'student' && user.admin?.completedQuests.includes(item.id)
  // const hasCurrent = user.admin?.userType === 'student' && user.admin?.currentQuest

  // const [isAvailable, setIsAvailable] = useState(false)
  // const [isCurrent, setIsCurrent] = useState(false)

  // useEffect(() => {
  //   if (!completed && (!item.parents.length > 0 || item.parents.every(p => user.admin.completedQuests.includes(p)))) setIsAvailable(true)
  //   else setIsAvailable(false)
  // }, [user.admin])

  // useEffect(() => {
  //   setIsCurrent(!completed && item.id === user.admin.currentQuest)
  // }, [user.admin])

  useEffect(() => {
    drawHex({ id: item.id, color: item.color, borderColor: createDarkVariation(item.color), borderWidth: '100', innerShadow: true })
  }, [])

  // async function setCurrentQuest () {
  //   await dispatch({ type: ACTIONS.EDIT_ADMIN, payload: { userName: user.admin.userName, field: 'currentQuest', newVal: item.id } })
  //   const userData = state.userData.find(i => i.admin.userName.toLowerCase() === user.admin.userName.toLowerCase())
  //   setUser(userData)
  // }

  function NodeData ({ item, children }) {
    return (
      <>
        <div className='skillTreeNode' style={{ position: 'relative', transform: 'translateY(-10px)' }} >
          <div data-id={`${item.id}-svg`} style={{ position: 'absolute', zIndex: 1 }}></div>
          <h3 className='skillTreeNode__text' style={{ zIndex: 2 }}>{item.name}</h3>
          <h4 className='skillTreeNode__text' style={{ zIndex: 2 }}>XP: {xp}</h4>
          {/* {(user.admin?.userType !== 'teacher' && isAvailable && !hasCurrent) && <button style={{ zIndex: 2 }} type="button" onClick={() => { setCurrentQuest() }}>Start Quest</button>} */}
        {children}
      </div>
      </>
    )
  }
  return (
    <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id}>
      <NodeData item={item} />
    </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.node
}
