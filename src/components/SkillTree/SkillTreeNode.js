/* eslint-disable */
import React, { useEffect, useContext, useState } from 'react'

import PropTypes from 'prop-types'
import { DataContext } from '../../contexts/DataContext'
import { UserContext } from '../../contexts/UserContext'

import { drawHex } from '../../utils/visualEffect'
import { createDarkVariation } from '../../utils/color'

export default function SkillTreeNode ({ item }) {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user, setUser } = useContext(UserContext)
  const xp = item.skills.length * 10
  const completed = user.admin?.userType === 'student' && user.admin?.completedQuests.includes(item.id)
  const hasCurrent = user.admin?.userType === 'student' && user.admin?.currentQuest

  const [isAvailable, setIsAvailable] = useState(false)
  const [isCurrent, setIsCurrent] = useState(false)

  useEffect(() => {
    if (!completed && (!item.parents.length > 0 || item.parents.every(p => user.admin.completedQuests.includes(p)))) setIsAvailable(true)
    else setIsAvailable(false)
  }, [user.admin])

  useEffect(() => {
    setIsCurrent(!completed && item.id === user.admin.currentQuest)
  }, [user.admin])

  useEffect(() => {
    drawHex({ id: item.id, color: isCurrent ? createDarkVariation(item.color) : item.color, bgImage: item.img, borderColor: isCurrent ? '#ffffff' : createDarkVariation(item.color), borderWidth: '100', dropShadow: completed || isCurrent ? true : false, glow: isAvailable ? true : false})
  }, [item, isCurrent])

  async function setCurrentQuest () {
    await dispatch({ type: ACTIONS.EDIT_ADMIN, payload: { userName: user.admin.userName, field: 'currentQuest', newVal: item.id } })
    const userData = state.userData.find(i => i.admin.userName.toLowerCase() === user.admin.userName.toLowerCase())
    setUser(userData)
  }

  return (
    <div className={`skillTreeNodeContainer key-${item.id}`} data-id={item.id}>
      <div className='skillTreeNode'>
        
        <div className='skillTreeNode__svg' data-id={`${item.id}-svg`}></div>
        {completed || isAvailable ?
          <>
            <h3 className={`skillTreeNode__text ${!!isCurrent && 'current'}`} >{item.name}</h3>
            <h4 className={`skillTreeNode__xp ${!!isCurrent && 'current'}`} >XP: {xp}</h4>
          </>
          : <div className={`skillTreeNode__blank`}></div>
        }
        {(user.admin?.userType !== 'teacher' && isAvailable && !hasCurrent) && <button className={`skillTreeNode__button m-button`} type="button" onClick={() => { setCurrentQuest() }}>Start Quest</button>}
      </div>
    </div>
  )
}

SkillTreeNode.propTypes = {
  item: PropTypes.object,
  children: PropTypes.node
}
