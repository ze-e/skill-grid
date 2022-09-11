import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { DataContext } from '../contexts/DataContext'
import { drawAvatar } from '../utils/visualEffect'
import { getAvatarData } from '../utils/avatar'

export default function EditAvatarView () {
  const { state, dispatch, ACTIONS } = useContext(DataContext)
  const { user } = useContext(UserContext)
  const defaultAvatar =
  {
    body: user.avatar.body,
    head: user.avatar.head,
    hand: user.avatar.hand,
    foot: user.avatar.foot
  }

  const [avatar, setAvatar] = useState(defaultAvatar)

  useEffect(() => {
    drawAvatar({
      body: getAvatarData(state.avatarData, 'body', avatar.body),
      head: getAvatarData(state.avatarData, 'head', avatar.head),
      hand: getAvatarData(state.avatarData, 'hand', avatar.hand),
      foot: getAvatarData(state.avatarData, 'foot', avatar.foot)
    })
  }, [avatar])

  async function handleSubmit (e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.CHANGE_AVATAR, payload: { userName: user.admin.userName, newVals: avatar } })
  }

  function changeAvatarPart (bodypart, changeBy) {
    const avatarCopy = { ...avatar }
    const partVariations = Object.keys(state.avatarData[bodypart]).length
    let currentPart = avatarCopy[bodypart]
    if (currentPart + changeBy > partVariations) currentPart = 1
    else if (currentPart + changeBy < 1) currentPart = partVariations
    else currentPart += changeBy
    avatarCopy[bodypart] = currentPart
    setAvatar(avatarCopy)
  }

  return (
    <div className='editAvatarView'>
      {user.avatar &&
        <>
        <canvas id="canvas" style={{ border: '2px solid black' }}></canvas>
        <form className='editAvatarView__buttons' onSubmit={(e) => { handleSubmit(e) }}>
          <h3>Head</h3>
          <button className='editAvatarView__button editAvatarView__button--L m-button' type='button' onClick={() => changeAvatarPart('head', -1) }> {'<'} </button>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='button' onClick={() => changeAvatarPart('head', 1) }> {'>'} </button>
          <h3>Body</h3>
          <button className='editAvatarView__button editAvatarView__button--L m-button' type='button' onClick={() => changeAvatarPart('body', -1) }> {'<'} </button>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='button' onClick={() => changeAvatarPart('body', 1) }> {'>'} </button>
          <h3>Hands</h3>
          <button className='editAvatarView__button editAvatarView__button--L m-button' type='button' onClick={() => changeAvatarPart('hand', -1) }> {'<'} </button>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='button' onClick={() => changeAvatarPart('hand', 1) }> {'>'} </button>
          <h3>Feet</h3>
          <button className='editAvatarView__button editAvatarView__button--L m-button' type='button' onClick={() => changeAvatarPart('foot', -1) }> {'<'} </button>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='button' onClick={() => changeAvatarPart('foot', 1) }> {'>'} </button>
          <h3>Submit changes</h3>
          <button className='editAvatarView__button editAvatarView__button--R m-button' type='submit'>SUBMIT </button>
        </form>
        </>}
    </div>
  )
}
